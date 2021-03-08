// Mongoose needs to be required here to be able to use the mongoose.Schema object method.
const mongoose = require('mongoose');

// Create a new schema from the mongoose schema method. This basically works like a JavaScript class object and is the template for how data will be stored in the notes collection of the database.
const noteSchema = new mongoose.Schema(
	
	{	
		// These are the two fields of data our notes will use. Their data types are defined here as strings. These data types are often called Schema Types
		title: String,
		text: String
			
	},
	
	{
		// this adds a createdAt and updatedAt field automatically upon creation of the document in the database
		timestamps :true
		
	}

);

// use that schema as a model and export it so it can be used for database queries 
module.exports = mongoose.model("Note", noteSchema);