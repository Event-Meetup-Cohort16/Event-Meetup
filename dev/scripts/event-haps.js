import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './comment-box.js'
import EventTile from './event-tile.js'
import InviteUser from './invite-user.js'

export default class EventHaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventID: '17G8v3G6CwWyKP_',
      host: 'jen@jensaxena.com',
    }
    this.sendEmail = this.sendEmail.bind(this)
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
      const ref = firebase.database().ref(`users/${user}/events/${this.props.eventID}`);
      ref.set({
        going: false,
        invited: true
      })
    })
      // add hostname (currentUser)
      // set invited to true on this eventID

    // if not exists
    // send email ??? profit
  }
  render() {
    return (
      <div>
        {/* this will be the expanded view also seen on the search page */}
        {/* <EventTile /> */}

        {/* this will have an input that accepts an email, and a submit button */}
        <InviteUser submitEmail={this.sendEmail} />

        <CommentBox />
      </div>
    )
  }
}
