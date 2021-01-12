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

	return (
		<div className="pokedex-entry" key={'pokedex-entries'}>
			{entry.map(entry => (
				<div key={`pokedex-entry-${entry.name.replace(/\s/g, '-').toLowerCase()}`}>
					<h1 className="entry-name" key={'entry-name'}>{entry.name}</h1>
					<h3 className="entry-number" key={'entry-number'}>{`No. ${entry.pokedex_id}`}</h3>
					<div className="bio-section" key={'bio'}>
						<h2 key={'h2'}>Bio</h2>
						<div className="bio-values" key={'values'}>
							<div className="bio-entry" key={'region'}><p>Region: <span className="bio-value">{entry.region_id}</span></p></div>
							<div className="bio-entry" key={'types'}><p><span className="bio-value type">{entry.primary_type_id} <span className="bio-value type">{entry.secondary_type_id}</span></span></p></div>
							{/* TODO: Once bios are in DB. May need different div structure for bio; should span entire page, vs table-like underlined flexbox appearance  */}
							<div className="biography" key={'biography'}><p>TODO: INSERT BIO HERE.</p></div>
						</div>
					</div>
					<div className="stats-section" key={'stats'}>
						<h2 key={'h2'}>Stats</h2>
						<div className="stat-values" key={'stat-values'}>
							<div className="stat-entry" key={'attack'}><p>Attack: <span className="stat-value">{entry.attack}</span></p></div>
							<div className="stat-entry" key={'defense'}><p>Defense: <span className="stat-value">{entry.defense}</span></p></div>
							<div className="stat-entry" key={'special-attack'}><p>Special Attack: <span className="stat-value">{entry.special_attack}</span></p></div>
							<div className="stat-entry" key={'special-defense'}><p>Special Defense: <span className="stat-value">{entry.special_defense}</span></p></div>
							<div className="stat-entry" key={'speed'}><p>Speed: <span className="stat-value">{entry.speed}</span></p></div>
							<div className="stat-entry" key={'average'}><p>Average Stat: <span className="stat-value">{entry.average_stat}</span></p></div>
							<div className="stat-entry" key={'total'}><p>Total Stats: <span className="stat-value">{entry.total_stats}</span></p></div>
						</div>
					</div>
					<div className="moves-section" key={"moves"}>
						<h2 key={'h2'}>Moves</h2>
						{Array.from(new Set(entryMoves.map(move => move.method_obtained_id))).map(methodObtained => (
							<div key={`${methodObtained.replace(/\s/g, '-').toLowerCase()}-moves`}>
								<h3 key={'h3'}>{methodObtained}</h3>
								<table key={'table'}>
									<thead key={'table-heading'}>
										<tr key={'table-heading-row'}>
											<th key={'move'}>Move</th>
											{/* https://reactjs.org/docs/conditional-rendering.html */}
											{(methodObtained === 'Level up') ? <th key={'level-obtained'}>Level Obtained</th> : null}
											<th key={'type'}>Type</th>
											<th key={'category'}>Category</th>
											<th key={'power'}>Power</th>
											<th key={'accuracy'}>Accuracy</th>
											<th key={'pp'}>PP</th>
											<th key={'effect'}>Effect</th>
										</tr>
									</thead>
									<tbody key={'table-body'}>
										{entryMoves.filter(move => move.method_obtained_id === methodObtained).map(move => (
											<tr 
												key={`${move.move_id.replace(/\s/g, '-').toLowerCase()}-${move.level_obtained_id ? `level-${move.level_obtained_id}` : move.method_obtained_id.replace(/\s/g, '-').toLowerCase()}-entry`}
											>
												<td key={`move-id`}>{move.move_id}</td>
												{/* IF level up, create level_obtained <td>. Ternary is React's only in-line IF statement option */}
												{(methodObtained === 'Level up') ?
													<td key={`level-obtained`}>{move.level_obtained_id}</td> 
													: null
												}
												{entryMovesInfo.filter(moveInfo => moveInfo.id === move.move_id).map(moveInfo => (
													<>
													<td key={`type`}>{moveInfo.type_id}</td>
													<td key={`category`}>{moveInfo.category_id}</td>
													<td key={`power`}>{moveInfo.power}</td>
													<td key={`accuracy`}>{moveInfo.accuracy}</td>
													<td key={`pp`}>{moveInfo.pp}</td>
													<td key={`effect`}>{moveInfo.effect}</td>
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
