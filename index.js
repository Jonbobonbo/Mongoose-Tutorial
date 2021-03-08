// START HERE

// This is the main server file that the node.js app will run on. You will need to navigate to your app's directory and type npm init in the terminal to initialize the Node Package Manager there. 

// Express is the backbone of our Node.js app. It manages the routes and structure of our API. To install this package run npm install express
const express = require('express');

// This declares express as a variable. It is wise to have this declared before declaring other variables that depend on Express to function, which is why I put it here
const app = express();

// Body-parser is used to parse different kinds of data including form data. When using this with form data, it makes that data available through the req.body variable.
const bodyParser = require('body-parser');

// Mongoose is a package that helps us to communicate with our MongoDB server. It primarily uses Schemas and Models to make queries and changes to the database files which allows for a more standardized dataset with less errors or variations
const mongoose = require('mongoose');


// Import the routes from the blog-router file by defining them like this
const routes = require('./routes/note-router');

// This imports the connection file for connection to the Mongo Database
const db = require('./db/connection');

// Body-parser parses encoded data, these two usages are for accepting for data posted to different routes and parsing json data, as well as telling the system to use json data
app.use(bodyParser.urlencoded({extended: true}));  // to accept form data and enables nesting data
app.use(bodyParser.json());

// This allows express to access the routes from the router file by using / in the URL
app.use('/', routes);



// Have express run the server on port 3010. It also console logs the status of the server once it has begun
app.listen(3010, () => console.log('The server is online at port 3010'));


// Once you are ready, you can run the node index.js command from the terminal inside the app's directory. This will boot up the app on port 3010. Alternatively you can boot the app with the command nodemon index.js. Nodemon reboots the server automatically when you make changes to the API which is very useful while in development