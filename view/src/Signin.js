import React, { useState, useEffect } from "react";

const checkClientAccessToken = require('./checkclientaccesstoken.js').default

export default function Signin () {	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	useEffect(() => {
		checkClientAccessToken(localStorage.getItem('accessToken'))('/signin')
	})
	
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = { email, password }
			fetch('http://localhost:5000/signin', {
				method: 'POST',
				headers: { 
					'Content-Type': 'application/json' 
				},
				withCredentials: true,
				credentials: 'same-origin',
				body: JSON.stringify(data)
			})
			.then(res => res.json()) // remember: this is an implicit return
			.then(json => {
				localStorage.setItem('accessToken', json.accessToken)
				window.location.replace('/pokemon')
			})
		} catch (error) {
			console.error(error.message);
		}
	}
	
	return (
		<>
		<h1>Sign in</h1>
		<form className='signin' onSubmit={onFormSubmit}>
			<div>
				<label htmlFor="email">
					Email
				</label>
				<input 
					type="email" 
					id="email" 
					name="email" 
					autoComplete="on" 
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
					autoComplete="on" 
					value={password}
					onChange={event => setPassword(event.target.value)}
					required 
				/>
			</div>
			<button type="submit">
				Sign in
			</button>
		</form>
		<a href="/signup">Sign up</a>
		</>
	)
}
