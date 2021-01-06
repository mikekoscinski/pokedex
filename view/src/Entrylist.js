import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EntryList () {
	
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
					<tr key={`${entry.pokedex_id}-${entry.name}`} onClick={() => console.log(entry.name)}>
						<td>{entry.pokedex_id}</td>
						<td><Link to={`/pokemon/${entry.pokedex_id}`}>{entry.name}</Link></td>
					</tr>
				))}
			</tbody>
		</table>
	)
};
