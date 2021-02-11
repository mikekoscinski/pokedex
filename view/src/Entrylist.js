import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EntryList () {
	const [entries, setEntries] = useState([]);
	
	const getEntries = async () => {
		try {
			// TODO: To improve security, retrieve accessToken for Authorization header from httpOnly cookie instead of localStorage
			fetch('http://localhost:5000/pokemon', {
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
			.then(json => setEntries(json))
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
				{entries ? entries.map(entry => (
					<tr key={`${entry.pokedex_id}-${entry.name}`} name={entry.name} pokedex_id={entry.pokedex_id}>
						<td>{entry.pokedex_id}</td>
						<td><Link to={`/pokemon/${entry.pokedex_id}`}>{entry.name}</Link></td>
					</tr>
				)) 
				: 
				<tr>
					<td>Error</td>
				</tr>
				}
			</tbody>
		</table>
	)
};
