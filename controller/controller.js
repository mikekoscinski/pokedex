const model = require('../model/model.js');
// also require view
// and export controller so router can access



exports.getPokedexIndex = async (req, res) => {
	try {
		const allPokemon = await pool.query('SELECT pokedex_id, name FROM "Pokemon"');
		res.json(allPokemon.rows);
		
		// TODO: Does the view have to be rendered in here? (Yes)
		
	} catch (error) {
		console.error(error.message);
	}
};

exports.getPokedexEntry = async (req, res) => {
	try {
		const { name } = req.params;
		const pokemon = await pool.query('SELECT * FROM "Pokemon" WHERE name = $1', [name]);
		res.json(pokemon.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
};



async function getPokedexIndexData () {
	await pool.query('SELECT pokedex_id, name FROM "Pokemon"');
}

