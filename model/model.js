// 'pg' is only library we need in 'model' directory - allows us to make postgresql queries
const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'mikekoscinski',
	password: '',
	host: 'localhost',
	port: 5432,
	database: 'Dexter'
});

// Functions called in controller.js to retrieve data
module.exports = {
	// TODO: Matching React component named Login; need to match
	getHomepageData: async function () {
		// TODO: Update data once page's utility is finalized
		const data = 'Welcome to the Pokédex.';
		return data;
	},
	
	getIndexData: async function () {
		const data = await pool.query('SELECT pokedex_id, name FROM "Pokemon"');
		return data;
	},
	
	getEntryData: async function (pokedex_id) {
		const data = await pool.query('SELECT * FROM "Pokemon" WHERE pokedex_id = $1', [pokedex_id]);
		const movesData = await pool.query('SELECT move_id, method_obtained_id, level_obtained_id FROM "PokemonMove" WHERE pokedex_id = $1', [pokedex_id]);		
		return data;
	},

	getEntryMovesData: async function (pokedex_id) {
		const data = await pool.query('SELECT move_id, method_obtained_id, level_obtained_id FROM "PokemonMove" WHERE pokedex_id = $1', [pokedex_id]);
		return data;
	},

	getEntryMovesInfo: async function () {
		const data = await pool.query('SELECT * FROM "Move"');
		return data;
	},
	
	getSearchData: async function () {
		const data = await pool.query('SELECT pokedex_id, name, primary_type_id, secondary_type_id, hp, attack, defense, special_attack, special_defense, speed, total_stats, average_stat FROM "Pokemon"');
		return data;
	},
	
	getTeamData: async function () {
		// TODO: Should user_id be a param here? Is there a way to do that without displaying user_id in the URL? Add user_id as param. Perhaps it should be just like getEntryData -- the GET request is '/:user_id/teams', then destructure { userID } and pass it here as a param. E.G. const data = await pool.query('SELECT * FROM "Team" WHERE user_id = $1', [user_id]);
		const data = 'Update getTeamData() query in model.js';
		return data;
	},
	
	getAccountData: async function () {
		// TODO: Update query -- will take form of pool.query(${query}). Same as getTeamData() -- pass user_id as a param; destructure it as { userID } in controller.js. E.G. const data = pool.query('SELECT * FROM "User" WHERE user_id = $1', [user_id]);
		const data = 'Update getAccountData() query in model.js';
		return data;
	}
};
