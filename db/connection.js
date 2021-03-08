// This is the connections file that defines the Mongo Database that we are connecting to.

// Mongoose package needs to be required to connect to the database
const mongoose = require('mongoose');

// this is the mongoose database connection. 
mongoose.connect('mongodb://notes:notes@localhost/notesdb', {useNewUrlParser: true})
	
	// This catches any errors
	.catch(e => {
	
		// this console logs the error with connection (if there is one)
		console.error("There was a connection issue", e.message)
	
	});

// Defines the mongoose connection as a variable
const db = mongoose.connection;

// Export that variable to be used in the index.js file
module.exports = db;