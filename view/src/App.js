// import React from 'react';
// import { render } from 'react-dom';
// import Router from './Router';

// render(
//   <React.StrictMode>
//     <Router />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// TODO: This will eventually render the App, and index.js will render App.js
// See more here: 
// https://stackoverflow.com/questions/42438171/wheres-the-connection-between-index-html-and-index-js-in-a-create-react-app-app
// https://stackoverflow.com/questions/44092341/how-do-index-js-files-work-in-react-component-directories


import React from 'react';
import { render } from 'react-dom';

// Components:
import Router from './Router';
import Navmenu from './Navmenu';

export default function App () {
	return (
		<>
		<Router />
		<Navmenu />
		</>
	)
	
	
}
