// This allows the use of the Express package in Node.js. Express is used as the framework for the backend (API). In addition to serving code and webpages, it also manages the creation and usage of routes.
const express = require('express');

// This variable imports the blog controller file so the functions can be added as "middleware" to the router methods (GET, POST, PUT, DELETE)
const noteCtrl = require('../controllers/note-ctrl');

// This declares the usage of the express router, it is the portion of the package that manages the routes
const router = express.Router();


// INDEX route. Blog posts are organized in descending order in order of most recently updated
router.get('/', noteCtrl.displayIndex);

// POST route where the created blog post data is sent to add it to the database
router.post('/post', noteCtrl.createNote);

// UPDATE route to take the edited notes form data and update the note inside the database
router.put('/update/:id', noteCtrl.updateNote);

// DELETE a note route
router.delete('/delete/:id', noteCtrl.destroyNote);
		 
		 
// This exports the router methods here to the main server page where they can communicate with the Mongo Database
module.exports = router;