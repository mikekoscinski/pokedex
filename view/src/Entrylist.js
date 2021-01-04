import React, { useEffect, useState } from "react";

export default function Entrylist (rows) {
	
	const [entries, setEntries] = useState([]);
	
	const getEntries = async () => {
		try {
			const response = await fetch('http://localhost:5000/pokemon');
			const jsonData = await response.json();
			setEntries(jsonData);
			
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getEntries();
	}, []);
	
	return (
		<table className="entry-list">
			<thead>
				<tr>
					<th>No.</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{entries.map(entry => (
					<tr key={entry.name}>
						<td>{entry.pokedex_id}</td>
						<td>{entry.name}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
};
