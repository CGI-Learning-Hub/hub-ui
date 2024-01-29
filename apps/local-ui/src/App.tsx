import React from 'react';
import ExampleComponent from './components/ExampleComponent';
import { BasicButtons, AnotherComponent } from '@cgi-learning-hub/ui';

const App = () => {
  return (
    <div>
      <h1>Hello, Try your components!</h1>
      <ExampleComponent text="This is an example component test." />
      {/* component from ui  */}
      <BasicButtons/>

      <AnotherComponent/>

    </div>
  );
};

export default App;