import React, { useEffect, useState } from "react";

export default function Signup () {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	// const isValidPassword = (string) => {
		// TODO: Regex validation to check password
	// }
	
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			let data = { username, email, password };
			
			fetch('http://localhost:5000/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => {
					if (!data.error) {
						alert('Account successfully created.')
						return window.location.replace('/')
						// AJAX prevents server-side call of res.redirect. Source: https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
					}
					return alert(data.error)
			})
		} catch (error) {
			console.error(error.message);
		}
	};
	
	// TODO: Enforce password rules for form input
	
	return (
		<>
		<h1>Sign up</h1>
		{/* <form action="/signup" method="POST"> TODO: This was causing the POST error */}
		<form className='signup' onSubmit={onFormSubmit} >
			<div>
				<label for="username">
					Username
				</label>
				<input 
					type="text" 
					id="username" 
					name="username" 
					autoComplete="off" 
					value={username} 
					onChange={event => setUsername(event.target.value)} 
					required 
				/>
			</div>
			<div>
				<label for="email">
					Email
				</label>
				<input 
					type="email" 
					id="email" 
					name="email" 
					autoComplete="email" 
					value={email} 
					onChange={event => setEmail(event.target.value)}
					required 
				/>
			</div>
			<div>
				<label for="password">
					Password
				</label>
				<input 
					type="password" 
					id="password" 
					name="password" 
					autoComplete="off" 
					value={password} 
					onChange={event => setPassword(event.target.value)}
					required 
				/>
			</div>
			<div>
				<i>
					Password must be 12-100 characters and use at least one uppercase letter, one number, and one symbol.
				</i>
			</div>
			<button type="submit">
				Sign up
			</button>
		</form>
		<a href="/signin">Sign in</a>
		</>
	)
}
