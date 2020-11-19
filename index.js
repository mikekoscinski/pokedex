const express = require("express");

const app = express();

app.get('/', (request, response) => {
	response.status(200).send('Hello world, welcome to the pokedex.');
})

app.listen(port, () => {
	console.log('App running on port 3000.');
})
