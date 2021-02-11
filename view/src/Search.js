import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components:
import PokemonTable from './PokemonTable';
import MovesTable from './MovesTable';

export default function Search () {
	const [pokemon, setPokemon] = useState([]);
	const [moves, setMoves] = useState([]);
		
	const getPokemon = async () => {
		try {
			fetch('http://localhost:5000/search/pokemon', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
				}
			})
			.then(res => {
				if (!res.ok) return window.location.replace('/')
				return res.json()
			})
			.then(json => setPokemon(json))
		} catch (error) {
			console.error(error.message);
		}
	}
	
	const getMoves = async () => {
		try {
			fetch('http://localhost:5000/search/moves', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
				}
			})
			.then(res => {
				if (!res.ok) return window.location.replace('/')
				return res.json()
			})
			.then(json => setMoves(json))
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
		{/* TODO: This should be optimized. This runs duplicate Network requests every time the user changes the page  */}
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
