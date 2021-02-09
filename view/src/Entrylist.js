import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EntryList () {
	const [entries, setEntries] = useState([]);
	
	/*
	fetch('http://localhost:5000/auth', {
		method: 'POST',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }
	})
	.then(res => console.log(res))
	// .then(data => console.log(data))
	.catch(error => console.log(error))
	*/
	
	const getEntries = async () => {
		try {
			// TODO: Should my refreshToken be sent here as a Header?
			// E.g.: headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }
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
					<tr key={`${entry.pokedex_id}-${entry.name}`} name={entry.name} pokedex_id={entry.pokedex_id}>
						<td>{entry.pokedex_id}</td>
						<td><Link to={`/pokemon/${entry.pokedex_id}`}>{entry.name}</Link></td>
					</tr>
				))}
			</tbody>
		</table>
	)
};
