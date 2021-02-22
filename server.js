// Libraries
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

// Server configuration
const hostname = process.env.HOSTNAME;
const port = process.env.EXPRESS_PORT;

// Middleware
app.use(cors()); // import 'cors' library first
app.use(express.json()); // provides access to client-side JSON data via request.body object

// Modules
const controller = require('./controller/controller.js');

// Routes
app.use('/', controller);
app.use('/signin', controller);
app.use('/signup', controller);
app.use('/pokemon', controller);
app.use('/pokemon/:pokedex_id', controller);
app.use('/pokemon/:pokedex_id/moves', controller);
app.use('/moves', controller);
app.use('/search/pokemon', controller);
app.use('/search/moves', controller);

// TODO:
app.use('/teams', controller);
app.use('/account', controller);

// Creates Node.js web server at specified host & port
app.listen(port, () => {
	console.log(`Server running at ${hostname}:${port}`);
});
