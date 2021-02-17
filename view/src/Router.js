import React from 'react'; // Must import React, even if not calling anything from React, because using JSX
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components:
import EntryList from './EntryList';
import Entry from './Entry';
import Search from './Search';
// import Teams from './Teams';
import Account from './Account';
import NotFound from './NotFound';
import Navmenu from './Navmenu';

export default function Router () {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/pokemon" component={EntryList} key={'entrylist'} />
				<Route exact path="/pokemon/:pokedex_id" component={Entry} key={'entry'} />
				
				{/* TODO: This should be optimized. This runs duplicate Network requests every time the user changes the page  */}
				<Route exact path="/search" component={Search} key={'search'} />
				<Route exact path="/search/moves" component={Search} key={'search'} />
				
				{/* TODO: 'teams' reserved for future feature */}
				{/* <Route exact path="/teams" component={Teams} key={'teams'} /> */}
				<Route exact path="/account" component={Account} key={'account'} />
				<Route component={NotFound} key={'notfound'} />
			</Switch>
			<Navmenu />
		</BrowserRouter>
	)
}
