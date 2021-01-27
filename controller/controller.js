// res.send() sets content type to text/HTML; client will treat it as text. res.json() sets content type to application/JSON; client treats response string as valid JSON object

// NOTE: node-postgres (pg.Pool.query) returns 'rows' property on its response object. Thus, data returned must be named 'rows'.

const express = require('express');
const router = express.Router();
const model = require('../model/model.js');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.urlencoded({ extended: false })); // forms accessible to POST via req.body


// TODO: REMOVE THIS
const users = [];

router.get('/', async (req, res) => {
	try {
		const { rows } = await model.getHomepageData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

/*
router.get('/signin', async (req, res) => {
	try {
		
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/signup', async (req, res) => {
	try {
		
	} catch (error) {
		console.error(error.message);
	}
});
*/

router.post('/signup', async (req, res) => {
	try {
		res.send('Signup');
	} catch (error) {
		console.error(error.message);
	}
});

/* FOR not sure which video this was for - I think WDS
router.post('/signup', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10); // property after 'req.body' corresponds to 'name' field in Signup.js
		users.push({
			id: Date.now().toString(), // would be automatically generated in a DB
			username: req.body.name,
			email: req.body.email,
			password: hashedPassword 
		});
		// res.redirect('/signin');
	} catch (error) {
		console.error(error.message);
	}
	console.log(users);
});
*/

router.get('/pokemon', async (req, res) => {
	try {
		const { rows } = await model.getIndexData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/pokemon/:pokedex_id', async (req, res) => {
	try {
		// pokedex_id (the variable specified in get request URL after colon) is sole object property in req.params
		const { pokedex_id } = req.params;
		const { rows } = await model.getEntryData(pokedex_id);
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/pokemon/:pokedex_id/moves', async (req, res) => {
	try {
		const { pokedex_id } = req.params;
		const { rows } = await model.getEntryMovesData(pokedex_id);
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/moves', async (req, res) => {
	try {
		const { rows } = await model.getEntryMovesInfo();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/search/pokemon', async (req, res) => {
	try {
		const { rows } = await model.getPokemonSearchData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/search/moves', async (req, res) => {
	try {
		const { rows } = await model.getMovesSearchData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/teams', async (req, res) => {
	try {
		const { rows } = await model.getTeamData();
		res.send(rows); 
		// TODO: Update to teamData.data once PSQL table + query finalized
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/account', async (req, res) => {
	try {
		const { rows } = await model.getAccountData();
		res.send(rows); 
		// TODO: Update to accountData.data once PSQL table + query finalized
	} catch (error) {
		console.error(error.message);
	}
});

module.exports = router;
