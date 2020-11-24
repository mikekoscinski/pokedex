const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database.js'); // lets us run queries with postgres

// Middleware
app.use(cors());
app.use(express.json());


// ROUTES

// Get all pokemon

app.get('/Dexter', async (req, res) => {
	try {
		const allPokemon = await pool.query("SELECT * FROM 'Dexter'");
		res.json(allPokemon.rows);
		console.log(allPokemon);
	} catch (error) {
		console.error(error.message);
	}
})

app.listen(5000, () => {
	console.log('Server has started on port 5000');
});
