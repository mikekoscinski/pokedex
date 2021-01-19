import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components:
import PokemonTable from './PokemonTable';
import MovesTable from './MovesTable';

export default function Search () {
	const [pokemon, setPokemon] = useState([]);
	const [moves, setMoves] = useState([]);
	
	const getPokemon = async () => {
		try {
			const response = await fetch('http://localhost:5000/search/pokemon');
			const jsonData = await response.json();
			setPokemon(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	}
	
	const getMoves = async () => {
		try {
			const response = await fetch('http://localhost:5000/search/moves');
			const jsonData = await response.json();
			setMoves(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	}
	
	useEffect(() => {
		getPokemon();
	}, []);
	
	useEffect(() => {
		getMoves();
	}, []);
	
	return (
		<>
		<h1>Search</h1>
		<div className="table-links">
			<a href="/search" className="table-link"><button>Pokemon</button></a>
			<a href="/search/moves" className="table-link"><button>Moves</button></a>
		</div>
		<BrowserRouter>
			<Switch>
				<Route exact path="/search">
					<PokemonTable pokemon={pokemon} />
				</Route> 
				<Route exact path="/search/moves">
					<MovesTable moves={moves} />
				</Route> 
			</Switch>
		</BrowserRouter>
		</>
	)
}
