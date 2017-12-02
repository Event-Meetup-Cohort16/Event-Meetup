import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

export default class Header extends React.Component {
  constructor() {

  }
  render() {
    return (
      <div>
        <h1>What's the Haps?</h1>
        <p>Organize event meetups with all of your friends!</p>
      </div>
    )
  }
}
