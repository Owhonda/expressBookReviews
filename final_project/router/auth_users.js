const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {username:"Octane", password : "Burning_Bright"},
  {username:"Susan", password : "Flaming_Soul"},
  {username:"Grim", password : "Anything_Goes"}
];

const isValid = (username)=>{ //returns boolean
  //write code to check is the username is valid
  if(!username){
    return false;
  }

  let authUser = users.filter((ptnUsr) => {
    return (ptnUsr.username == username);
  });

  if(authUser.length > 0){
    return true;
  }
  else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
  //write code to check if username and password match the one we have in records.
  if(!isValid(username) || !password){
    return false;
  }
  if(isValid(username)){
    //Code to check if username and password combination are correct
    let verUser = users.filter((usrObj) => {
      return ((usrObj.username == username) && (usrObj.password == password));
    });

    //check if 
    if (verUser.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  else{
    return false
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let validUser = authenticatedUser(req.body.username, req.body.password);
  const username = req.body.username;
  const password = req.body.password;
  if (validUser) {
    //Create Session Using jwt
    let keyAccess = jwt.sign({
      usernameval: username
    }, 'bookkeycardaccess', 
    {expiresIn: 60 * 60}
    );

    req.session.authorization = {
      keyAccess, username
    }
    return res.status(200).send("User successfully logged in")
  }
  else{
    return res.status(208).json({message: "Invalid login credentials; username or password is incorrect"})
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  if(books[req.params.isbn] && req.body.review){
    books[req.params.isbn]["reviews"][req.data.usernameval] = req.body.review;
    return res.json(books[req.params.isbn]["reviews"][req.data.usernameval]);
  }else{
    return res.status(403).json({message: "Book ISBN number NOT FOUND"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});


// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  if(books[req.params.isbn]){
    books[req.params.isbn]["reviews"][req.data.usernameval] = "";
    return res.json({message: `Book review for ${req.data.usernameval} has been deleted!!`});
  }else{
    return res.status(403).json({message: "Book ISBN number NOT FOUND"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});


// Code for testing middleware
/* regd_users.get("/auth/test", (req, res) => {
    return res.status(200).json(req.data);
}) */

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
