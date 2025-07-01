const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  //Check if params have been set
  let regParamsSet = (req.body.username && req.body.password);

  if(!regParamsSet){
    return res.status(208).message("User account name and Password required");
  }
  //Set boolean for if user exists
  let userExists = isValid(req.body.username);
  //Check if user exists
  if(!userExists){
    //Create username and password object
    let newUser = {username: req.body.username, password: req.body.password};
    //Add user object to array
    users.push(newUser); 
    return res.status(200).message(`User ${req.body.username} has been created!`)
  }
  else{
    return res.status(208).message(`User ${req.body.username} already exists`)
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  //Check if index is valid
  if(books[req.params.isbn]){
    return res.status(200).json(books[req.params.isbn]);
  }
  else{
    return res.status(208).message("Invalid ISBN number");
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let matchingBooks = [];
  let matchingBooksObject = {};
  let count = 1;

  //loop through all the books to find the author
  for(let book in books){
    if (book.author == req.params.author) {
      matchingBooks.push(book);
    }
  }

  //Create a JSON object from the array
  if(matchingBooks.length > 0){
    matchingBooks.forEach((bookFound) =>{
      matchingBooksObject[count++] = bookFound;
    });

    return res.status(200).json(matchingBooksObject);
  }
  else{
    return res.status(208).message("Author not found");
  }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
