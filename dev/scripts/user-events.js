import React from 'react';
import ReactDOM from 'react-dom';

import EventTile from './event-tile.js'
import Login from './login.js'

// pass event id & user id (email) to state of this component
// that state will pass as props to a comment/haps/specific event page
// disp

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

      // We need to store the user's email in Firebase as the key so we can send invites to other users, but Firebase can't store directories with the . character
      // A regular expression is applied to the user's email which replaces . with , so we can store the user's email as the root directory to their data
      const user = this.props.currentUser.email.replace(/\./g, ',')
      firebase.database().ref(`users/${user}/events`).on('value', (snapshot) => {
        const firebaseEvents = snapshot.val();

        const userEvents = [];
        for (let goingEvent in firebaseEvents) {
          userEvents.push(firebaseEvents[goingEvent].eventID)
        }

        console.log(userEvents)

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
