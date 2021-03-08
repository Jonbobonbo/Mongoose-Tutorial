// This is the file where the functions are made to save and store to the database

// This imports the Blog model so it can be used in MongoDB queries, creates, and updates
const Note = require('../models/notemodel');

// In this file we are making functions that are called as part of the express.Router() callback parameter. Node.js operates using callbacks for unblocking code which makes the script reader operate asynchronously. Each express route requires a callback expression in order to function and this file is where they are defined and exported to be used in the router file. In Express, these are referred to as Middleware. It is possible to have multiple middleware expressions in an express route, but you need to include next as a parameter of each middleware that does not appear last on the list. Calling that parameter inside the expression as next(), moves the router to the next middleware expression until reaching the end of the list.

// This middleware finds all the notes and renders them on the page in order of most recent
displayIndex = (req, res) => {
	
	// get all of the notes from the database and display them in decending order.  This is a promise so the .then passes the response as the variable "notes"
	Note.find({}).sort({updatedAt: -1}).then( (notes) => {
	
		// if there is a response from the .find query
		if (notes) {
		
			// declare a variable to store your array of notes in
			let list = "";
			
			// using a for loop to loop through the array of notes from the find query. this makes the indexes targetable and allows the notes to be displayed in one unordered list
			for (let i = 0; i < notes.length; i++) {
				
				// this creates a list element for every note returned from the find query and concatenates them all into the list variale which we use with res.send below to send the list to the page. I've also added edit and delete anchor tags which use the id of each note to send to the URL for put and delete requests. This allows you to edit or delete a note with the click of link.
				list += '<li>' + notes[i].title + ': ' + notes[i].text + '</li>'
				
			}
			
			// This is just uses res.send to concatenate the rendered list and then send it to the page. There are better ways to do this, including sending an html page with res.render but for simplicity's sake this is fairly straightforward.
			res.send(list);
		
		} 
		
		// catch an error if there is an error with the Blog.find promise
	}).catch( (err) => {
		
		// console logs the error (if there is one)
		res.send("There was an error " + err);
		
	})
	      	
}

// Middleware used on the /update route that takes the form data and updates the blog entry from the /blog/:id/edit route using the original blog ID
updateNote = (req, res) => {
	
	// req.params.id is the id from the URI. We are putting that into a variable to be passed into the database query below
	let id = req.params.id
	
	// creates a new note using the Note model structure
	let updateNote = {
		
		title: req.body.title,
		text: req.body.text
		
	}
	
	// uses the findByIdAndUpdate query to find the note by id in the database and then updates that note with the new content
	Note.findByIdAndUpdate(req.params.id, updateNote, (err, notes) => {
		
		// gotta have your basic error checking
		if (err) {

			res.send("There was an error with your query " + err);

		} else {

			res.send('Note successfully updated! Return to the index to view your changes.');

		}
		
	})
	

}

// creates a new Note using form data and referencing the user's id pulled from the req.session.userId variable
createNote = (req, res) => {
	
	// this creates a new note using the Note model
	let post = new Note ({

		// req.body is the form data posted to this route. Using the post method in express automatically populates this variable with the data based on the input field's name attribute
		title: req.body.title,
		text: req.body.text

	});

	// We are using the save method to create this document in the database
	post.save( (error) => {

		// Basic error checking. It is helpful for the user to see whether their actions are successful or not.
		if (error) {

			res.send("Sorry there was an error creating that note" + error);

		} else {

			res.send('Note successfully created! Return to the index to view your changes.');

		}

	});
	
}



// Middleware on the /delete/:id route that destroys the blog selected on the dashboard with the delete button
destroyNote = (req, res) => {
	
	// Destroy the note from the database.
	Note.findByIdAndRemove(req.params.id, (err, docs) => {

		// More basic error checking here. Not really any different than before
		if (err) {

			res.send("There was an error trying to delete " + err);

		} else {

			res.send('Note successfully deleted. Return to the index to view your changes.');

		}
	  
  	})
  

}



// This exports the indiviudual functions to be used in the routers for executing code. These are declared as middleware in each of the routes in the router file.
module.exports = {displayIndex, createNote, updateNote, destroyNote};