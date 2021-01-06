import React, { useEffect, useState } from "react";

export default function Entry () {
	
	// TODO: store entryName from URL params

	// TODO: Need to retrieve data using multiple queries for the entry page
	
	// TODO: What other data do I need?



	const [entry, setEntry] = useState([]);

	const getEntry = async () => {
		try {
			const response = await fetch('http://localhost:5000/pokemon/Bulbasaur');
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
				<div key={`pokedex-entry-${entry.pokedex_id}`}>
					<h1>{`No. ${entry.pokedex_id} - ${entry.name}`}</h1>
					<div className="bio-section">
						<h2>Bio</h2>
						<div className="bio-values">
							<div className="bio-entry"><p>Region: <span className="bio-value">{entry.region_id}</span></p></div>
							<div className="bio-entry"><p>Primary type: <span className="bio-value">{entry.primary_type_id}</span></p></div>
							<div className="bio-entry"><p>Secondary type: <span className="bio-value">{entry.secondary_type_id}</span></p></div>
							{/* TODO: Once bios are in DB, match bio entry to above format. May need different div structure, as it should span entire page, vs table-like underlined flexbox appearance  */}
							<p>Bulbasaur is a leaf boi.</p>
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
