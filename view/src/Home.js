import React, { useEffect } from "react";

const authenticateTokenOnPublicRoute = require('./checkclientaccesstoken.js').default

export default function Home () {
	useEffect(() => {
		authenticateTokenOnPublicRoute(localStorage.getItem('accessToken'))('/')
	})
	
	return (
		<>
		<h1>Welcome to the Pokédex</h1>
		<ul>
			<li><a href="/signin">Sign in</a></li>
			<li><a href="/signup">Sign up</a></li>
		</ul>
		</>
	)
}
