import React from "react"; // TODO: add , { useState } once needed

export default function Signin () {
	
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log('TODO');
			
			// const data = { email, password }
			
			
		} catch (error) {
			console.error(error.message);
		}
	}
	
	return (
		<>
		<h1>Sign in</h1>
		<form className='signin' onSubmit={onFormSubmit}>
			<div>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" autoComplete="on" required />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" autoComplete="on" required />
			</div>
			<button type="submit">
				Sign in
			</button>
		</form>
		<a href="/signup">Sign up</a>
		</>
	)
}
