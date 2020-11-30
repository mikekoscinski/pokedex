// 'pg' is only library we need in 'model' directory - allows us to make postgresql queries
const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'mikekoscinski',
	password: '',
	host: 'localhost',
	port: 5432,
	database: 'Dexter'
});

// Functions called in 'controller.js' to retrieve data
module.exports = {
	getHomepageData: async function () {
		// TODO: Update when required
		const data = 'Welcome to the Pokédex.';
		return data;
	},
	
	getIndexData: async function () {
		const data = await pool.query('SELECT pokedex_id, name FROM "Pokemon"');
		return data;
	},
	
	getEntryData: async function (name) {
		const data = await pool.query('SELECT * FROM "Pokemon" WHERE name = $1', [name]);
		return data;
	},
		
	getSearchData: async function () {
		const data = await pool.query('SELECT pokedex_id, name, primary_type_id, secondary_type_id, hp, attack, defense, special_attack, special_defense, speed, total_stats, average_stat FROM "Pokemon"');
		return data;
	},
	
	getTeamData: async function () {
		// TODO: Should user_id be a param here? Is there a way to do that without displaying user_id in the URL?
		const data = 'Update getTeamData() query in model.js'; // TODO
		return data;
	},
	
	getAccountData: async function () {
		// TODO: Update query -- will take form of pool.query(${query});
		const data = 'Update getAccountData() query in model.js';
		return data;
	}
};
