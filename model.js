const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'mikekoscinski',
	password: '',
	host: 'localhost',
	port: 5432,
	database: 'Dexter'
});


const pool = require("./database");



async function getPokedexIndexPageData () {
	await pool.query('SELECT pokedex_id, name FROM "Pokemon"');
}


async function getPokemonEntry (name) {
	const pokemon = await pool.query('SELECT * FROM "Pokemon" WHERE name = $1', [name]);
}

