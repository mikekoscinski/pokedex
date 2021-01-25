import React, { useEffect, useState } from "react";

export default function Signin () {
	return (
		<>
		<h1>Sign in</h1>
		<form action="/signin" method="POST">
			<div>
				<label for="name">Username</label>
				<input type="text" id="username" name="username" required />
			</div>
			<div>
				<label for="name">Password</label>
				<input type="text" id="password" name="password" required />
			</div>
			<button>Sign in</button>
		</form>
		<a href="/signup">Sign up</a>
		</>
	)
}
