import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

// TODO: Link in Navmenu Routes is not live yet

export default function Navmenu() {
	return (
		<BrowserRouter>
			<div className="navmenu" key="navmenu">
				<h1>Navmenu</h1>
				<ul className="navmenu-items">
					<Route><li className="navmenu-item"><Link to={'/pokemon'}></Link>Pokemon</li></Route>
					<Route><li className="navmenu-item"><Link to={'/search'}></Link>Search</li></Route>
					<Route><li className="navmenu-item"><Link to={'/teams'}></Link>Teams</li></Route>
					<Route><li className="navmenu-item"><Link to={'/myaccount'}></Link>Account</li></Route>
				</ul>
			</div>
		</BrowserRouter>
	)
};
