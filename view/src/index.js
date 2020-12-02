// TODO: Should everything in this file be moved into controller.js?
// TODO: But I don't know how the bundler works yet. I tried moving it into the controller and nothing would render

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navmenu from './navmenu';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <p>test in index.js</p>
    <Navmenu />
  </React.StrictMode>,
  document.getElementById('root')
);
