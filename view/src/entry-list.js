import React from "react";
import Entry from "./entry";

export default function entryList ({ entries }) {
	return (
		entries.map(entry => {
			return <Entry entry={entry} />
		})
	)
};
