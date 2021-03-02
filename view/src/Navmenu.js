import React from 'react'

const signout = () => {
	localStorage.removeItem('accessToken')
	
	// TODO: Why am I POSTing here?
	fetch('http://localhost:5000/signout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
		}
	})
	return window.location.replace('/')
}

export default function Navmenu() {
	return (
			<div className="navmenu" key="navmenu">
				<ul className="navmenu-items" key={'ul'}>
					<li><strong>Pokédex</strong></li>
					<li key={'pokemon'}><a href="/pokemon" key={'link'}>Pokemon</a></li>
					<li key={'search'}><a href="/search" key={'link'}>Search</a></li>
					
					{/* TODO: 'teams' reserved for future feature */}
					{/* <li key={'teams'}><a href="/teams" key={'link'}>Teams</a></li> */}
					<li key={'account'}><a href="/account" key={'link'}>Account</a></li>
					<li><button onClick={signout}>Sign Out</button></li>
				</ul>
			</div>
	)
};
