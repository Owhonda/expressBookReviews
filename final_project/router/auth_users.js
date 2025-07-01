const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username:"Octane", password : "Burning_Bright"},{username:"Susan", password : "Flaming_Soul"},{username:"Grim", password : "Anything_Goes"}];

const isValid = (username)=>{ //returns boolean
  //write code to check is the username is valid
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
  if(isValid(username)){
    //Code to check if username and password combination are correct
    
  }
  else{
    return false
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
