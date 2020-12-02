import React from "react";

function Entry ({ entries }) {
	return (
		<div>
			Bulbasaur
		</div>
	)
};

export default function Entrylist ({ entries }) {
	return (
		entries.map(entry => {
			return <Entry entry={entry} />
		})
	)
};
