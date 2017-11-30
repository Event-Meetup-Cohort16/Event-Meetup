import React from 'react';
import ReactDOM from 'react-dom';

import EventTile from './event-tile.js'
import Login from './login.js'

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
    // Check if the user has saved events when they visit the page and when the component mounts
    componentDidMount() {
      const user = this.props.currentUser.email.replace(/\./g, ',')
      firebase.database().ref(`users/${user}/events/going`).on('value', (snapshot) => {
        const firebaseEvents = snapshot.val();

        const userEvents = [];
        for (let goingEvent in firebaseEvents) {
          userEvents.push(firebaseEvents[goingEvent])
        }

        this.props.apiCall('', '', '', userEvents)

      })
    }
    render() {
      return (
        <div>
          {/* User Event Tile goes here */}

        </div>
      )
    }
}
