import React from 'react';
import ReactDOM from 'react-dom';

import Login from './login.js';
import UserEvents from './userevents.js';
import SearchEvents from './searchevents.js';
import EventTile from './eventtile.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

var config = {
  apiKey: "AIzaSyDd8y8IyT-l37rZ1mZjqvrVLTUIICKMMlY",
  authDomain: "what-s-the-haps.firebaseapp.com",
  databaseURL: "https://what-s-the-haps.firebaseio.com",
  projectId: "what-s-the-haps",
  storageBucket: "what-s-the-haps.appspot.com",
  messagingSenderId: "265551062294"
};
firebase.initializeApp(config);

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      // state.user will be used to keep track of who is logged in (or if nobody is logged in)
      user: '',
      // state.currentpage will be used to keep track of where the user is on the website, and will also be used to conditionally render parts of the EventTile component.
      currentpage: ''
    }
    this.currentUser = this.currentUser.bind(this);
  }
  
  // This method will get passed down as a prop on the Login component, and will be used to update the user state on the main App component depending on if a user is logged in or not.
  currentUser (uid) {
    this.setState({
      user: uid
    })
  }

    render() {
      return (
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={UserEvents} />
            <Route path="/search" component={SearchEvents} />
            <Route path="/event" component={EventTile} />
          </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
