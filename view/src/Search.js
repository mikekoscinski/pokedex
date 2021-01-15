import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components:
import PokemonTable from './PokemonTable';
import MovesTable from './MovesTable';

export default function Search () {
	return (
		<>
		<h1>Search</h1>
		<p>Hi!</p>
		<div className="table-links">
			<a href="/search" className="table-link"><button>Pokemon</button></a>
			<a href="/search/moves" className="table-link"><button>Moves</button></a>
		</div>
		<BrowserRouter>
			<Switch>
				<Route exact path="/search" component={PokemonTable} key={'pokemon-table'} />
				<Route exact path="/search/moves" component={MovesTable} key={'moves-table'} />
			</Switch>
		</BrowserRouter>
		</>
	)
}
