// res.send() sets content type to text/HTML; client will treat it as text. res.json() sets content type to application/JSON; client treats response string as valid JSON object

const express = require('express');
const router = express.Router();
const model = require('../model/model.js');
// TODO: require view

router.get('/', async (req, res) => {
	try {
		const { data } = await model.getHomepageData();
		res.send(data);
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});










////////////////////////////////////////////////////////////

router.get('/pokemon', async (req, res) => {
	try {
		const { data } = await model.getIndexData();

		console.log('test');

		// TODO: I need to somehow use data.forEach(el => renderView(el));
		
		// TODO: Render view. I think I need to call a renderView function with 'data' passed as a paremeter (then, in the React component file, call .forEach on 'data' to render each row in the component)
		res.send(data);
		// res.render('index');
		
		
		
		// TODO: Store 'data' in dictionary
		// don't do an array of objects here
		
		
	} catch (error) {
		console.error(error.message);
	}
});

////////////////////////////////////////////////////////////






// TODO: Should this be /pokemon/:pokedex_id? Because shouldn't have duplicate entries? Instead should do an edge case render for Castform + Deoxys entirely within Entry.js
router.get('/pokemon/:name', async (req, res) => {
	try {
		const { name } = req.params;
		const { data } = await model.getEntryData(name);
		res.send(data);
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/search', async (req, res) => {
	try {
		const { data } = await model.getSearchData();
		res.send(data);
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/teams', async (req, res) => {
	try {
		const { data } = await model.getTeamData();
		res.send(data); 
		// TODO: Update to teamData.data once PSQL table + query finalized
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/account', async (req, res) => {
	try {
		const { data } = await model.getAccountData();
		res.send(data); 
		// TODO: Update to accountData.data once PSQL table + query finalized
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

module.exports = router;
