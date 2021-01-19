import React from "react";

// Utility:
const composeKey = require('./composekey.js').default;
const useSortableData = require('./usesortabledata.js').default;

export default function MovesTable (props) {
	const { data: moves, requestSort, sortConfig } = useSortableData(props.moves);
	
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
	
	const getClassNamesFor = (name) => {
		if (!sortConfig) return;
		return sortConfig.key === name ? sortConfig.direction : undefined;
	};
	
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
								onClick={() => requestSort(tableProperty.lookupValue)}
								className={getClassNamesFor(tableProperty.lookupValue)}
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
