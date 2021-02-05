// res.send() sets content type to text/HTML; client will treat it as text. res.json() sets content type to application/JSON; client treats response string as valid JSON object

// NOTE: node-postgres (pg.Pool.query) returns 'rows' property on its response object. Thus, { rows } destructuring.

require('dotenv').config()

const express = require('express');
const router = express.Router();
const model = require('../model/model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
	try {
		const { rows } = await model.getHomepageData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});




function authenticateToken (req, res, next) {
	const authHeader = req.headers['authorization']
	// If we have authHeader, then return the TOKEN from authHeader (authHeader looks like: 'Bearer TOKEN'). Otherwise return undefined.
	const token = authHeader && authHeader.split(' ')[1]
	
	// Check that they have a token
	if (token === null) return res.sendStatus(401)
	
	// They have a token - now confirm it's verified
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		if (error) return res.sendStatus(403)
		// Now we know we have a valid token
		req.user = user
		next()
	})
}

function generateAccessToken (user) {
	// TODO: Update 15s to 10m
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


// TODO: in router.post('/signin'), need to update last_login with NOW() when user authenticates a new session

// TODO: Add accessToken +/ refreshToken to localStorage

router.post('/signin', async (req, res) => {
	try {
		const { email, password } = req.body;
		const { rows } = await model.getAccountCredentials(email);

		if (rows.length === 0) return res.status(400).send({ error: 'The email and password you entered did not match our records. Please double-check and try again.' });
		
		try {
			if (await bcrypt.compare(password, rows[0].password)) {
				// This user is fed into Fn authenticateToken()
				const user = { credential: email }
				const accessToken = generateAccessToken(user)
				// Manually handle expiration of RefreshToken
				const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
				
				// TODO: Add refreshToken to DB
				
				
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








router.post('/signup', async (req, res) => {
	try {
		const { username, email, password } = req.body;
		
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
