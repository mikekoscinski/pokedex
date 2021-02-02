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

router.post('/signup', async (req, res) => {
	try {
		console.log('Headers', req.headers);
		console.log('Body', req.body);
		
		const { username, email } = req.body;
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		
		// TODO: How can I tell if the username is taken? Do the same for email. Also need to enforce password rules.
		// Currently, this doesn't inform the user if their desired 'username' is taken. Need to indicate that somehow.
		
		const { rows } = await model.isUsernameTaken(username);
		// if (rows.length === 0) return res.send(200);
		
		const insertNewUser = await model.insertUserData(username, email, hashedPassword);
		
		// TODO: Am I going to use this for anything? Or should I just send status code back?
		res.json({ username: username });
		
		// res.send({
		// 	username: username,
		// 	email: email
		// });
		
		// res.sendStatus(200);
		// res.sendStatus(403);
		// res.sendStatus(404);
		// res.sendStatus(500);
		
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
