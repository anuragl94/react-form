import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TestForm from './components/TestForm'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Form</h1>
        </header>
        <main className='App-content'>
          <TestForm />
        </main>
      </div>
    );
  }
}

export default App;
