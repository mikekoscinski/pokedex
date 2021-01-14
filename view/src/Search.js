import React, { useEffect, useState } from "react";

const composeKey = require('./composekey.js').default;

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
		<p>Hi!</p>
		<div className="table-links">
			<a href="/search" className="table-link"><button>Pokemon</button></a>
			<a href="search" className="table-link"><button>Moves</button></a>
		</div>
		
		<h2>Pokemon Table</h2>
		<table>
			<thead>
				<tr>
					{['Name', 'Region', 'Primary Type', 'Secondary Type', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed', 'Total', 'Average']
						.map(caption => (
							<td key={composeKey(caption)('td')()}>
								<strong key={composeKey(caption)('strong')()}>
									{caption}
								</strong>
							</td>
					))}
				</tr>
			</thead>
			<tbody>
				{pokemon.map(pokemon => (
					<tr key={composeKey(pokemon.name)('tr')()}>
						{['name', 'region_id', 'primary_type_id', 'secondary_type_id', 'attack', 'defense', 'special_attack', 'special_defense', 'speed', 'total_stats', 'average_stat']
							.map(attribute => (
								<td key={composeKey(pokemon.name)(attribute)('td')()}>
									{pokemon[attribute]}
								</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
		
		<h2>Moves Table</h2>
		<table>
			<thead>
				<tr>
					{['Move', 'Generation', 'Type', 'Category', 'Power', 'Accuracy', 'PP', 'Effect']
						.map(caption => (
							<td key={composeKey(caption)('td')()}>
								<strong key={composeKey(caption)('strong')()}>
									{caption}
								</strong>
							</td>
					))}
				</tr>
			</thead>
			<tbody>
				{moves.map(move => (
					<tr key={composeKey(move.id)('tr')()}>
						{['id', 'generation_id', 'type_id', 'category_id', 'power', 'accuracy', 'pp', 'effect']
							.map(attribute => (
								<td key={composeKey(move.id)(attribute)('td')()}>
									{move[attribute]}
								</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
		</>
	)
}
