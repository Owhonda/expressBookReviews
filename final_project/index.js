const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: false}))

app.use("/customer/auth/*", function auth(req,res,next){
    //Write the authentication mechanism here
    if (req.session.authorization) {
    let keyAccessToken = req.session.authorization['keyAccess'];

    //Verify JWT token
    jwt.verify(keyAccessToken, 'bookkeycardaccess', (err, user) =>{
      if(!err){
        console.log(user);
        req.user = user;
        next();
      }
      else{
        return res.status(403).json({message: "User not logged in; please log in."});
      }
    });
  } else {
    return res.status(403).json({message: "User needs to log in to access resource..."})
  }

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
