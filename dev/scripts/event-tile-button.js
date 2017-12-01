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
  }

  // On click, the user's directory in Firebase is sent an object which contains the User ID and the event ID
  // Regex is being used to replace '.' with ',' in email addresses for Firebase storing purposes

  addEvent() {
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

  render() {

    let linkAction = '';

    if (this.props.rsvp === 'invited' || this.props.currentPage === 'event') {
      linkAction = e => e.preventDefault()
    }

    let buttonAction = '';

    if (this.props.rsvp === 'invited') {
      buttonAction = addEvent()
    } else if (this.props.currentPage === 'event') {
      buttonAction = leaveEvent()
    }

    return (

      <Link
        onClick={linkAction}
        
        to={'/'}>

        {/* Route which determines how the button will appear on the search page */}
        <Route exact path="/search" render={
          <div>
            {this.props.rsvp === 'going' && (this.props.currentPage == 'search' || this.props.currentPage == 'home')
            ?
              <button>Event Page</button>
            :
              ''
            }
            
            {this.props.rsvp === 'invited' && (this.props.currentPage == 'search' || this.props.currentPage == 'home')
            ?
              <div>
                <button onClick={this.acceptInvite}>Accept Invite</button>
                <button onClick={this.declineInvite}>Decline Invite</button>
              </div>
            :
              ''
            }
            
            {!this.props.rsvp
            ?
              <button onClick={this.addEvent}>Add to my Events</button>
            :
              ''
            }

            {this.props.currentPage === 'event'
            ?
              <button onClick={this.leaveEvent}>Leave Event</button>
            :
              ''
            }
          </div>
        } />
        <Route exact path="/home" render={props => 
          <button>{this.props.rsvp === 'going' ? 'Event Page' : 'Accept Invite'}</button>
        } />
        <Route exact path="/:host/:event" render={
          <button>Leave Meetup</button>
        } />
        
      </Link>
    )
  }
}
