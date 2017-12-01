import React from 'react';
import ReactDOM from 'react-dom';

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
      going: true,
      invited: false
    })
  }

  render() {

    let linkAction = '';

    if (this.props.rsvp === 'invited' or this.props.currentPage === 'event') {
      linkAction = e => e.preventDefault();
    }

    return (

      <Link
        onClick={linkAction}
        
        to={'/'}>

        {/* Route which determines how the button will appear on the search page */}
        <Route exact path="/search" render={
          <button>
            {this.props.rsvp === 'going' ? 'Event Page' : ''}
            {this.props.rsvp === 'invited' ? 'Accept Invite' : ''}
            {!this.props.rsvp ? 'Add to my Events' : ''}
          </button>
        } />
        <Route exact path="/home" render={
          <button>{this.props.rsvp === 'going' ? 'Event Page' : 'Accept Invite'}</button>
        } />
        <Route exact path="/:host/:event" render={
          <button>Leave Meetup</button>
        } />
        
      </Link>
    )
  }
}
