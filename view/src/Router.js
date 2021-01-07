import React from 'react'; // Must import React, even if not calling anything from React, because using JSX
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components:
import Login from './Login';
import EntryList from './EntryList';
import Entry from './Entry';
import Search from './Search';
import Teams from './Teams';
import MyAccount from './MyAccount';
import NotFound from './NotFound';

export default function Router () {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/pokemon" component={EntryList} />
				<Route exact path="/pokemon/:pokedex_id" component={Entry} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/teams" component={Teams} />
				<Route exact path="/myaccount" component={MyAccount} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}
