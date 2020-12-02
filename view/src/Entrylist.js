import React, { useState } from "react";

function Entry (row) {
	return (
		// {row.id}
		// {row.name}
		<p>Pikachu</p>
	)
};

export default function Entrylist (rows) {
	
	const [entries, setEntries] = useState(['test']);
	
	// setEntries(rows);
	
	return (
		entries.map(entry => {
			return <Entry entry={entry} />
		})
	)
};
