require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = {
	authenticateToken: function (req, res, next) {
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
	},

	generateAccessToken: function (user) {
		// TODO: Update 15s to 10m
		return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
	}
};
