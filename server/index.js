const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database.js'); // lets us run queries with postgres

// Middleware
app.use(cors());
app.use(express.json());


// ROUTES

// Get all pokemon

app.get("/pokemon", async (req, res) => {
	try {
		const allPokemon = await pool.query('SELECT * FROM "Pokemon"');
		res.json(allPokemon.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// Get specific pokemon

// TODO: This is currently case-sensitive; must pass 'Bulbasaur' as param; 'bulbasaur' as lowercase will return nothing

app.get("/pokemon/:name", async (req, res) => {
	try {
		const { name } = req.params;
		const pokemon = await pool.query('SELECT * FROM "Pokemon" WHERE name = $1', [name]);
		res.json(pokemon.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});



app.listen(5000, () => {
	console.log('Server has started on port 5000');
});
