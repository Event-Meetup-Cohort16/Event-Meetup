import React from 'react';
import ReactDOM from 'react-dom';

// This is a sample! In reality we should direct the results into variables,
// and then replace these long-ass paths with something nice and clean like ${event.name}
// ${event.venue} and so forth et cetera. The commented out code ought theoretically to get
// the right data displaying on the page once we hook it up to an API call, but of course YMMV
export default class EventTile extends React.Component {
  constructor() {
    super();
  }
    render() {
      return (
        <div>

          {/* <h2>${_embedded.events.name}</h2> */}
          <h2>Distant Worlds: Music From FINAL FANTASY</h2>

          {/* <img src={`{_embedded.events.images.???.url}`} alt={`Promo image for ${_embedded.events.name}`} /> */}
          <img src="https://s1.ticketm.net/dam/a/2c2/75517116-f900-4d92-b554-e321347282c2_250041_ARTIST_PAGE_3_2.jpg" alt="Promo image for Distant Worlds: Music From FINAL FANTASY" />

          {/* <p>${_embedded.events.classifications.segment.name}, ${_embedded.events.classifications.genre.name}, ${_embedded.events.classifications.subGenre.name}</p> */}
          <p>Arts &amp; Theatre, Classical, Symphonic</p>

          {/* <p>${_embedded.events.dates.start.localDate}, ${_embedded.events.dates.start.localTime}</p> */}
          <p>2017-12-02, 20:00</p>

          {/* <p>${_embedded.events.venues.name}, ${_embedded.events.venues.address.line1}</p> */}
          <p>Sony Centre for the Performing Arts, 1 Front St. E.</p>

          <h3>Tickets on Sale</h3>

          {/*  <p>${_embedded.events.sales.public.startDateTime} - ${_embedded.events.sales.public.endDateTime}</p> */}
          <p>2017-02-17 15:00 - 2017-12-03 01:00</p>

          {/* <p>$ ${_embedded.events.priceRanges.min} - $ ${_embedded.events.priceRanges.max} ${_embedded.events.priceRanges.currency}</p> */}
          <p>$ 30 - $ 175 CAD</p>

        </div>
      )
    }
}
