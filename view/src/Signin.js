import React, { useState } from "react"; // TODO: add , { useState } once needed

export default function Signin () {	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	// If VALID accessToken, redirect
	if (localStorage.getItem('accessToken')) return window.location.replace('/pokemon')
	
	
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = { email, password }
			console.log(data)
			
			fetch('http://localhost:5000/signin', {
				method: 'POST',
				headers: { 
					'Content-Type': 'application/json' 
				},
				withCredentials: true,
				credentials: 'same-origin',
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(json => {
					console.log(json)
					localStorage.setItem('accessToken', json.accessToken)
					// localStorage.setItem('refreshToken', json.refreshToken)
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
