// NOTE: create-react-app is configured to use src/index.js as entry point. So, that's the first module it reads. Source: https://stackoverflow.com/questions/42438171/wheres-the-connection-between-index-html-and-index-js-in-a-create-react-app-app

// See more here: 
// https://stackoverflow.com/questions/42438171/wheres-the-connection-between-index-html-and-index-js-in-a-create-react-app-app
// https://stackoverflow.com/questions/44092341/how-do-index-js-files-work-in-react-component-directories

import React from 'react';
import { render } from 'react-dom';

// Components:
import App from './App';
import './App.css'

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
