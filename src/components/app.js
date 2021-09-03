import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import Home from "./pages/home"
import Signup from './pages/signup';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      user: Cookies.get("username") || ""
    }

    this.handleSetUser = this.handleSetUser.bind(this)
  }

  handleSetUser(userData) {
    this.setState({ user: userData })
  }


  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} handleSetUser={this.handleSetUser} />} />
          <Route path="/signup" render={props => <Signup {...props} handleSetUser={this.handleSetUser} />} />
          <Route path="/rules" component={() => <div>Rules</div>} />
          <Route path="/game" component={() => <div>Game</div>} />
          <Route path="/gameover" component={() => <div>Gameover</div>} />

        </Switch>
      </div>
    );
  }
}
