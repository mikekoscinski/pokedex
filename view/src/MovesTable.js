import React, { useEffect, useState } from "react";

// Modules:
const composeKey = require('./composekey.js').default;

export default function MovesTable () {
	const [moves, setMoves] = useState([]);
	const [sortedField, setSortedField] = useState(null);
	
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
		getMoves();
	}, []);
	
	let sortedMoves = [...moves];
	if (sortedField !== null) {
		sortedMoves.sort((a, b) => {
			
		})
	}
	
	const tableProperties = [
		{ displayValue: 'Move', lookupValue: 'id' },
		{ displayValue: 'Generation', lookupValue: 'generation_id' },
		{ displayValue: 'Type', lookupValue: 'type_id' },
		{ displayValue: 'Category', lookupValue: 'category_id' },
		{ displayValue: 'Power', lookupValue: 'power' },
		{ displayValue: 'Accuracy', lookupValue: 'accuracy' },
		{ displayValue: 'PP', lookupValue: 'pp' },
		{ displayValue: 'Effect', lookupValue: 'effect' },
	];
	
	return (
		<>
		<h2>Moves Table</h2>
		<table>
			<thead>
				<tr>
					{tableProperties
						.map(tableProperty => (
							<th 
								key={composeKey(tableProperty.displayValue)('td')()}
								onClick={() => setSortedField(tableProperty.lookupValue)}
							>
								{tableProperty.displayValue}
							</th>
					))}
				</tr>
			</thead>
			<tbody>
				{moves.map(move => (
					<tr key={composeKey(move.id)('tr')()}>
						{tableProperties
							.map(tableProperty => (
								<td key={composeKey(move.id)(tableProperty.displayValue)('td')()}>
									{move[tableProperty.lookupValue]}
								</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
		</>
	)
}
