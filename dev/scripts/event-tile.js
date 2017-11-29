import React from 'react';
import ReactDOM from 'react-dom';

// This component displays event info as returned by apiCall
export default class EventTile extends React.Component {
  constructor() {
    super();
  }
    render() {
      return (
        <div>
          <h2>{this.props.eventName}</h2>

          <img src={`${this.props.eventImageURL}`} alt={`Promo image for ${this.props.eventName}`} />

          <p>{this.props.eventType}, {this.props.eventGenre}, {this.props.eventSubGenre}</p>

          <p>{this.props.eventDate}, {this.props.eventTime}</p>
          <p>{this.props.venue}, {this.props.address}</p>

          <h3>Tickets on Sale</h3>

          <p>{this.props.eventSalesStart} - {this.props.eventSalesEnd}</p>

          <p>${this.props.priceMin} - ${this.props.priceMax} {this.props.currency}</p>
        </div>
      )
    }
}
