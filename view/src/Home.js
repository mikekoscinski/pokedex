import React, { useEffect } from "react";
import './App.css'


const checkClientAccessToken = require('./checkclientaccesstoken.js').default

export default function Home () {
	useEffect(() => {
		checkClientAccessToken(localStorage.getItem('accessToken'))('/')
	})
	
	return (
		<>
		<h1 className='banner'>Welcome to the Pokédex</h1>
		<ul>
			<li><a href="/signin">Sign in</a></li>
			<li><a href="/signup">Sign up</a></li>
		</ul>
		</>
	)
}
