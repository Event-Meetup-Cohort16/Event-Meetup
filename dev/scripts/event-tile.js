import React from 'react';
import ReactDOM from 'react-dom';
import CommentForm from './comment-form.js'
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
    // if exists add event to friend
    // with current user as host
    // set invited to true
    const toEmail = friend.replace(/\./g, ',');

    firebase.database().ref(`users/${toEmail}`).once('value', (snapshot) => {
      let exists = snapshot.val();

      if (exists !== null) {
        const host = this.props.currentUser.email.replace(/\./g, ',');
        let ref = firebase.database().ref(`users/${toEmail}/events/${this.props.eventID}`);

        ref.set({
          host: host,
          going: false,
          invited: true
        })

      // if friend is not in database
      // send invite email
      } else {
        document.location.href = `mailto:${friend}?subject=What's%20%20the%20Haps?&body=A%20friend%20has%20invited%20you%20to%20a%20meetup!%20Create%20an%20account%20to%20find%20out%20the%20Haps:%20http://whatsthehaps.com/thisisafakeURL`;
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

          <h3>Tickets on Sale!</h3>

          <p>{this.props.eventSalesStart} - {this.props.eventSalesEnd}</p>

          <button onClick={this.addEvent}>Add to my Events</button>

          {/* <EventTileButton /> */}
          <InviteUser submitEmail={this.sendEmail} />

          <CommentBox userEmail={this.props.currentUser.email} />
          <CommentForm userEmail={this.props.currentUser.email} />
          </div>

      )
    }
}
