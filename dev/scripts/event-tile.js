import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './comment-box.js'
import InviteUser from './invite-user.js'
import EventTileButton from './event-tile-button.js'

// This component displays event info as returned by apiCall
export default class EventTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invited: false,
      going: false,
    }
    this.addEvent = this.addEvent.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
  }

  addEvent() {
    const user = this.props.currentUser.email.replace(/\./g, ',')
    const ref = firebase.database().ref(`users/${user}/events/${this.props.eventID}`);
    ref.set({
      host: user,
      going: true,
      invited: false
    })
  }

  sendEmail(friend) {
    // look for friend in users database
    const toEmail = friend.replace(/\./g, ',')
    const friendRef = firebase.database().ref(`users/${toEmail}`);

    // if friend exists add event to friend
    // with current user as host
    // set invited to true
    friendRef.once('value').then( snapshot => {
      let user = snapshot.key

      if (user !== false) {
        const host = this.props.currentUser.email.replace(/\./g, ',')
        const ref = firebase.database().ref(`users/${user}/events/${this.props.eventID}`);
        ref.set({
          host: host,
          going: false,
          invited: true
        })

      // if friend is not in database
      // send invite email
      } else {
        // send email ??? profit
      }
    })
  }

  componentDidMount() {

    const user = this.props.currentUser.email.replace(/\./g, ',')
    const events = firebase.database().ref(`users/${user}/events`);

    events.on('value', snapshot => {
      let event = snapshot.val()
      for (let key in event) {

        if (event[key].eventID === this.props.eventID && event[key].going === true) {
          this.setState({
            going: true,
            invited: false
          })
        } else if (event[key].eventID === this.props.eventID && event[key].invited === true) {
          this.setState({
            going: false,
            invited: true
          })
        }
        }
    });

  }

    render() {
      return (
        <div>
          <h2>{this.props.eventName}</h2>

          <img src={`${this.props.eventImageURL}`} alt={`Promo image for ${this.props.eventName}`} />
          <a href={`${this.props.eventURL}`}>{this.props.eventURL}</a>

          <p>{this.props.eventType}, {this.props.eventGenre}, {this.props.eventSubGenre}</p>

          <p>{this.props.eventDate}, {this.props.eventTime}</p>
          <p>{this.props.venue}, {this.props.address}</p>

          <h3>Tickets on Sale</h3>

          <p>{this.props.eventSalesStart} - {this.props.eventSalesEnd}</p>

          <button onClick={this.addEvent}>Add to my Events</button>

          {/* <EventTileButton /> */}
          <InviteUser submitEmail={this.sendEmail} />

          <CommentBox />
        </div>
      )
    }
}
