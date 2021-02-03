import React, { useEffect, useState } from "react";

export default function Signin () {
	
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log('TODO');
		} catch (error) {
			console.error(error.message);
		}
	}
	
	return (
		<>
		<h1>Sign in</h1>
		{/* <form action="/signin" method="POST"> */}
		<form className='signin' onSubmit={onFormSubmit}>
			<div>
				<label htmlFor="name">Username</label>
				<input type="text" id="username" name="username" autocomplete="on" required />
			</div>
			<div>
				<label htmlFor="name">Password</label>
				<input type="text" id="password" name="password" autocomplete="on" required />
			</div>
			<button type="submit">
				Sign in
			</button>
		</form>
		<a href="/signup">Sign up</a>
		</>
	)
}
