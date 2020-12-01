// res.send() sets content type to text/HTML; client will treat it as text. res.json() sets content type to application/JSON; client treats response string as valid JSON object

const express = require('express');
const router = express.Router();
const model = require('../model/model.js');
// TODO: require view

router.get('/', async (req, res) => {
	try {
		const homepageData = await model.getHomepageData();
		res.send(homepageData);
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});





router.get('/pokemon', async (req, res) => {
	try {
		const indexData = await model.getIndexData(); 
		// TODO: Should I spread this into an array prior to using forEach() to render views?
		
		// TODO: Cannot use .forEach() directly on indexData. Must first turn it into an array. Can do so with: const indexDataArray = Object.entries(indexData);
		
		res.send(indexData.rows);
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});





router.get('/pokemon/:name', async (req, res) => {
	try {
		const { name } = req.params; // object destructuring to extract 'name' property value from req.params (req = object w/ 'name' param)
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
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/teams', async (req, res) => {
	try {
		const teamData = await model.getTeamData();
		res.send(teamData); // TODO: Update to teamData.rows once PSQL table + query finalized
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/account', async (req, res) => {
	try {
		const accountData = await model.getAccountData();
		res.send(accountData); // TODO: Update to accountData.rows once PSQL table + query finalized
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

module.exports = router;
