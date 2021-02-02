// res.send() sets content type to text/HTML; client will treat it as text. res.json() sets content type to application/JSON; client treats response string as valid JSON object

// NOTE: node-postgres (pg.Pool.query) returns 'rows' property on its response object. Thus, data returned must be named 'rows'.

const express = require('express');
const router = express.Router();
const model = require('../model/model.js');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
	try {
		const { rows } = await model.getHomepageData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

// TODO: in router.post('/signin'), need to update last_login with NOW() when user authenticates a new session

// TODO: Should breakout checkDuplicate(username), checkDuplicate(password) as separate middleware



router.post('/signup', async (req, res) => {
	try {
		const { username, email } = req.body;
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		
		const isUnique = async (key, value) => (await model.getDuplicateKeyValue(key, value)).rows.length === 0;
		const isUniqueUsername = await isUnique('username', username)
		const isUniqueEmail = await isUnique('email', email)
		
		if (!isUniqueUsername) {
			console.log('Error: username')
			return res.status(204).send(JSON.stringify({ error: 'Error: Username already taken. Please choose a unique username.' }))
		} else if (!isUniqueEmail) {
			console.log('Error: email')
			return res.status(204).send(JSON.stringify({ error: 'Error: Email already taken. Please choose a unique email.' }))
		} else {
			console.log('Success.')
			const insertNewUser = await model.insertUserData(username, email, hashedPassword);
			return res.status(201).send(JSON.stringify({ message: 'Success. User created.' }))
		}
		
		
	} catch (error) {
		console.error(error.message);
	}
});



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
