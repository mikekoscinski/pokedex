// Re-install node modules

const express = require('express');
const app = express(); // Should I invoke .router() here instead? Read the arguments for & against. I think using .router() is considered the best practice, as it creates mini apps that are easier to manage?
const cors = require('cors');


// Middleware
app.use(cors());
app.use(express.json());


// Controllers
const pokemonController = require('./controller');
const { Router } = require('express');


/////////////////////////////////////////
// ROUTES (RESTful API with Postgres): //
/////////////////////////////////////////

// DRAFT:

// where getIndex() and getEntry() come from const controller = require('./controller.js')

// router.get('/pokemon', getPokedexIndex()); 
// router.get('/pokemon/:name', getPokedexEntry());
// replicate for all other pages: e.g. search, teams, account


app.get('/pokemon', pokemonController.getPokedexIndex);
app.get('/pokemon/:name', pokemonController.getPokedexEntry); // TODO: fix case-sensitive; must pass 'Bulbasaur'; 'bulbasaur' returns nothing



app.listen(5000, () => {
	console.log('Server has started on port 5000');
});

