// 'pg' is only library we need in 'model' directory

const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'mikekoscinski',
	password: '',
	host: 'localhost',
	port: 5432,
	database: 'Dexter'
});

module.exports = {
	getIndexData: async function () {
		const data = await pool.query('SELECT pokedex_id, name FROM "Pokemon"');
		return data;
	},
	
	getEntryData: async function (name) {
		const data = await pool.query('SELECT * FROM "Pokemon" WHERE name = $1', [name]);
		return data;
	}
};
