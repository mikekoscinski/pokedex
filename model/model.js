// 'pg' is only library we need in 'model' directory

const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'mikekoscinski',
	password: '',
	host: 'localhost',
	port: 5432,
	database: 'Dexter'
});



async function getPokedexIndexPageData () {
	await pool.query('SELECT pokedex_id, name FROM "Pokemon"');
}


async function getPokemonEntry (name) {
	const pokemon = await pool.query('SELECT * FROM "Pokemon" WHERE name = $1', [name]);
}

