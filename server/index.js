const express = require('express');
const app = express();
const cors = require('cors');
const pokemonController = require('../controller/pokemon-controller');

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES (RESTful API with Postgres):
// Get all pokemon (for index page)
app.get('/pokemon', pokemonController.index);

// Get a specific pokemon (for individual pokedex entry page)
app.get('/pokemon/:name', pokemonController.entry); // TODO: This is currently case-sensitive; must pass 'Bulbasaur' as param; 'bulbasaur' as lowercase will return nothing

app.listen(5000, () => {
	console.log('Server has started on port 5000');
});
