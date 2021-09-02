import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>} />
          <Route path="/signup" component={() => <div>Signup</div>} />
          <Route path="/rules" component={() => <div>Rules</div>} />
          <Route path="/game" component={() => <div>Game</div>} />
          <Route path="/gameover" component={() => <div>Gameover</div>} />

        </Switch>
      </div>
    );
  }
}
