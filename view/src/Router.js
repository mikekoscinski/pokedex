import React from 'react'; // Must import React, even if not calling anything from React, because using JSX
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EntryList from './EntryList';
import Entry from './Entry';
import NotFound from './NotFound';
import Search from './Search';
import Teams from './Teams';
import MyAccount from './MyAccount';

export default function Router () {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/pokemon" component={EntryList} />
				<Route exact path="/pokemon/:name" component={Entry} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/teams" component={Teams} />
				<Route exact path="/myaccount" component={MyAccount} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}
