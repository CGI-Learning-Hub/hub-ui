import React from 'react';
import { AddBox } from '@mui/icons-material'

import { Button, SearchField } from '@cgi-learning-hub/ui';

const App = () => {
  return (
    <>
      <div>
        <h2>Buttons</h2>
        <Button text="Button" className="py-8" onClick={() => alert("Hello, World")} />
        <Button text="Ajouter une entité" icon={<AddBox />} className="py-8" onClick={() => alert("Hello, World")} />
      </div>
      <div>
        <h2>Search field</h2>
        <SearchField text="Rechercher" />
      </div>
    </>
  );
};

export default App;