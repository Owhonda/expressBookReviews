const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  //Check if params have been set
  //console.log(req.body);
  let regParamsSet = (req.body.username && req.body.password);

  if(!regParamsSet){
    return res.status(208).json({message : "User account name and Password required"});
  }
  //Set boolean for if user exists
  let userExists = isValid(req.body.username);
  //Check if user exists
  if(!userExists){
    //Create username and password object
    let newUser = {username: req.body.username, password: req.body.password};
    //Add user object to array
    users.push(newUser); 
    return res.status(200).json({message :`User ${req.body.username} has been created!`});
  }
  else{
    return res.status(208).json({message :`User ${req.body.username} already exists`});
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
    return res.status(208).json({message:"Invalid ISBN number"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let matchingBooks = [];
  let matchingBooksObject = {};
  let count = 1;

  //console.log(books);
  //loop through all the books to find the author
  for(let book in books){
    //console.log(books[book].author);
    if (books[book].author == req.params.author) {
      matchingBooks.push(books[book]);
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
    return res.status(208).json({message:"Author not found"});
  }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let matchingBooks = [];
  let matchingBooksObject = {};
  let count = 1;

  //console.log(books);
  //loop through all the books to find the title
  for(let book in books){
    //console.log(books[book].title);
    if (books[book].title == req.params.title) {
      matchingBooks.push(books[book]);
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
    return res.status(208).json({message:"Title not found"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  if(books[req.params.isbn]){
    return res.status(200).json({"Book Title":books[req.params.isbn]["title"],
      "Book Review": books[req.params.isbn]["reviews"]});
  }
  else{
    return res.status(208).json({message:"Invalid ISBN number"});
  }
});


//code for getting the list of books using task 10
let getBookList = async (url)=>{
  
  try{
    //Axios code goes here
    const bookList = await axios.get(url);
    return bookList;
  }
  catch(err){
    //Output error
    console.log(err);
  }
};

//code for getting the books based on isbn number task 11
let getBookISBN = async (url)=>{
  
  try{
    //Axios code goes here
    const bookDetails = await axios.get(url);
    return bookDetails;
  }
  catch(err){
    //Output error
    console.log(err);
  }
};
//code for getting books based on author task 12
let getBookAuthor = async (url)=>{
  
  try{
    //Axios code goes here
    const bookDetails = await axios.get(url);
    return bookDetails;
  }
  catch(err){
    //Output error
    console.log(err);
  }
};
//code for getting book details based on titles 13
let getBookTitle = async (url)=>{
  
  try{
    //Axios code goes here
    const bookDetails = await axios.get(url);
    return bookDetails;
  }
  catch(err){
    //Output error
    console.log(err);
  }
};

module.exports.general = public_users;
module.exports.getBookList;
module.exports.getBookTitle;
module.exports.getBookAuthor;
module.exports.getBookISBN;
