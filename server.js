// Libraries
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors()); // import 'cors' library first
app.use(express.json()); // provides access to client-side JSON data via request.body object

// Modules
const controller = require('./controller/controller.js');

// Routes
app.use('/', controller);
app.use('/pokemon', controller);
app.use('/pokemon/:name', controller);
// TODO: replicate for all other pages: e.g. search, teams, account

app.listen(5000, () => {
	console.log('Server has started on port 5000');
});
