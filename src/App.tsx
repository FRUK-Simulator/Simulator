import React from 'react';
import {Provider} from 'react-redux';
import { store } from './store';
import { Blockly } from './BlocklyInterface/Blockly';
import { RobotSimulator } from './RobotSimulator/RobotSimulator';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Blockly />
        <RobotSimulator />
      </div>
    </Provider>

  );
}

export default App;
