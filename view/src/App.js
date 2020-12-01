import React, { useState } from "react";
import Index from "./entry-list";

function App() {
  const [entries, setEntries] = useState(['Bulbasaur', 'Ivysaur']);
  
  return (
    <>
      <Index entries={entries}/>
      <div>Menu</div>
    </>
  );
}

// TODO: Make a single-page app, with 'view' and 'menu'; 'view' updated via state?

export default App;
