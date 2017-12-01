import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './comment-box.js'
import EventTile from './event-tile.js'
import InviteUser from './invite-user.js'

export default class EventHaps extends React.Component {
  constructor() {
    super();
  }
  sendEmail(email) {
    console.log(email);
    // first, check firebase for userFriend email
    // users.
    // const userFriend = this.props.currentUser.email.replace(/\./g, ',')
    // if exists
    // add event to userFriend's invite object on Firebase
    // break

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
