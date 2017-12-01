import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './comment-box.js'
import InviteUser from './invite-user.js'

// This component displays event info as returned by apiCall
export default class EventTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invited: false,
      going: false,
      // eventID: '17G8v3G6CwWyKP_',
      // host: 'jen@jensaxena.com'
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
    // look for friend in Firebase
    const toEmail = friend.replace(/\./g, ',')

    const friendRef = firebase.database().ref(`users/${toEmail}`);

    // if friend exists
    friendRef.once('value').then( snapshot => {
      let user = snapshot.key
      console.log(user)

      // add eventID
      // call this stuff from event tile rather than calling event tile from here
      const host = this.props.currentUser.email.replace(/\./g, ',')
      const ref = firebase.database().ref(`users/${user}/events/${this.props.eventID}`);
      ref.set({
        host: host,
        going: false,
        invited: true
        // add hostname (currentUser)
        // set invited to true on this eventID

      // if not exists
      // send email ??? profit
      })
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

          <InviteUser submitEmail={this.sendEmail} />
          

      )
    }
}
