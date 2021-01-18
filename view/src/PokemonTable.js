import React, { useEffect, useState, useMemo } from "react";
const composeKey = require('./composekey.js').default;

export default function PokemonTable () {
	const [pokemon, setPokemon] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	
	const tableProperties = [
		{ displayValue: 'Name', lookupValue: 'name' },
		{ displayValue: 'Pokedex No.', lookupValue: 'pokedex_id' },
		{ displayValue: 'Region', lookupValue: 'region_id' },
		{ displayValue: 'Primary Type', lookupValue: 'primary_type_id' },
		{ displayValue: 'Secondary Type', lookupValue: 'secondary_type_id' },
		{ displayValue: 'Attack', lookupValue: 'attack' },
		{ displayValue: 'Defense', lookupValue: 'defense' },
		{ displayValue: 'Special Attack', lookupValue: 'special_attack' },
		{ displayValue: 'Special Defense', lookupValue: 'special_defense' },
		{ displayValue: 'Speed', lookupValue: 'speed' },
		{ displayValue: 'Total', lookupValue: 'total_stats' },
		{ displayValue: 'Average', lookupValue: 'average_stat' }
	];

	const getPokemon = async () => {
		try {
			const response = await fetch('http://localhost:5000/search/pokemon');
			const jsonData = await response.json();
			setPokemon(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	}

	useEffect(() => {
		getPokemon();
	}, []);
	
	
	
	useMemo(() => {
		let sortedPokemon = [...pokemon];
		
		if (sortConfig) {
			sortedPokemon.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ASC' ? -1 : 1;
				if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'DESC' ? 1 : -1;
				return 0;
			});
		}
		return sortedPokemon;
	}, [pokemon, sortConfig]);
	
	const requestSort = (key) => {
		let direction = 'ASC';
		if (sortConfig.key === key && sortConfig.direction === 'ASC') {
			direction = 'DESC';
		}
		setSortConfig({ key, direction });
	}
	
	
	
	return (
		<>
		<h2>Pokemon Table</h2>
			<table>
				<thead>
					<tr>
						{tableProperties
							.map(tableProperty => (
								<th 
									key={composeKey(tableProperty.displayValue)('th')()} 
									onClick={() => requestSort(tableProperty.lookupValue)}
								>
									{tableProperty.displayValue}
								</th>
						))}
					</tr>
				</thead>
				<tbody>
					{pokemon.map(pokemon => (
						<tr key={composeKey(pokemon.name)('tr')()}>
							{tableProperties
								.map(tableProperty => (
									<td key={composeKey(pokemon.name)(tableProperty.displayValue)('td')()}>
										{pokemon[tableProperty.lookupValue]}
									</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
