import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Pocket from './pocket';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Pocket></Pocket>
      <Pocket></Pocket>
      {/* <Button variant="contained" color="primary">
        Hello World
      </Button>

      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />

      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      /> */}
    </div>
  );
}

export default App;
