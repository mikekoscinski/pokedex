import React from 'react'
// Note: Removed BrowserRouter; just use <a href>

export default function Navmenu() {
	return (
			<div className="navmenu" key="navmenu">
				<h1>Navmenu</h1>
				<ul className="navmenu-items">
					<li><a href="/pokemon">Pokemon</a></li>
					<li><a href="/search">Search</a></li>
					<li><a href="/teams">Teams</a></li>
					<li><a href="/myaccount">Account</a></li>
				</ul>
			</div>
	)
};
