import React from 'react'
// Note: Removed BrowserRouter; just use <a href>

export default function Navmenu() {
	return (
			<div className="navmenu" key="navmenu">
				<h1 key={'h1'}>Navmenu</h1>
				<ul className="navmenu-items" key={'ul'}>
					<li key={'pokemon'}><a href="/pokemon" key={'link'}>Pokemon</a></li>
					<li key={'search'}><a href="/search" key={'link'}>Search</a></li>
					<li key={'teams'}><a href="/teams" key={'link'}>Teams</a></li>
					<li key={'myaccount'}><a href="/myaccount" key={'link'}>Account</a></li>
				</ul>
			</div>
	)
};
