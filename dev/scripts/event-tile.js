import React from 'react';
import ReactDOM from 'react-dom';

// This component displays event info as returned by apiCall
export default class EventTile extends React.Component {
  constructor(props) {
    super(props);
    this.addEvent = this.addEvent.bind(this)
  }

  // This method lives on the button at the bottom of the EventTile component
  // On click, the user's directory in Firebase is sent an object which contains the User ID and the event ID
  // Regex is being used to replace '.' with ',' in email addresses for Firebase storing purposes
  addEvent () {
    const user = this.props.currentUser.email.replace(/\./g, ',')
    const ref = firebase.database().ref(`users/${user}/events/going`);
    ref.push({
      eventID: this.props.eventID,
      host: user
    })
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

          <p>${this.props.priceMin} - ${this.props.priceMax} {this.props.currency}</p>
          
          <button onClick={this.addEvent}>Add to my Events</button>
        </div>
      )
    }
}
