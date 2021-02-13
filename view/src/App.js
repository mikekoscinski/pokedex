import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components:
import Home from './Home'
import Signin from './Signin'
import Signup from './Signup'
import Router from './Router';

export default function App () {
	return (
		<BrowserRouter>
			<Switch>
				<Route 
					exact path="/" 
					component={Home} 
					key={'home'} 
				/>
				<Route 
					exact path="/signin"
					component={Signin}
					key={'signin'}
				/>
				<Route 
					exact path="/signup" 
					component={Signup} 
					key={'signup'} 
				/>
				<Route 
					component={Router} 
					key={'router'} 
				/>
			</Switch>
		</BrowserRouter>
	)	
}
