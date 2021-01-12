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
				<Route exact path="/" component={Login} key={'login'} />
				<Route exact path="/pokemon" component={EntryList} key={'entrylist'} />
				<Route exact path="/pokemon/:pokedex_id" component={Entry} key={'entry'} />
				<Route exact path="/search" component={Search} key={'search'} />
				<Route exact path="/teams" component={Teams} key={'teams'} />
				<Route exact path="/myaccount" component={MyAccount} key={'myaccount'} />
				<Route component={NotFound} key={'notfound'} />
			</Switch>
		</BrowserRouter>
	)
}
