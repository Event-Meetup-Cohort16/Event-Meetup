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
      <div className="header__div">
        {/* <img className="header__img--logo" src="" alt=""/> */}
        <h1 className="header__head--brand">Happening</h1>
        <p className="header__p--tagline">Organize event meetups with all of your friends</p>
      </div>
    )
  }
}
