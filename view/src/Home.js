import React, { useEffect } from "react";

const checkClientAccessToken = require('./checkclientaccesstoken.js').default

export default function Home () {
	useEffect(() => {
		checkClientAccessToken(localStorage.getItem('accessToken'))('/')
	})
	
	return (
		<div className='banner'>
			<h3>PokédexClub</h3>
			<h1>Find your strongest team in 60 seconds</h1>
			<div>
				<p>PokédexClub is the fastest way to compare pokémon stats. Sign up to find your dream team today.</p>
			</div>
			<ul>
				<li>
					<a href="/signup">
						<button className='button signup'>
							Sign up
						</button>
					</a>
				</li>
				<li><a href="/signin"><button className='button signin'>Sign in</button></a></li>
			</ul>
		</div>
	)
}
