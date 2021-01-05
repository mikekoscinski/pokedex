import React, { useEffect, useState } from "react";

export default function Entry () {
	
	// TODO: store entryName from URL params

	// TODO: Need to retrieve data using multiple queries for the entry page
	
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

	console.log(entry);

	return (
		<div className="pokedex-entry">
			{entry.map(entry => (
				<div key={`pokedex-entry-${entry.pokedex_id}`}>
					<h1>{`No. ${entry.pokedex_id} - ${entry.name}`}</h1>
					<div className="bio">
						<h2>Bio</h2>
						<p>Region: {entry.region_id}</p>
						<p>Primary type: {entry.primary_type_id}</p>
						<p>Secondary type: {entry.secondary_type_id}</p>
						<p>Bulbasaur is a leaf boi.</p>
					</div>
					<div className="stats">
						<h2>Stats</h2>
						<div className="stat-values">
							<p>Attack: {entry.attack}</p>
							<p>Defense: {entry.defense}</p>
							<p>Special Attack: {entry.special_attack}</p>
							<p>Special Defense: {entry.special_defense}</p>
							<p>Speed: {entry.speed}</p>
							<p>---</p>
							<p>Average Stat: {entry.average_stat}</p>
							<p>Total Stats: {entry.total_stats}</p>
							
						</div>
					</div>
					
				
				
				</div>
			))}
		</div>
	)
}
