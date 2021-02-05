// Libraries
const express = require('express');
const app = express();
const cors = require('cors');

// Server configuration
const hostname = 'localhost';
const port = 4000;

// Middleware
app.use(cors()); // import 'cors' library first
app.use(express.json()); // provides access to client-side JSON data via request.body object

// Modules
const controller = require('./controller/controller.js');

// Routes
app.use('/', controller);
app.use('/signin', controller);
app.use('/signup', controller);



// Creates Node.js web server at specified host & port
app.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
