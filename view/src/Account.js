import React, { useState } from "react";

// TODO: Handle POST (or PUT?) requests for form submits. Ideally, have one function that handles everything

export default function Account () {
	const [currentEmail, setCurrentEmail] = useState('')
	const [newEmail, setNewEmail] = useState('')
	
	const [currentUsername, setCurrentUsername] = useState('')
	const [newUsername, setNewUsername] = useState('')
	
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	// TODO: Will need to add server-side password validation when formSubmit is of type password
	
	// TODO: Eventually need to check if token is valid:
	if (!localStorage.getItem('accessToken')) return window.location.replace('/')
	
	const onFormSubmit = async (event) => {
		event.preventDefault()
		const dataType = event.currentTarget.querySelector('button').getAttribute('data-type')
		const formSubmitData = () => {
			if (!dataType) return null
			if (dataType === 'email') return { currentEmail, newEmail }
			if (dataType === 'username') return { currentUsername, newUsername }
			if (dataType === 'password') return { currentPassword, newPassword }
		}
		try {
			const data = formSubmitData()
			console.log(data)
			fetch('http://localhost:5000/account', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
				},
				body: JSON.stringify(data)
			})
			.then(res => {
				if (res.status === 403) {
					// 403 returned by authenticateToken == expired token
					localStorage.removeItem('accessToken')
					return window.location.replace('/')
				}
			})
			
		} catch (error) {
			console.error(error.message)
		}
	}
	
	return (
		<>
		<h1>Account</h1>
		<br></br>
		<div className="update-email">
			<h3>Update Email</h3>
			<form className='update-email-form' onSubmit={onFormSubmit}>
				<div>
					<label>Current Email</label>
					<input
						type="email"
						id="current-email"
						name="email"
						autoComplete="email"
						value={currentEmail}
						onChange={event => setCurrentEmail(event.target.value)}
					/>
				</div>
				<div>
					<label>New Email</label>
					<input
						type="email"
						id="new-email"
						name="email"
						autoComplete="email"
						value={newEmail}
						onChange={event => setNewEmail(event.target.value)}
					/>
				</div>
				<button type="submit" data-type="email">Update Email</button>
			</form>
		</div>
		<br></br>
		<div className="update-username">
			<h3>Update Username</h3>
			<form className='update-username-form' onSubmit={onFormSubmit}>
				<div>
					<label>Current Username</label>
					<input
						type="text"
						id="current-username"
						name="username"
						autoComplete="off"
						value={currentUsername}
						onChange={event => setCurrentUsername(event.target.value)}
					/>
				</div>
				<div>
					<label>New Username</label>
					<input
						type="text"
						id="new-username"
						name="username"
						autoComplete="off"
						value={newUsername}
						onChange={event => setNewUsername(event.target.value)}
					/>
				</div>
				<button type="submit" data-type="username">Update Username</button>
			</form>
		</div>
		<br></br>
		<div className="update-password">
			<h3>Update Password</h3>
			<form className='update-password-form' onSubmit={onFormSubmit}>
				<div>
					<label>Current Password</label>
					<input
						type="password"
						id="current-password"
						name="password"
						autoComplete="password"
						value={currentPassword}
						onChange={event => setCurrentPassword(event.target.value)}
					/>
				</div>
				<div>
					<label>New Password</label>
					<input
						type="password"
						id="new-password"
						name="password"
						autoComplete="off"
						value={newPassword}
						onChange={event => setNewPassword(event.target.value)}
					/>
				</div>
				<button type="submit" data-type="password">Update Password</button>
			</form>
		</div>
		</>
	)
}
