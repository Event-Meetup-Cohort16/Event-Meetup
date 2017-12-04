import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';

export default withRouter(class EventTileButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: '/home'
    }
    this.addEvent = this.addEvent.bind(this)
    this.leaveEvent = this.leaveEvent.bind(this)
    this.acceptInvite = this.acceptInvite.bind(this)
    this.linkAction = this.linkAction.bind(this)
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
    const ref = firebase.database().ref(`users/${user}/events/`)
    ref.child(`${this.props.eventID}`).remove()

    this.props.clearSearch()

    firebase.database().ref(`users/${user}/events`).once('value', (snapshot) => {
      const firebaseEvents = snapshot.val();

      const userEvents = [];
      for (let goingEvent in firebaseEvents) {
        userEvents.push(goingEvent)
      }

      this.props.apiCall('', '', '', userEvents)

    })


  }

  // This method will determine whether the Link component will actually send the user to the "to" path or not. The Link should only work when the user is going to see a specific event page, otherwise prevent the default action of the Link component.
  linkAction() {
    let action = () => {}
    if (this.props.rsvp === 'invited') {
      action = e => e.preventDefault()
    } else if (this.props.currentPage === 'home') {
      action = () => this.props.updatePage('event')
    } else if (this.props.currentPage === 'event') {
      action = () => {
        this.props.history.push('/home');
        this.props.updatePage('home');
      }
    }
    return action;
  }

  // This method will conditionally render different <button> elements depending on where the user is on the website and the conditions of the event tile (whether the user is invited, going, or neither, etc)
  button() {
    if (this.props.rsvp === 'going' && (this.props.currentPage === 'home' || this.props.currentPage === 'search')) {
      return (
        <button onClick={() => {
          this.props.clearSearch()
          this.props.specificEvent(this.props.eventID)
          this.props.updatePage('event')
        }}>Event Page</button>
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
    } else {
      return (
        <button onClick={this.leaveEvent}>Leave the Hap</button>
      )
    }
  }

  componentDidMount() {
    if (this.props.currentPage !== 'event') {
      this.setState({
        link: `/event/${this.props.eventID}`
      })
    }
  }

  render() {
    console.log(this.state.link)
    return (
      <Link
        onClick={this.linkAction()}
        to={`${this.state.link}`}>
        {this.button()}
      </Link>
    )
  }
})
