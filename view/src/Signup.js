import React, { useState, useEffect } from "react";

const checkClientAccessToken = require('./checkclientaccesstoken.js').default

export default function Signup () {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	useEffect(() => {
		checkClientAccessToken(localStorage.getItem('accessToken'))('/signup')
	})
	
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = { username, email, password };
			fetch('http://localhost:5000/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('accessToken', json.accessToken)
				return window.location.replace('/pokemon')
			})
		} catch (error) {
			console.error(error.message);
		}
	};
	
	return (
		<>
		<h1>Sign up</h1>
		<form className='signup' onSubmit={onFormSubmit} >
			<div>
				<label htmlFor="username">
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
				<label htmlFor="email">
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
				<label htmlFor="password">
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
					Password must be 12-100 characters and contain at least one uppercase letter, one number, and one symbol.
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
