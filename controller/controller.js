// res.send() sets content type to text/HTML; client will treat it as text. res.json() sets content type to application/JSON; client treats response string as valid JSON object

// NOTE: node-postgres (pg.Pool.query) returns 'rows' property on its response object. Thus, { rows } destructuring.

require('dotenv').config()

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Modules:
const model = require('../model/model.js');
const auth = require('./auth')

router.get('/', async (req, res) => {
	try {
		const { rows } = await model.getHomepageData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

///////////////////////////
///////// SIGN IN /////////
///////////////////////////

// TODO: I am receiving the refreshToken here. I need to compare, return accessValid or accessInvalid. This should be reused across everything. I think this should probably be middleware instead of a route?


const getTokenFromHeader = (req) => {
	if (
		req.headers.authorization 
		&& req.headers.authorization.split(' ')[0] === 'Bearer'
	) return req.headers.authorization.split(' ')[1];
}

router.get('/auth', async (req, res) => {
	try {
		console.log(getTokenFromHeader(req))
		
		
		
	} catch (error) {
		console.error(error.message)
	}
})



router.post('/signin', async (req, res) => {
	try {
		const email = req.body.email.toString()
		const password = req.body.password.toString()
		
		const { rows } = await model.getAccountCredentials(email);

		if (rows.length === 0) return res.status(400).send({ 
			error: 'The email and password you entered did not match our records. Please double-check and try again.' 
		});
		
		try {
			if (await bcrypt.compare(password, rows[0].password)) {
				const user = { credential: email }
				const accessToken = auth.generateAccessToken(user)
				const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET) // Manually expire
				
				// res.append('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`)
				// res.cookie('refreshToken', refreshToken, { withCredentials: true, credentials: 'include', httpOnly: true })
				
				// TODO: Add refreshToken to DB
				await model.insertRefreshToken(refreshToken)
				
				return res.send({ 
					message: 'Success', 
					accessToken: accessToken, 
					refreshToken: refreshToken 
				})
			}
			return res.send({ error: 'The email and password you entered did not match our records. Please double-check and try again.' })
		} catch (error) {
			console.error(error.message)
		}
	} catch (error) {
		console.error(error.message)
	}
})


///////////////////////////
///////// SIGN UP /////////
///////////////////////////


router.post('/signup', async (req, res) => {
	try {
		const username = req.body.username.toString()
		const email = req.body.email.toString()
		const password = req.body.password.toString()
		
		const passwordIsValid = (password) => {
			if (
				password.length >= 12
				&& password.length <= 100
				&& password.match(/^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+])(?=.*\d).*$/g)
			) return true
			return false
		}
		const isUnique = async (key, value) => (await model.getDuplicateKeyValue(key, value)).rows.length === 0;
		const isUniqueUsername = await isUnique('username', username)
		const isUniqueEmail = await isUnique('email', email)
		
		// Input validation:
		if (!isUniqueUsername) return res.send({ error: 'Error: This username is already taken. Please try another.' })
		if (!isUniqueEmail) return res.send({ error: 'Error: This email is already taken. Please try another.' })
		if (!passwordIsValid(password)) return res.send({ error: 'Error: Invalid password. Please try again.' })
		
		// Hash only after all validation checks pass
		const hashedPassword = await bcrypt.hash(password, 10);
		
		// Insert new user and return 'success' response
		const insertNewUser = await model.insertUserData(username, email, hashedPassword);
		return res.send({ message: 'Success: User successfully created.' })
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
		const pokedex_id = req.params.pokedex_id.toString();
		const { rows } = await model.getEntryData(pokedex_id);
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/pokemon/:pokedex_id/moves', async (req, res) => {
	try {
		const pokedex_id = req.params.pokedex_id.toString();
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
