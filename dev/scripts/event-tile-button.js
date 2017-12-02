import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

export default class EventTileButton extends React.Component {
  constructor(props) {
    super(props);
    this.addEvent = this.addEvent.bind(this)
    this.linkAction = this.linkAction.bind(this)
    this.buttonAction = this.buttonAction.bind(this)
    this.button = this.button.bind(this)
  }

  // On click, the user's directory in Firebase is sent an object which contains the User ID and the event ID
  // Regex is being used to replace '.' with ',' in email addresses for Firebase storing purposes

  addEvent(e) {
    e.preventDefault()
    const user = this.props.currentUser.email.replace(/\./g, ',')
    const ref = firebase.database().ref(`users/${user}/events/${this.props.eventID}`);
    ref.set({
      host: user,
      going: true,
      invited: false
    })
  }

  acceptInvite() {
    // method for accepting invite goes in here
  }

  declineInvite() {
    // method for declining invite goes in here
  }

  leaveEvent() {
    // method for leaving event goes in here
  }

  linkAction() {
    let linkAction = '';
    if (this.props.rsvp === 'invited' || this.props.currentPage === 'event') {
      linkAction = e => e.preventDefault()
    }
    return linkAction;
  }

  buttonAction() {
    let buttonAction = '';
    if (this.props.rsvp === 'invited') {
      buttonAction = addEvent()
    } else if (this.props.currentPage === 'event') {
      buttonAction = leaveEvent()
    }
    return buttonAction;
  }

  button() {
    if (this.props.rsvp === 'going') {
      return (
      <button>Event Page</button>
    )
    } else if (this.props.rsvp === 'invited') {
      return (
        <div>
          <button>Accept Invite</button>
          <button>Decline Invite</button>
        </div>
    )
    } else if (this.props.rsvp === 'neither') {
      return (
        <button onClick={this.addEvent}>Add Event</button>
      )
    }
  }

  render() {
    return (

      <Link
        onClick={this.linkAction}
        
        to={'/'}>

        {/* Route which determines how the button will appear on the search page */}

        {this.button()}
        
      </Link>
      
    )
  }
}
