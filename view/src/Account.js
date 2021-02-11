import React, { useState } from "react";

const onFormSubmit = async (event) => {
	event.preventDefault()
	try {
		console.log('Testing... 1, 2, 3!')
	} catch (error) {
		console.error(error.message)
	}
}

export default function Account () {
	const [currentEmail, setCurrentEmail] = useState('')
	const [confirmCurrentEmail, setConfirmCurrentEmail] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [confirmNewEmail, setConfirmNewEmail] = useState('')
	
	const [currentUsername, setCurrentUsername] = useState('')
	const [confirmCurrentUsername, setConfirmCurrentUsername] = useState('')
	const [newUsername, setNewUsername] = useState('')
	const [confirmNewUsername, setConfirmNewUsername] = useState('')
	
	const [currentPassword, setCurrentPassword] = useState('')
	const [confirmCurrentPassword, setConfirmCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')
	// TODO: Will need to add server-side password validation when formSubmit is of type password
	
	
	return (
		<>
		<h1>Account</h1>
		<br></br>
		<p>Welcome to your account settings page. </p>
		<p>If you need to update any of your account's settings, you may do so below.</p>
		<br></br>
		<div className="update-email">
			<h3>Update Email</h3>
			<form className='update-email-form' onSubmit={onFormSubmit}>
				<div>
					<label>Current Email</label>
					<input
						type="email"
						id="email"
						name="email"
						autoComplete="email"
						value={currentEmail}
						onChange={event => setCurrentEmail(event.target.value)}
					/>
				</div>
				<div>
					<label>Confirm Current Email</label>
					<input
						type="email"
						id="email"
						name="email"
						autoComplete="email"
						value={confirmCurrentEmail}
						onChange={event => setConfirmCurrentEmail(event.target.value)}
					/>
				</div>
				<div>
					<label>New Email</label>
					<input
						type="email"
						id="email"
						name="email"
						autoComplete="email"
						value={newEmail}
						onChange={event => setNewEmail(event.target.value)}
					/>
				</div>
				<div>
					<label>Confirm New Email</label>
					<input
						type="email"
						id="email"
						name="email"
						autoComplete="email"
						value={confirmNewEmail}
						onChange={event => setConfirmNewEmail(event.target.value)}
					/>
				</div>
				<button type="submit">Update Email</button>
			</form>
			<br></br>
		</div>

		<div className="update-username">
			<h3>Update Username</h3>
			<form className='update-username-form' onSubmit={onFormSubmit}>
				<div>
					<label>Current Username</label>
					<input
						type="text"
						id="username"
						name="username"
						autoComplete="off"
						value={currentUsername}
						onChange={event => setCurrentUsername(event.target.value)}
					/>
				</div>
				<div>
					<label>Confirm Current Username</label>
					<input
						type="text"
						id="username"
						name="username"
						autoComplete="off"
						value={confirmCurrentUsername}
						onChange={event => setConfirmCurrentUsername(event.target.value)}
					/>
				</div>
				<div>
					<label>New Username</label>
					<input
						type="text"
						id="username"
						name="username"
						autoComplete="off"
						value={newUsername}
						onChange={event => setNewUsername(event.target.value)}
					/>
				</div>
				<div>
					<label>Confirm New Username</label>
					<input
						type="text"
						id="username"
						name="username"
						autoComplete="off"
						value={confirmNewUsername}
						onChange={event => setConfirmNewUsername(event.target.value)}
					/>
				</div>
				<button type="submit">Update Username</button>
			</form>
			<br></br>
		</div>
		
		<div className="update-password">
			<h3>Update Password</h3>
			<form className='update-password-form' onSubmit={onFormSubmit}>
				<div>
					<label>Current Password</label>
					<input
						type="password"
						id="password"
						name="password"
						autoComplete="password"
						value={currentPassword}
						onChange={event => setCurrentPassword(event.target.value)}
					/>
				</div>
				<div>
					<label>Confirm Current Password</label>
					<input
						type="password"
						id="password"
						name="password"
						autoComplete="password"
						value={confirmCurrentPassword}
						onChange={event => setConfirmCurrentPassword(event.target.value)}
					/>
				</div>
				<div>
					<label>New Password</label>
					<input
						type="password"
						id="password"
						name="password"
						autoComplete="off"
						value={newPassword}
						onChange={event => setNewPassword(event.target.value)}
					/>
				</div>
				<div>
					<label>Confirm New Password</label>
					<input
						type="password"
						id="password"
						name="password"
						autoComplete="off"
						value={confirmNewPassword}
						onChange={event => setConfirmNewPassword(event.target.value)}
					/>
				</div>
				<button type="submit">Update Password</button>
			</form>
			<br></br>
		</div>
		</>
	)
}
