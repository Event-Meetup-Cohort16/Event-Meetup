import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header__div clearfix">
        <img className="header__img--logo" src="public/images/noun_1061378_cc_color_150x85.png" alt="The Haps logo"/>
        <h1 className="header__head--brand">The Haps 
        <span className="header__span--tagline">Event meetups with friends!</span>
        </h1>
      </div>
    )
  }
}
