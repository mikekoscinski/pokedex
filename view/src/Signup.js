import React, { useEffect, useState } from "react";

export default function Signup () {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = { username: username, email: email, password: password };
			// console.log(data);
			
			const response = await fetch('http://localhost:5000/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});
			console.log(response);
			
			
		} catch (error) {
			console.error(error.message);
		}
	};
	
	
	
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
			<button 
				type="submit" 
			>
				Sign up
			</button>
		</form>
		<a href="/signin">Sign in</a>
		</>
	)
}
