const express = require("express");

const app = express();

app.use((request, response) => {
	console.log(request.headers);
	response.setHeader('Content-Type', 'text/html');
	response.end('<html><body><h1>Testing...</h1></body></html>');
});

app.listen(3000, function () {
	console.log('Server is running at port 3000.');
});
