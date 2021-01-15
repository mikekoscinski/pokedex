import React, { useEffect, useState } from "react";
const composeKey = require('./composekey.js').default;

export default function PokemonTable () {
	const [pokemon, setPokemon] = useState([]);
	
	const [sortedField, setSortedField] = useState(null);
	
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
	
	return (
		<>
		<h2>Pokemon Table</h2>
				<table>
					<thead>
						<tr>
							{['Name', 'Region', 'Primary Type', 'Secondary Type', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed', 'Total', 'Average']
								.map(caption => (
									<th key={composeKey(caption)('th')()}>
										{caption}
									</th>
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
		</>
	)
}
