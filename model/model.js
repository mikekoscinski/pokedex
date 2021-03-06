require('dotenv').config()
// 'pg' is only library we need in 'model' directory - allows us to make postgresql queries
const Pool = require('pg').Pool;

// TODO: Pull this in from .env
const pool = new Pool({
	user: process.env.PG_POOL_USER,
	password: process.env.PG_POOL_PASSWORD,
	host: process.env.HOSTNAME,
	port: process.env.PG_POOL_PORT,
	database: process.env.PG_POOL_DATABASE
});

// Functions called in controller.js to retrieve data
module.exports = {
	getAccountData: async function (column, oldValue) {
		const data = await pool.query(`SELECT * FROM "User" WHERE ${column} = $1`, [oldValue]).catch(err => console.error(err.stack))
		return data;
	},
	
	updateLastLoginTime: async function (email) {
		const data = await pool.query('UPDATE "User" SET last_login = NOW() WHERE email = $1', [email]).catch(err => console.error(err.stack))
	},
	
	getDuplicateKeyValue: async function (key, value) {
		const data = await pool.query(`SELECT ${key} FROM "User" WHERE ${key} = $1`, [value]).catch(err => console.error(err.stack))
		return data;
	},
	
	insertUserData: async function (username, email, hashedPassword) {
		const data = await pool.query('INSERT INTO "User" (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]).catch(err => console.error(err.stack))
	},
	
	insertRefreshToken: async function (email, refreshToken) {
		const data = await pool.query('INSERT INTO "RefreshToken" (email, refresh_token) VALUES ($1, $2)', [email, refreshToken]).catch(err => console.error(err.stack))
	},
	
	getRefreshToken: async function (refreshToken) {
		const data = await pool.query('SELECT refresh_token FROM "RefreshToken" WHERE refresh_token = $1', [refreshToken]).catch(err => console.error(err.stack))
		return data;
	},
	
	getIndexData: async function () {
		const data = await pool.query('SELECT pokedex_id, name FROM "Pokemon"').catch(err => console.error(err.stack))
		return data;
	},
	
	getEntryData: async function (pokedex_id) {
		const data = await pool.query('SELECT * FROM "Pokemon" WHERE pokedex_id = $1', [pokedex_id]).catch(err => console.error(err.stack))
		return data;
	},

	getEntryMovesData: async function (pokedex_id) {
		const data = await pool.query('SELECT move_id, method_obtained_id, level_obtained_id FROM "PokemonMove" WHERE pokedex_id = $1', [pokedex_id]).catch(err => console.error(err.stack))
		return data;
	},

	getEntryMovesInfo: async function () {
		const data = await pool.query('SELECT * FROM "Move"').catch(err => console.error(err.stack))
		return data;
	},
	
	getPokemonSearchData: async function () {
		const data = await pool.query('SELECT pokedex_id, region_id, name, primary_type_id, secondary_type_id, hp, attack, defense, special_attack, special_defense, speed, total_stats, average_stat FROM "Pokemon"').catch(err => console.error(err.stack))
		return data;
	},

	getMovesSearchData: async function () {
		const data = await pool.query('SELECT * FROM "Move"').catch(err => console.error(err.stack))
		return data;
	},
	
	/* TODO: Reserved for future development
	getTeamData: async function () {
		// TODO: Should user_id be a param here? Is there a way to do that without displaying user_id in the URL? Add user_id as param. Perhaps it should be just like getEntryData -- the GET request is '/:user_id/teams', then destructure { userID } and pass it here as a param. E.G. const data = await pool.query('SELECT * FROM "Team" WHERE user_id = $1', [user_id]);
		const data = 'Update getTeamData() query in model.js';
		return data;
	},
	*/
	
	updateAccountData: async function (column, newValue, email) {
		const data = await pool.query(`UPDATE "User" SET ${column} = $1 WHERE email = $2`, [newValue, email]).catch(err => console.error(err.stack))
	},
};
