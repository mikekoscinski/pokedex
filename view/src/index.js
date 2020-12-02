// TODO: Should everything in this file be moved into controller.js?
// TODO: But I don't know how the bundler works yet. I tried moving it into the controller and nothing would render

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navmenu from './Navmenu';

ReactDOM.render(
  <React.StrictMode>
    <strong>Application view:</strong>
    <App />
    <hr></hr>
    <strong>Navmenu view:</strong>
    <Navmenu />
  </React.StrictMode>,
  document.getElementById('root')
);
