import React, { useEffect, useState } from "react";

// Modules:
const composeKey = require('./composekey.js').default;

export default function MovesTable () {
	const [moves, setMoves] = useState([]);
	
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
	
	return (
		<>
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
