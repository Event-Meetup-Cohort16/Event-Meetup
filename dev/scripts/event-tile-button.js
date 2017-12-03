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
    this.leaveEvent = this.leaveEvent.bind(this)
    this.acceptInvite = this.acceptInvite.bind(this)
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

  acceptInvite(e) {
    // method for accepting invite goes in here
    e.preventDefault()
    const user = this.props.currentUser.email.replace(/\./g, ',')
    const refGoing = firebase.database().ref(`users/${user}/events/${this.props.eventID}/going`);
    refGoing.set(true)
    const refInvited = firebase.database().ref(`users/${user}/events/${this.props.eventID}/invited`);
    refInvited.set(false)
  }

  leaveEvent(e) {
    // method for leaving event goes in here
    e.preventDefault()
    const user = this.props.currentUser.email.replace(/\./g, ',')
    const ref = firebase.database().ref(`users/${user}/events/${this.props.eventID}`).remove()
  }

  // This method will determine whether the Link component will actually send the user to the "to" path or not. The Link should only work when the user is going to see a specific event page, otherwise prevent the default action of the Link component.
  linkAction() {
    let action = () => {};
    if (this.props.rsvp === 'invited' || this.props.currentPage === 'event') {
      action = e => e.preventDefault()
    }
    return action;
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
        <button onClick={() => this.props.specificEvent(this.props.eventID)}>Event Page</button>
      )
    } else if (this.props.rsvp === 'invited') {
      return (
        <div>
          <button onClick={this.acceptInvite}>Accept Invite</button>
          <button onClick={this.leaveEvent}>Decline Invite</button> 
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
        to={`/event/${this.props.eventID}`}>

        {this.button()}
        
      </Link>
      
    )
  }
}
