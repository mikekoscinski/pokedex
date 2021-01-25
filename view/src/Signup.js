import React, { useEffect, useState } from "react";

export default function Signup () {
	return (
		<>
		<h1>Sign up</h1>
		<form action="/signin" method="POST">
			<div>
				<label for="name">Username</label>
				<input type="text" id="username" name="username" required />
			</div>
			<div>
				<label for="name">Email</label>
				<input type="text" id="email" name="email" required />
			</div>
			<div>
				<label for="name">Password</label>
				<input type="text" id="password" name="password" required />
			</div>
			<button>Sign up</button>
		</form>
		<a href="/signin">Sign in</a>
		</>
	)
}
