import React, { useEffect, useState, useMemo } from "react";

// Utility:
const composeKey = require('./composekey.js').default;
const useSortableData = require('./usesortabledata.js').default;

export default function PokemonTable (props) {
	const { data: pokemon, requestSort, sortConfig } = useSortableData(props.pokemon);
	
	const tableProperties = [
		{ displayValue: 'Name', lookupValue: 'name' },
		{ displayValue: 'Pokedex No.', lookupValue: 'pokedex_id' },
		{ displayValue: 'Region', lookupValue: 'region_id' },
		{ displayValue: 'Primary Type', lookupValue: 'primary_type_id' },
		{ displayValue: 'Secondary Type', lookupValue: 'secondary_type_id' },
		{ displayValue: 'HP', lookupValue: 'hp' },
		{ displayValue: 'Attack', lookupValue: 'attack' },
		{ displayValue: 'Defense', lookupValue: 'defense' },
		{ displayValue: 'Special Attack', lookupValue: 'special_attack' },
		{ displayValue: 'Special Defense', lookupValue: 'special_defense' },
		{ displayValue: 'Speed', lookupValue: 'speed' },
		{ displayValue: 'Total', lookupValue: 'total_stats' },
		{ displayValue: 'Average', lookupValue: 'average_stat' }
	];
	
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
