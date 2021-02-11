// NOTE: res.send() sets content type to text/HTML; client will treat it as text. res.json() sets content type to application/JSON; client treats response string as valid JSON object

// NOTE: node-postgres (pg.Pool.query) returns 'rows' property on its response object. Thus, { rows } destructuring.

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

/* For creating new accessTokens. Not currently used. Saved for future splitting of auth and app servers
router.post('/token', async (req, res) => {
	try {
		const refreshToken = await getTokenFromHeader(req);
		if (refreshToken === null) return res.sendStatus(401)
		const tokenRecordDoesExist = await model.getRefreshToken(refreshToken)
		if (!tokenRecordDoesExist) return res.sendStatus(403)
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
			if (error) return res.sendStatus(403)
			const accessToken = generateAccessToken({ credential: user.credential })
			res.json({ accessToken: accessToken })
		})
	} catch (error) {
		console.error(error.message)
	}
})
*/

router.delete('/signout', (req, res) => {
	// TODO: Delete refresh token from database
	
	
	res.sendStatus(204)
})




// Routes:
router.get('/', async (req, res) => {
	try {
		const { rows } = await model.getHomepageData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

router.post('/signin', async (req, res) => {
	try {
		// TODO: Do we already have a valid accessToken? If so, redirect to /pokemon
		
		const email = req.body.email.toString()
		const password = req.body.password.toString()
		const { rows } = await model.getAccountCredentials(email);
		if (rows.length === 0) return res.status(400).send({ 
			error: 'The email and password you entered did not match our records. Please double-check and try again.' 
		});
		try {
			if (await bcrypt.compare(password, rows[0].password)) {
				const user = { credential: email }
				const accessToken = generateAccessToken(user)
				
				// TODO: Refresh tokens not currently used. Save for eventual splitting of auth & app servers
				// Manually expire refresh tokens (vs. hardcoded expiration for accessTokens)
				// const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET) 
				// TODO: Save refreshToken as httpOnly cookie -- NOT in localStorage.
				// const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
				// Store plaintext server-side
				// await model.insertRefreshToken(email, refreshToken)
				
				return res.send({ 
					message: 'Success', 
					accessToken: accessToken 
					// refreshToken: refreshToken,
					// email: email
					// TODO: Sending email probably a bad idea though. Easy to impersonate - literally just edit localStorage
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
		return res.send({ 
			message: 'Success: User successfully created.' 
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

router.get('/pokemon/:pokedex_id/moves', async (req, res) => {
	try {
		const pokedex_id = req.params.pokedex_id.toString();
		const { rows } = await model.getEntryMovesData(pokedex_id);
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

// TODO: Implement authenticateToken
router.get('/moves', async (req, res) => {
	try {
		const { rows } = await model.getEntryMovesInfo();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

// TODO: Implement authenticateToken
router.get('/search/pokemon', async (req, res) => {
	try {
		const { rows } = await model.getPokemonSearchData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

// TODO: Implement authenticateToken
router.get('/search/moves', async (req, res) => {
	try {
		const { rows } = await model.getMovesSearchData();
		res.send(rows);
	} catch (error) {
		console.error(error.message);
	}
});

// TODO: Implement authenticateToken
router.get('/teams', async (req, res) => {
	try {
		const { rows } = await model.getTeamData();
		res.send(rows); 
		// TODO: Update to teamData.data once PSQL table + query finalized
	} catch (error) {
		console.error(error.message);
	}
});

// TODO: Implement authenticateToken
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
