// NOTE: res.send() sets content type to text/HTML; client will treat it as text. res.json() sets content type to application/JSON; client treats response string as valid JSON object

// NOTE: node-postgres (pg.Pool.query) returns 'rows' property on its response object. Thus, { rows } destructuring.

// NOTE: AJAX prevents server-side call of res.redirect. Source: https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected

// Libraries:
require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Modules:
const model = require('../model/model.js');

// Middleware:
const getTokenFromHeader = (req) => {
	if (
		req.headers.authorization 
		&& req.headers.authorization.split(' ')[0] === 'Bearer'
	) return req.headers.authorization.split(' ')[1];
}

const authenticateToken = async (req, res, next) => {	
	const clientToken = getTokenFromHeader(req)
	if (clientToken === null) return res.sendStatus(401)
	// They have a token - now verify it (make sure you're using the correct TOKEN_SECRET)
	jwt.verify(clientToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		// NOTE: can't redirect an AJAX request - AJAX explicitly prohibits altering client URL (fetch is an interface for AJAX requests)
		if (error) return res.sendStatus(403)
		// Once verified, append user to the request, proceed to next middleware
		req.user = user;
		return next();
	})
}

const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}

// Utility functions:
const passwordIsValid = (password) => {
	if (
		password.length >= 12
		&& password.length <= 100
		&& password.match(/^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+])(?=.*\d).*$/g)
	) return true
	return false
}

// Routes:
router.get('/', async (req, res) => {
	try {
		return res.sendStatus(200)
	} catch (error) {
		console.error(error.message)
	}
})

router.post('/signin', async (req, res) => {
	try {
		const email = req.body.email.toString()
		const password = req.body.password.toString()
		const { rows } = await model.getAccountData('email', email);
		const username = rows[0].username
		if (rows.length === 0) return res.status(400).send({ 
			error: 'The email and password you entered did not match our records. Please double-check and try again.' 
		});
		try {
			if (await bcrypt.compare(password, rows[0].password)) {
				const userForJWT = { email: email, username: username }
				const accessToken = generateAccessToken(userForJWT)
				const updateLastLogin = await model.updateLastLoginTime(email)
				return res.send({ 
					message: 'Success',
					accessToken: accessToken
				})
			}
			return res.send({ 
				error: 'The email and password you entered did not match our records. Please double-check and try again.' 
			})
		} catch (error) {
			console.error(error.message)
		}
	} catch (error) {
		console.error(error.message)
	}
})

router.post('/signup', async (req, res) => {
	try {
		const username = req.body.username.toString()
		const email = req.body.email.toString()
		const password = req.body.password.toString()
		
		const isUnique = async (key, value) => (await model.getDuplicateKeyValue(key, value)).rows.length === 0;
		const isUniqueUsername = await isUnique('username', username)
		const isUniqueEmail = await isUnique('email', email)
		
		// Input validation:
		if (!isUniqueUsername) return res.send({ 
			error: 'Error: This username is already taken. Please try another.' 
		})
		if (!isUniqueEmail) return res.send({ 
			error: 'Error: This email is already taken. Please try another.' 
		})
		if (!passwordIsValid(password)) return res.send({ 
			error: 'Error: Invalid password. Please try again.' 
		})
		
		// Hash only after all validation checks pass
		const hashedPassword = await bcrypt.hash(password, 10);
		const insertNewUser = await model.insertUserData(username, email, hashedPassword);
		
		const userForJWT = { email: email, username: username }
		const accessToken = generateAccessToken(userForJWT)
		
		return res.send({ 
			message: 'Success: User successfully created.',
			accessToken: accessToken
		})
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/pokemon', authenticateToken, async (req, res) => {
	try {
		const { rows } = await model.getIndexData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/pokemon/:pokedex_id', authenticateToken, async (req, res) => {
	try {
		// :pokedex_id is sole object property in req.params
		const pokedex_id = req.params.pokedex_id.toString();
		const { rows } = await model.getEntryData(pokedex_id);
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/pokemon/:pokedex_id/moves', authenticateToken, async (req, res) => {
	try {
		const pokedex_id = req.params.pokedex_id.toString();
		const { rows } = await model.getEntryMovesData(pokedex_id);
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/moves', authenticateToken, async (req, res) => {
	try {
		const { rows } = await model.getEntryMovesInfo();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/search/pokemon', authenticateToken, async (req, res) => {
	try {
		const { rows } = await model.getPokemonSearchData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/search/moves', authenticateToken, async (req, res) => {
	try {
		const { rows } = await model.getMovesSearchData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

/* TODO: Reserved for future feature
router.get('/teams/', authenticateToken, async (req, res) => {
	try {
		const { rows } = await model.getTeamData();
		// TODO: 'rows' currently undefined; need to define what i want to retrieve in DB
		// TODO: Need to create table for this data
		res.send([{ pokemon1: 'Gyrados', pokemon2: 'Golem', pokemon3: 'Arcanine' }])
		// res.send(rows); 
	} catch (error) {
		console.error(error.message);
	}
});
*/

router.get('/account', authenticateToken, async (req, res) => {
	try {
		res.status(200).send({ 
			username: req.user.username, email: req.user.email  
		})
	} catch (error) {
		console.error(error.message)
	}
})

router.put('/account', authenticateToken, async (req, res) => {
	try {
		// NOTE: dataTypes of email/username/password *currently* match column IDs in PSQL DB. That may change in future iterations of "User" table
		const email = req.user.email
		const dataType = req.body.dataType.toString()
		// null handles password edge case; we don't store password in JWT
		const currentValue = req.user[dataType] || null
		const newValueFromUser = req.body.newValue.toString()
		const { rows } = await model.getAccountData(dataType, currentValue)
		
		if (dataType === 'email' || dataType === 'username') {
			// Check if desired email/username is available
			const isUserProvidedValueAvailable = await model.getDuplicateKeyValue(dataType, newValueFromUser).then(res => res.rows.length)
			if (isUserProvidedValueAvailable !== 0) return res.status(400).send({
				message: `Error: This ${dataType} is already taken. Please choose a unique ${dataType}.`
			})
			const updateUserInfo = await model.updateAccountData(dataType, newValueFromUser, email)
			return res.send({
				message: `Success: Your ${dataType} has been successfully updated.`
			})
		}
		
		if (dataType === 'password') {
			if (!passwordIsValid(newValueFromUser)) return res.send({ 
			error: 'Error: Invalid password. Please try again.' 
			})
			const newHashedPassword = await bcrypt.hash(newValueFromUser, 10)
			const updatePassword = await model.updateAccountData(dataType, newHashedPassword, email)
			return res.send({ 
				message: `Success: Your ${dataType} has been successfully updated.`
			})
		}
	} catch (error) {
		console.error(error.message);
	}
});

router.delete('/signout', (req, res) => {
	res.sendStatus(204)
})

module.exports = router;
