export default function checkAccessTokenOnPublicRoutes (accessToken) {
	return (path) => {
		// Before sending network request, check if there's a token first. If there isn't, return and let user proceed.
		if (!accessToken) return
		
		// If there IS a token, we need to send a network request to validate it.
		fetch(`http://localhost:5000/${path}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => {
			if (!res.ok) { 
				// If the token is INVALID, delete it and send user to the home page.
				localStorage.removeItem('accessToken')
				return window.location.replace('/')
			}
			// If token is VALID, they are already properly signed in & should be redirected to '/pokemon'.
			return window.location.replace('/pokemon')
		})
	}
}


// TODO: Same as above but inverted
// Will get to this one but fix the top one first
/*
function checkAccessTokenForPrivateRoutes (accessToken) {
	if (!accessToken) return window.location.replace('/')
	
	fetch('http://localhost')
}
*/
