import React, { useEffect, useState } from "react";

// Modules:
const composeKey = require('./composekey.js').default;

export default function MovesTable (props) {
	const { moves } = props;
	
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
								onClick={() => console.log(tableProperty.lookupValue)}
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
