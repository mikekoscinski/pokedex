// Retrieves data from "Pokemon" table in "Dexter" PostgreSQL database

const pool = require('./database.js'); // lets us run queries with postgres

exports.index = async (req, res) => {
	try {
		const allPokemon = await pool.query('SELECT pokedex_id, name FROM "Pokemon"');
		res.json(allPokemon.rows);
	} catch (error) {
		console.error(error.message);
	}
};

exports.entry = async (req, res) => {
	try {
		const { name } = req.params;
		const pokemon = await pool.query('SELECT * FROM "Pokemon" WHERE name = $1', [name]);
		res.json(pokemon.rows[0]);
	} catch (error) {
		console.error(error.message);		
	}
}
