const express = require('express');
const router = express.Router();
const model = require('../model/model.js');
// TODO: require view 

router.get('/', async (req, res) => {
	try {
		// TODO: Update response
		res.send('Welcome to the Pokédex.');
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
})

router.get('/pokemon', async (req, res) => {
	try {
		const indexData = await model.getIndexData();
		// TODO: alternative to res.send() is: res.json()
		res.send(indexData.rows);
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/pokemon/:name', async (req, res) => {
	try {
		const { name } = req.params; // must destructure - req.params is an object w/ 'name' property
		const entryData = await model.getEntryData(name);
		res.send(entryData.rows[0]);
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/search', async (req, res) => {
	try {
		const searchData = await model.getSearchData();
		res.send(searchData.rows);
		// TODO: Update response
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/teams', async (req, res) => {
	try {
		// TODO: Update response
		res.send('Welcome to your teams page.');
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/account', async (req, res) => {
	try {
		// TODO: Update response
		res.send('Welcome to your account page.');
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

module.exports = router;
