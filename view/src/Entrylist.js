import React from "react";
import Entry from "./Entry";

export default function Entrylist ({ entries }) {
	return (
		entries.map(entry => {
			return <Entry entry={entry} />
		})
	)
};
