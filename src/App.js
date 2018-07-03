import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import socketIOClient from 'socket.io-client'

class App extends Component {

  constructor(){
    super()

    this.state = {
      serverURL: 'http://localhost:4000',
      informationReceived: 'Nothing yet! You should click on the button!'
    }

    const socket = socketIOClient(this.state.serverURL)
    socket.on('infoEvent', (receivedInfo) => {
      this.setState({
        informationReceived: receivedInfo
      })
    })
  }

  emitInfoToAll = () => {

    const socket = socketIOClient(this.state.serverURL)

    socket.emit('infoEvent', 'Hello realtime connected users!')

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={() => this.emitInfoToAll()}>Send information to all connected clients.</button>
        </p>

        <br/><br/>

        {
          this.state.informationReceived
        }

      </div>
    );
  }
}

export default App;
