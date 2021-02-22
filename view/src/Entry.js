import React, { useEffect, useState } from 'react';

const composeKey = require('./composekey.js').default;

// Should I interpolate pokedex_id as a URL variable, or just window.location.pathname? The latter works fine right now. The former introduces React missing dependency errors. (See: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook). CONCLUSION: Will use window.location for now

export default function Entry ({ match }) {
	// const { pokedex_id } = match.params;
	const [entry, setEntry] = useState([]);
	const [entryMoves, setEntryMoves] = useState([]);
	const [entryMovesInfo, setEntryMovesInfo] = useState([]);
	// NOTE: We're making 3 separate fetch requests here. If only one returns !res.ok, we will redirect to '/', regardless of whether or not the other two requests succeed. Is this an unwanted side-effect?

	const getEntry = async () => {
		try {
			fetch(`http://localhost:5000${window.location.pathname}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
				}
			})
			.then(res => {
				if (!res.ok) return window.location.replace('/')
				return res.json()
			})
			.then(json => setEntry(json))
		} catch (error) {
			console.error(error.message);
		}
	};

	const getEntryMoves = async () => {
		try {
			fetch(`http://localhost:5000${window.location.pathname}/moves`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
				}
			})
			.then(res => {
				if (!res.ok) return window.location.replace('/')
				return res.json()
			})
			.then(json => setEntryMoves(json))
		} catch (error) {
			console.error(error.message);
		}
	};

	const getEntryMovesInfo = async () => {
		try {
			fetch(`http://localhost:5000/moves`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
				}
			})
			.then(res => {
				if (!res.ok) return window.location.replace('/')
				return res.json()
			})
			.then(json => setEntryMovesInfo(json))
		} catch (error) {
			console.error(error.message);
		}
	}

	// Separate hooks by concern. https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
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
		<div className="pokedex-entry" key={composeKey('pokedex')('entries')()}>
			{entry.map(entry => (
				<div key={composeKey(entry.name)('pokedex')('entry')()}>
					<h1 className="entry-name" key={composeKey(entry.name)('entry')('name')()}>{entry.name}</h1>
					<h3 className="entry-number" key={composeKey(entry.name)('entry')('number')()}>{`No. ${entry.pokedex_id}`}</h3>
					<div className="bio-section" key={composeKey(entry.name)('bio')('section')()}>
						<h2 key={composeKey(entry.name)('bio')('h2')()}>Bio</h2>
						<div className="bio-values" key={composeKey(entry.name)('bio')('entries')()}>
							<div className="bio-entry" key={composeKey(entry.name)('region')('div')()}>
								<p key={composeKey(entry.name)('region')('p')()}>
									Region:
									<span className="bio-value" key={composeKey(entry.name)('region')('span')()}> {entry.region_id}</span>
								</p>
							</div>
							<div className="bio-entry" key={composeKey(entry.name)('types')()}>
								<p key={composeKey(entry.name)('types')('p')()}>
									{	[
											{ value: entry.primary_type_id, lookupValue: 'primary-type' },
											{ value: entry.secondary_type_id, lookupValue: 'secondary-type' }
										]
											.map(type => (
												<span key={composeKey(entry.name)(type.lookupValue)()}>{type.value} </span>
									))}
								</p>
							</div>
							{/* <div className="biography" key={composeKey(entry.name)('biography')()}>
								<p key={composeKey(entry.name)('biography')('p')()}>TODO: INSERT BIO HERE.</p>
							</div> */}
						</div>
					</div>
					<div className="stats-section" key={composeKey(entry.name)('stats')('section')()}>
						<h2 key={composeKey(entry.name)('stats')('h2')()}>Stats</h2>
						<table className='statsTable' key={composeKey(entry.name)('stats')('table')()}>
							<tbody key={composeKey(entry.name)('stats')('tbody')()}>
								{	[
										{ name: 'Attack', lookupValue: 'attack'},
										{ name: 'Defense', lookupValue: 'defense'},
										{ name: 'Special Attack', lookupValue: 'special_attack'},
										{ name: 'Special Defense', lookupValue: 'special_defense'},
										{ name: 'Speed', lookupValue: 'speed'},
										{ name: 'Total', lookupValue: 'total_stats', bold: true},
										{ name: 'Average', lookupValue: 'average_stat', italic: true }
									]
										.map(stat => (
											<tr key={composeKey(entry.name)(stat.name)('tr')()}>
												<td key={composeKey(entry.name)(stat.name)('tr')('td')('label')()}>
													{stat.bold ? 
														<strong key={composeKey(entry.name)(stat.name)('tr')('strong')('label')()}>{stat.name}</strong> 
															: stat.italic ? 
																<i key={composeKey(entry.name)(stat.name)('tr')('i')('label')()}>{stat.name}</i>
																: stat.name
													}
												</td>
												<td key={composeKey(entry.name)(stat.name)('tr')('td')('value')()}>
													{stat.bold ? 
														<strong key={composeKey(entry.name)(stat.name)('tr')('strong')('value')()}>{entry[stat.lookupValue]}</strong>
															: stat.italic? 
																<i key={composeKey(entry.name)(stat.name)('tr')('i')('value')()}>{entry[stat.lookupValue]}</i>
																: entry[stat.lookupValue]
													}
												</td>
											</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="moves-section" key={composeKey(entry.name)('moves')('section')()}>
						<h2 key={composeKey(entry.name)('moves')('section')('h2')()}>Moves</h2>
						{Array.from(new Set(entryMoves.map(move => move.method_obtained_id))).map(methodObtained => (
							<div key={composeKey(entry.name)(methodObtained)('moves')()}>
								<h3 key={composeKey(entry.name)(methodObtained)('moves')('h3')()}>{methodObtained}</h3>
								<table key={composeKey(entry.name)(methodObtained)('moves')('table')()}>
									<thead key={composeKey(entry.name)(methodObtained)('moves')('thead')()}>
										<tr key={composeKey(entry.name)(methodObtained)('moves')('thead')('tr')()}>
											{	[
													'Move', 'Level Obtained', 'Type', 'Category', 'Power', 'Accuracy', 'PP', 'Effect'
												]
													.map(heading => (
														(heading !== 'Level Obtained') || (methodObtained === 'Level up') ?
															<th key={composeKey(entry.name)(methodObtained)('moves')('th')(heading)()}>{heading}</th>
															: null
											))}
										</tr>
									</thead>
									<tbody key={composeKey(entry.name)(methodObtained)('moves')('tbody')()}>
										{entryMoves.filter(move => move.method_obtained_id === methodObtained)
											.map(move => (
												<tr key={composeKey(entry.name)(move.move_id)(move.level_obtained_id || methodObtained)('tr')()}>
													<td key={composeKey(entry.name)(move.move_id)(move.level_obtained_id || methodObtained)('move-id')()}>{move.move_id}</td>
													{(methodObtained === 'Level up') ?
														<td key={composeKey(entry.name)(move.move_id)(move.level_obtained_id || methodObtained)('level-obtained')()}>{move.level_obtained_id}</td> 
														: null
													}
													{entryMovesInfo.filter(moveInfo => moveInfo.id === move.move_id).map(moveInfo => (
														[
															{value: 'type', lookupValue: 'type_id'},
															{value: 'category', lookupValue: 'category_id'},
															{value: 'power', lookupValue: 'power'},
															{value: 'accuracy', lookupValue: 'accuracy'},
															{value: 'pp', lookupValue: 'pp'},
															{value: 'effect', lookupValue: 'effect'}
														]
															.map(moveAttribute => (
																<td key={composeKey(entry.name)(move.move_id)(move.level_obtained_id || methodObtained)('td')(moveAttribute.value)()}>
																	{moveInfo[moveAttribute.lookupValue]}
																</td>
															))))
													}
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
