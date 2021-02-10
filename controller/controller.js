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
const authenticateToken = async (req, res, next) => {	
	const authHeader = req.headers['authorization']
	const clientToken = authHeader && authHeader.split(' ')[1]
	
	if (clientToken === null) return res.sendStatus(401)
	
	/*
	// TODO: This isn't getting used right now. Would need it if I encrypt token client-side
	// Do we have a record of this token?
	const { rows } = await model.getRefreshToken(clientToken)
	console.log(rows.length)
	*/
	
	// They have a token - now verify it (make sure you're using the correct TOKEN_SECRET)
	jwt.verify(clientToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		console.log(error)
		if (error) return res.sendStatus(403)
		// Once verified, add user to the request, proceed to next middleware
		req.user = user;
		return next();
	})
}

const generateAccessToken = (user) => {
	// TODO: Update 15s to 10m
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


////////////////////////////////////
// AUTH TOKENS
////////////////////////////////////

const getTokenFromHeader = (req) => {
	// TODO: I am receiving the refreshToken here. I need to compare, return accessValid or accessInvalid. This should be reused across everything. I think this should probably be middleware instead of a route?
	if (
		req.headers.authorization 
		&& req.headers.authorization.split(' ')[0] === 'Bearer'
	) return req.headers.authorization.split(' ')[1];
}

// TODO: This doesn't currently do anything. Do I need this? Can I turn this into middleware?
router.post('/auth', async (req, res) => {
	try {
		const refreshToken = await getTokenFromHeader(req);
		console.log('one');
		res.send({ response: 'sending' })
	} catch (error) {
		console.error(error.message)
	}
})

////////////////////////////////////
////////////////////////////////////

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
				const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET) // Manually expire
				// TODO: Save refreshToken as httpOnly cookie -- NOT in localStorage.
				const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
				// Store the plaintext server-side...
				await model.insertRefreshToken(email, refreshToken)
				
				// TODO: Need to add logic that checks for token on current machine before creating a new token. This can be achieved server-side; always send token with client requests; check if token is in request; if so then redirect. Basically, redirect from sign-in page if client already has token
				
				// TODO:
				// Get this working with httpOnly: false first
				// TODO: On client side: "How to include cookies in HTTP request?"
				// This error hasn't shown up in most tutorials because they all use Postman. They aren't sending actual fetch requests from a client.
				res.cookie('token', 'secret', { httpOnly: false })
				// https://github.com/outmoded/discuss/issues/545
				// on client: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
				// on client: https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
				
				// ... Send encrypted to client
				return res.send({ 
					message: 'Success', 
					accessToken: accessToken, 
					refreshToken: refreshToken,
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
		
		// Insert new user and return 'success' response
		const insertNewUser = await model.insertUserData(username, email, hashedPassword);
		return res.send({ 
			message: 'Success: User successfully created.' 
		})
	} catch (error) {
		console.error(error.message);
	}
});




// TODO: Using authenticateToken middleware -- this is 1st test case. Once passes must be implemented on all restricted routes
router.get('/pokemon', authenticateToken, async (req, res) => {
	console.log(req.user)
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
