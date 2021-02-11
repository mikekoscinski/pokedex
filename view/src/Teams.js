import React, { useState, useEffect } from "react";
// TODO: Add once needed -- import React, { useEffect, useState } from "react";



export default function Teams () {
	
	const [teams, setTeams] = useState([])
	
	const getTeams = async () => {
		try {
			fetch(`http://localhost:5000${window.location.pathname}`, {
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
			.then(json => setTeams(json)) // setTeams(json)
		} catch (error) {
			console.error(error.message)
		}
	}
	
	useEffect(() => {
		getTeams()
	}, [])
	
	return (
		<>
		<h1 key={'teams-h1'}>Teams</h1>
		<div key={'teams-div'}>
		{teams.map(team => (
			// NOTE: Need to provide keys to Fragments inside a map. Can only do this with original Fragment syntax; can't pass keys to Short Syntax. Source: [React Fragments](https://reactjs.org/docs/fragments.html)
			<React.Fragment key={`team-${teams.indexOf() + 1}`}>
				<p key={`team-${teams.indexOf(team) + 1}-pokemon-1`}>
					{team.pokemon1}
				</p>
				<p key={`team-${teams.indexOf(team) + 1}-pokemon-2`}>
					{team.pokemon2}
				</p>
				<p key={`team-${teams.indexOf(team) + 1}-pokemon-3`}>
					{team.pokemon3}
				</p>
			</React.Fragment>
		))}
		</div>
		</>
	)
}
