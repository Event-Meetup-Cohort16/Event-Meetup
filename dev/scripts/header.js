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
        <img className="header__img--logo" src="public/images/logo.svg" alt="The Haps logo"/>
      </div>
    )
  }
}
