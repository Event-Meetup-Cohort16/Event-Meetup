import React from 'react';
import ReactDOM from 'react-dom';

import EventTile from './event-tile.js'
import Login from './login.js'

// pass event id & user id (email) to state of this component
// that state will pass as props to a comment/haps/specific event page

// user logs in from login page
// as soon as the user is logged in
// the main page loads (that's User Events!)
// check Firebase for user events
// if exists, display event tile
// if not exists, just show searchbar
// listen for change in existing events
// display new event when added to database,
// remove if deleted
export default class UserEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="userEvents__div">
        {/* User Event Tile goes here */}
      </div>
    )
  }
}
