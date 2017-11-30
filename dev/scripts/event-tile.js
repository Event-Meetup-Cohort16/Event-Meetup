import React from 'react';
import ReactDOM from 'react-dom';

// This component displays event info as returned by apiCall
export default class EventTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invited: false,
      going: false
    }
    this.addEvent = this.addEvent.bind(this)
  }

  addEvent() {
    const user = this.props.currentUser.email.replace(/\./g, ',')
    const ref = firebase.database().ref(`users/${user}/events/going`);
    ref.push({
      eventID: this.props.eventID,
      host: user
    })
  }

  componentDidMount() {

    const user = this.props.currentUser.email.replace(/\./g, ',')
    const eventsAttending = firebase.database().ref(`users/${user}/events/going`);
    const eventsInvited = firebase.database().ref(`users/${user}/events/invited`);

    const eventID = this.props.eventID

    eventsAttending.on('value', snapshot => {
      let event = snapshot.val()
      for (let key in event) {
        if (event[key].eventID === eventID) {
          this.setState({
            going: true,
            invited: false
          })
        }
      }
    });

    eventsInvited.on('value', snapshot => {
      let event = snapshot.val()
      for (let key in event) {
        if (event[key].eventID === eventID) {
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

          <p>${this.props.priceMin} - ${this.props.priceMax} {this.props.currency}</p>
<<<<<<< HEAD

          <button onClick={this.addEvent}>Add to my Events</button>
=======
          
          <button onClick={this.addEvent}>add event</button>
>>>>>>> dfe1cf403605b06614248e715367a5705107709b
        </div>
      )
    }
}
