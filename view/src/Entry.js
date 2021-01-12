import React, { useEffect, useState } from 'react';

// Should I use pokedex_id or just window.location.pathname? The latter works fine right now. The former introduces React missing dependency errors. (See: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook). CONCLUSION: Will use window.location for now

// TODO: Need to retrieve data using multiple queries for the entry page. What other data do I need?
export default function Entry ({ match }) {
	// const { pokedex_id } = match.params;
	const [entry, setEntry] = useState([]);

	// TODO: Need to create entryMoves, setEntryMoves in state
	const [entryMoves, setEntryMoves] = useState([]);

	// TODO: 
	const [entryMovesInfo, setEntryMovesInfo] = useState([]);

	const getEntry = async () => {
		try {
			// const response = await fetch(`http://localhost:5000/pokemon/${pokedex_id}`);
			const response = await fetch(`http://localhost:5000${window.location.pathname}`);
			// When I make the fetch request using window.location.pathname, useEffect has no missing dependencies - because window.location.pathname is globally available. However, using match.params.pokedex_id introduces missing React dependencies.
			const jsonData = await response.json();
			setEntry(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	};

	const getEntryMoves = async () => {
		try {
			const response = await fetch(`http://localhost:5000${window.location.pathname}/moves`);
			const jsonData = await response.json();
			setEntryMoves(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	};

	const getEntryMovesInfo = async () => {
		try {
			const response = await fetch('http://localhost:5000/moves');
			const jsonData = await response.json();
			setEntryMovesInfo(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	}

	// React recommends separating hooks by concern, hence separate useEffect calls. Source: https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
	useEffect(() => {
		getEntry();
	}, []);

	useEffect(() => {
		getEntryMoves();
	}, []);

	useEffect(() => {
		getEntryMovesInfo();
	}, []);

	const formatKeyText = (subkey) => {
		// Return formatted value for inclusion in React key values
		return `${subkey.replace(/\s/g, '-').replace(/\(/g, '').replace(/\)/g, '').toLowerCase()}`;
	};


// TODO: Change this to composeKey function; make it universal, let it accept any input (so, pass each input.property in the function call directly
	const formatMoveTDKey = (entry) => {
		return (move) => {
			return (methodObtained) => {
				return (datatype) => {
					return `${formatKeyText(entry.name)}-${formatKeyText(move.move_id)}-${move.level_obtained_id ? `level-${move.level_obtained_id}` : formatKeyText(methodObtained)}-moves-td-${datatype}`;
				}
			}
		}
	};

	// const formatSubkeyForMoveData = ({ name }, { move_id, level_obtained_id}, methodObtained) => {
	// 	return `${formatSubkey(entry.name)}-${formatSubkey(move.move_id)}-${move.level_obtained_id ? `level-${move.level_obtained_id}` : formatSubkey(methodObtained)}-moves-tr`;
	// }


	return (
		<div className="pokedex-entry" key={'pokedex-entries'}>
			{entry.map(entry => (
				<div key={`${formatKeyText(entry.name)}-pokedex-entry`}>
					<h1 className="entry-name" key={`${formatKeyText(entry.name)}-entry-name`}>
						{entry.name}
					</h1>
					<h3 className="entry-number" key={`${formatKeyText(entry.name)}-entry-number`}>
						{`No. ${entry.pokedex_id}`}
					</h3>

					<div className="bio-section" key={`${formatKeyText(entry.name)}-bio-section`}>
						<h2 key={`${formatKeyText(entry.name)}-bio-h2`}>
							Bio
						</h2>
						<div className="bio-values" key={`${formatKeyText(entry.name)}-bio-values`}>
							<div className="bio-entry" key={`${formatKeyText(entry.name)}-region`}>
								<p key={`${formatKeyText(entry.name)}-region-p`}>
									Region: <span className="bio-value" key={`${formatKeyText(entry.name)}-region-span`}>
										{entry.region_id}
									</span>
								</p>
							</div>
							<div className="bio-entry" key={`${formatKeyText(entry.name)}-types`}>
								<p key={`${formatKeyText(entry.name)}-types-p`}>
									<span className="bio-value type" key={`${formatKeyText(entry.name)}-primary-type`}>
										{entry.primary_type_id}
									</span> 
									<span className="bio-value type" key={`${formatKeyText(entry.name)}-secondary-type`}>
										{entry.secondary_type_id}
									</span>
								</p>
							</div>
							<div className="biography" key={`${formatKeyText(entry.name)}-biography`}>
								<p key={`${formatKeyText(entry.name)}-biography-p`}>TODO: INSERT BIO HERE.</p>
							</div>
						</div>
					</div>

					<div className="stats-section" key={`${formatKeyText(entry.name)}-stats-section`}>
						<h2 key={`${formatKeyText(entry.name)}-stats-h2`}>Stats</h2>
						<table className='statsTable' key={`${formatKeyText(entry.name)}-stats-table`}>
							<tbody key={`${formatKeyText(entry.name)}-stats-tbody`}>
								{
									[
										{ name: 'Attack', lookupValue: 'attack'}, 
										{ name: 'Defense', lookupValue: 'defense'}, 
										{ name: 'Special Attack', lookupValue: 'special_attack'}, 
										{ name: 'Special Defense', lookupValue: 'special_defense'}, 
										{ name: 'Speed', lookupValue: 'speed'}, 
										{ name: 'Total', lookupValue: 'total_stats', bold: true}, 
										{ name: 'Average', lookupValue: 'average_stat', bold: true},
									].map(stat => (
										<tr key={`${formatKeyText(entry.name)}-${formatKeyText(stat.name)}-row`}>
											<td key={`${formatKeyText(entry.name)}-${formatKeyText(stat.name)}-label`}>
												{stat.bold ? <strong>{stat.name}</strong> : stat.name}
											</td>
											<td key={`${formatKeyText(entry.name)}-${formatKeyText(stat.name)}-value`}>
												{stat.bold ? <strong>{entry[stat.lookupValue]}</strong> : entry[stat.lookupValue]}
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>

					<div className="moves-section" key={`${formatKeyText(entry.name)}-moves-section`}>
						<h2 key={`${formatKeyText(entry.name)}-moves-section-h2`}>Moves</h2>
						{Array.from(new Set(entryMoves.map(move => move.method_obtained_id))).map(methodObtained => (
							<div key={`${formatKeyText(entry.name)}-${formatKeyText(methodObtained)}-moves`}>
								<h3 key={`${formatKeyText(entry.name)}-${formatKeyText(methodObtained)}-moves-h3`}>{methodObtained}</h3>
								<table key={`${formatKeyText(entry.name)}-${formatKeyText(methodObtained)}-moves-table`}>
									<thead key={`${formatKeyText(entry.name)}-${formatKeyText(methodObtained)}-moves-thead`}>
										<tr key={`${formatKeyText(entry.name)}-${formatKeyText(methodObtained)}-moves-thead-tr`}>
											{
												['Move', 'Level Obtained', 'Type', 'Category', 'Power', 'Accuracy', 'PP', 'Effect']
													.map(heading => (
														heading !== 'Level Obtained' || methodObtained === 'Level up' ?
															<th key={`${formatKeyText(entry.name)}-${formatKeyText(methodObtained)}-moves-th-${formatKeyText(heading)}`}>
																{heading}
															</th>
															: null
													))
											}
										</tr>
									</thead>
									<tbody key={`${formatKeyText(entry.name)}-${formatKeyText(methodObtained)}-moves-tbody`}>
										{entryMoves.filter(move => move.method_obtained_id === methodObtained).map(move => (
											<tr 
												key={`${formatKeyText(entry.name)}-${formatKeyText(move.move_id)}-${move.level_obtained_id ? `level-${move.level_obtained_id}` : formatKeyText(methodObtained)}-moves-tr`}
											>
												<td key={formatMoveTDKey(entry)(move)(methodObtained)('move-id')}>
													{move.move_id}
												</td>
												{/* IF level up, create level_obtained <td>. Ternary is React's only in-line IF statement option */}
												{(methodObtained === 'Level up') ?
													<td key={formatMoveTDKey(entry)(move)(methodObtained)('level-obtained')}>
														{move.level_obtained_id}
													</td> 
													: null
												}
												{entryMovesInfo.filter(moveInfo => moveInfo.id === move.move_id).map(moveInfo => (
													<>
													<td key={formatMoveTDKey(entry)(move)(methodObtained)('type')}>
														{moveInfo.type_id}
													</td>
													<td key={formatMoveTDKey(entry)(move)(methodObtained)('category')}>
														{moveInfo.category_id}
													</td>
													<td key={formatMoveTDKey(entry)(move)(methodObtained)('power')}>
														{moveInfo.power}
													</td>
													<td key={formatMoveTDKey(entry)(move)(methodObtained)('accuracy')}>
														{moveInfo.accuracy}
													</td>
													<td key={formatMoveTDKey(entry)(move)(methodObtained)('pp')}>
														{moveInfo.pp}
													</td>
													<td key={formatMoveTDKey(entry)(move)(methodObtained)('effect')}>
														{moveInfo.effect}
													</td>
													</>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
