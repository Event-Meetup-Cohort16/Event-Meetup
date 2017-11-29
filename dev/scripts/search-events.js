import React from 'react';
import ReactDOM from 'react-dom';

import EventTile from './event-tile.js'

export default class SearchEvents extends React.Component {

  constructor(props) {
    super(props)
  }

    render() {
      return (
        <div>
          {/* Map over the array with our search results, and return one EventTile component per result. Pass in the data needed as props */}
          {ARRAY.map((event) => {
            return
            <EventTile
            // The name of the event
            eventName={event._embedded.events.name}
            // The ID of the event
            eventID={event._embedded.events.id}
            // The TicketMaster event URL
            eventURL={event._embedded.events.url}
            // The event image URL
            eventImageURL={event._embedded.events.images.url}
            // The start date for ticket sales
            eventSalesStart={event._embedded.events.sales.public.startDateTime}
            // The end date for ticket sales
            eventSalesEnd={event._embedded.events.sales.public.endDateTime}
            // The date the event is happening
            eventDate={event._embedded.events.dates.start.localDate}
            // The time the event is happening
            eventTime={event._embedded.events.dates.start.localTime}
            // The type of event
            eventType={event._embedded.events.classifications.segment.name}
            // The genre of the event content
            eventGenre={event._embedded.events}
            // The sub-genre of the event content
            eventSubGenre={event._embedded.events}
            // The currency the event tickets will be sold in
            currency={event._embedded.events}
            // The lowest end of the price range for event tickets
            priceMin={event._embedded.events}
            // The highest end of the price range for event tickets
            priceMax={event._embedded.events}
            // The name of the venue the event will be hosted at
            venue={event._embedded.events}
            // The address of the venue the event will be hosted at
            address={event._embedded.events} />
          })}
        </div>
      )
    }
}
