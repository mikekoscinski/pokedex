// TODO: Make a single-page app, with 'view' and 'menu'; 'view' updated via state? This should just be the view? Menu is a separate component; rendered in index.js

import React, { useState } from "react";
import Entrylist from "./Entrylist";

export default function App() {
  const [entries, setEntries] = useState(['Bulbasaur', 'Ivysaur']);
  return (
    <>
      <Entrylist entries={entries}/>
    </>
  );
};
