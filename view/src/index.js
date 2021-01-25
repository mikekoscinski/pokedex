// // TODO: All of my imports should go here, so I can access everything from one place

// import React from 'react'; // Must import React, even if not calling anything from React, because using JSX
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// // Components:
// import Signin from './Signin';
// import EntryList from './EntryList';
// import Entry from './Entry';
// import Search from './Search';
// import Teams from './Teams';
// import MyAccount from './MyAccount';
// import NotFound from './NotFound';

// export {
//   Signin, 
//   EntryList,
//   Entry,
//   Search,
//   Teams,
//   MyAccount,
//   NotFound
// }

// NOTE: create-react-app is configured to use src/index.js as entry point. So, that's the first module it reads. Source: https://stackoverflow.com/questions/42438171/wheres-the-connection-between-index-html-and-index-js-in-a-create-react-app-app

import React from 'react';
import { render } from 'react-dom';

// Components:
import Router from './Router';
import Navmenu from './Navmenu';

render(
  <React.StrictMode>
    <Router />
    <Navmenu />
  </React.StrictMode>,
  document.getElementById('root')
);
