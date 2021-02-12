import React from "react";

export default function Home () {
	// TODO: Eventually need to check if token is valid:
	if (localStorage.getItem('accessToken')) return window.location.replace('/pokemon')
	
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
