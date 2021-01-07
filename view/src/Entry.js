import React, { useEffect, useState } from 'react';

// TODO: Should I use pokedex_id or just window.location.pathname? The latter works fine right now. The former introduces React missing dependency errors. (See: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook). CONCLUSION: Will use window.location for now

export default function Entry ({ match }) {
	// TODO: Need to retrieve data using multiple queries for the entry page. What other data do I need?

	const { pokedex_id } = match.params;
	const [entry, setEntry] = useState([]);
	
	// TODO: When I made the fetch request using window.location.pathname, useEffect had no missing dependencies - because window.location.pathname was a globally available value.

	const getEntry = async () => {
		try {
			// const response = await fetch(`http://localhost:5000/pokemon/${pokedex_id}`);
			const response = await fetch(`http://localhost:5000${window.location.pathname}`);
			const jsonData = await response.json();
			setEntry(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getEntry();
	}, []);

	return (
		<div className="pokedex-entry">
			{entry.map(entry => (
				<div key={`pokedex-entry-${entry.name}-${entry.pokedex_id}`}>
					<h1>{`No. ${entry.pokedex_id} - ${entry.name}`}</h1>
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
				</div>
			))}
		</div>
	)
}
