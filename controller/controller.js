const express = require('express');
const router = express.Router();

const model = require('../model/model.js');
// TODO: also require view and export controller so router can access


router.get('/pokemon', async (req, res) => {
	try {
		const indexData = await model.getIndexData();
		res.send(indexData.rows); // TODO: alternative: res.json()
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

router.get('/pokemon/:name', async (req, res) => {
	try {
		const { name } = req.params; // must destructure; req.params = object w/ 'name' property
		const entryData = await model.getEntryData(name);
		res.send(entryData.rows[0]); // TODO: alternative: res.json()
		// TODO: Render view
	} catch (error) {
		console.error(error.message);
	}
});

module.exports = router;
