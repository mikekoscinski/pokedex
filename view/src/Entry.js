import React, { useEffect, useState } from 'react';

// Should I use pokedex_id or just window.location.pathname? The latter works fine right now. The former introduces React missing dependency errors. (See: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook). CONCLUSION: Will use window.location for now

// TODO: Need to retrieve data using multiple queries for the entry page. What other data do I need?
export default function Entry ({ match }) {
	// const { pokedex_id } = match.params;
	const [entry, setEntry] = useState([]);

	// TODO: Need to create entryMoves, setEntryMoves in state
	const [entryMoves, setEntryMoves] = useState([]);

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

	useEffect(() => {
		getEntry();
	}, []);

	// TODO: IN DEVELOPMENT
	const getEntryMoves = async () => {
		try {
			const response = await fetch(`http://localhost:5000${window.location.pathname}/moves`);
			const jsonData = await response.json();
			setEntryMoves(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	};

	// TODO: IN DEVELOPMENT
	useEffect(() => {
		getEntryMoves();
	}, []);

	return (
		<div className="pokedex-entry">
			{entry.map(entry => (
				<div key={`pokedex-entry-${entry.name}-${entry.pokedex_id}`}>
					<h1>{`${entry.name}`}</h1>
					<h3>{`No. ${entry.pokedex_id}`}</h3>
					<div className="bio-section">
						<h2>Bio</h2>
						<div className="bio-values">
							<div className="bio-entry"><p>Region: <span className="bio-value">{entry.region_id}</span></p></div>
							<div className="bio-entry"><p><span className="bio-value type">{entry.primary_type_id} <span className="bio-value type">{entry.secondary_type_id}</span></span></p></div>
							{/* TODO: Once bios are in DB. May need different div structure for bio; should span entire page, vs table-like underlined flexbox appearance  */}
							<p>TODO: INSERT BIO HERE.</p>
						</div>
					</div>
					<div className="stats-section">
						<h2>Stats</h2>
						<div className="stat-values">
							<div className="stat-entry"><p>Attack: <span className="stat-value">{entry.attack}</span></p></div>
							<div className="stat-entry"><p>Defense: <span className="stat-value">{entry.defense}</span></p></div>
							<div className="stat-entry"><p>Special Attack: <span className="stat-value">{entry.special_attack}</span></p></div>
							<div className="stat-entry"><p>Special Defense: <span className="stat-value">{entry.special_defense}</span></p></div>
							<div className="stat-entry"><p>Speed: <span className="stat-value">{entry.speed}</span></p></div>
							<p>---</p>
							<div className="stat-entry"><p>Average Stat: <span className="stat-value">{entry.average_stat}</span></p></div>
							<div className="stat-entry"><p>Total Stats: <span className="stat-value">{entry.total_stats}</span></p></div>
						</div>
					</div>
			{/* TODO: NEED TO MAP OVER EACH MOVE IN ENTRYMOVES */}
					<div className="moves-section">
						<h2>Moves</h2>
						<h3>Level Up Moves</h3>
						<h3>Egg Moves</h3>
						<h3>Egg Move Tutor</h3>
						<h3>Pre-Evolution Moves</h3>
						<h3>HM Moves</h3>
						<h3>TM Moves</h3>
					</div>
				</div>
			))}
		</div>
	)
}
