import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from './search-form.js'
import EventTile from './event-tile.js'

export default class SearchEvents extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log('check this one', this.props.searchResults);
    return (
      <div>
        {/* Map over the array with our search results, and return one EventTile component per result. Pass in the data needed as props */}
        {this.props.searchResults.map((result) => {
          return (
            <EventTile

              // The email of the current user; will be used to push information to Firebase
              currentUser={this.props.currentUser}

              // The name of the event
              eventName={result.name}
              // The ID of the event
              eventID={result.id}
              // The TicketMaster event URL
              eventURL={result.url}
              // The event image URL
              eventImageURL={result.images[0].url}
              // The start date for ticket sales
              eventSalesStart={result.sales.public.startDateTime}
              // The end date for ticket sales
              eventSalesEnd={result.sales.public.endDateTime}
              // The date the event is happening
              eventDate={result.dates.start.localDate}
              // The time the event is happening
              eventTime={result.dates.start.localTime}
              // The type of event
              eventType={result.classifications[0].segment.name}
              // The genre of the event content
              eventGenre={result.classifications[0].genre.name}
              // The sub-genre of the event content
              eventSubGenre={result.classifications[0].subGenre.name}
              // The currency the event tickets will be sold in
              currency={result.priceRanges[0].currency}
              // The lowest end of the price range for event tickets
              priceMin={result.priceRanges[0].min}
              // The highest end of the price range for event tickets
              priceMax={result.priceRanges[0].max}
              // The name of the venue the event will be hosted at
              venue={result._embedded.venues[0].name}
              // The address of the venue the event will be hosted at
              address={result._embedded.venues[0].address.line1}
            />
          )
        })
        }
      </div>
    )
  }
}
