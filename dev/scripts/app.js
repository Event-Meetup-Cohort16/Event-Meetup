import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import axios from 'axios';

import EventTile from './event-tile.js';
import Footer from './footer.js';
import Login from './login.js';
import SearchEvents from './search-events.js';
import SearchForm from './search-form.js';
import UserEvents from './user-events.js';
import SpecificEvent from './specific-event.js';

var config = {
  apiKey: "AIzaSyDd8y8IyT-l37rZ1mZjqvrVLTUIICKMMlY",
  authDomain: "what-s-the-haps.firebaseapp.com",
  databaseURL: "https://what-s-the-haps.firebaseio.com",
  projectId: "what-s-the-haps",
  storageBucket: "what-s-the-haps.appspot.com",
  messagingSenderId: "265551062294"
};
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      // state.user will be used to keep track of who is logged in (or if nobody is logged in)
      user: '',
      // state.currentPage will be used to keep track of where the user is on the website, and will also be used to conditionally render parts of the EventTile component.
      currentPage: '',
      // state.searchResults will hold an array of event data objects, as returned by the api call, based on users search terms
      searchResults: [],
      // state.specificEventID will be used in the SpecificEvent component to render the event tile when the use wishes to go to the event's specific page
      specificEventID: ''
    }
    this.currentUser = this.currentUser.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.specificEvent = this.specificEvent.bind(this);
  }

  // This method will get passed down as a prop on the Login component, and will be used to update the user state on the main App component depending on if a user is logged in or not.
  currentUser (email) {
    this.setState({
      user: email
    })
  }

  //
  specificEvent (event) {
    this.apiCall('', '', '', [event])
  }

  // This method accepts props from SearchForm and passes them into an api call, then returns event data to state.searchResults
  // If the API call is being used to populate the User Events page, then leave the first three parameters as empty strings, and only fill in the eventID param
  // If the API call is being used to populate the Search page, then use the first three paramaters, and leave the eventID param as an empty string
  apiCall(keyword, userCity, userCountry, eventID) {

    // Clear old results. Stole this out of clearSearch(), should just call it properly but time is short so if this makes it into production I apologise for the shame I have brought upon my mentors and my team - Jen
    this.setState({ searchResults: [] })

    // The eventSearch variable will represent the queries we will use in our API request
    // Starts as an empty array because it needs to be pushed multiple id queries when querying by eventID
    let queries = [];
    const apiURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=uuTnaGAVvta7ICBgb68XcI2AHioUcEKT`;

    // An if/else statement which will determine what will be queried from the API
    // If we are populating the UserEvents component with the events they are going to and the events they have been invited to, we will be making queries by the event id

    if (eventID) {
      eventID.forEach(function (item) {
        queries.push(`&id=${item}`)
      });
    } else {
      queries = `&classificationName=${keyword}&city=${userCity}&countryCode=CA&size=50`
    }
    axios.get(`${apiURL}${queries}`).then((res)=> {
      if (!res || res.data.page.totalElements === 0) {
        alert `Looks like nothing's happening. Please try another search!`
      } else {
        const searchResults = res.data._embedded.events;
        this.setState({searchResults});
      }
    })
  }

  // Used to update the currentPage state. Useful for conditional rendering where it does not make sense to use Routing
  updatePage(page) {
    this.setState({
      currentPage: page
    })
  }

  // This method empties the searchResults array. Each time the user wants to see their events or search for new events, the searchResults array must be emptied to avoid conflicts between searches; When searching for new events after viewing the user's events or vice-versa, the state on the event tile which determines whether the user is going, invited, or neither, will not update properly unless searchResults is cleared
  clearSearch() {
    this.setState({
      searchResults: []
    })
  }

  render() {
    return (
      <Router>
        <div>

          {/* the Login component takes a "loggedIn" prop which will be used to conditionally render the login/logout links in login.js */}
          <Login currentUser={this.currentUser} loggedIn={this.state.user} />

          {/* A ternary which will render different components depending on if the user is logged in or not */}
          {this.state.user
          ?
          <div>
              <Route exact path="/" render={props => <button>
                <Link to="/home"
                onClick={() => {
                this.updatePage('home')
                this.clearSearch()
                }}>Show my Events</Link></button>} />

              {/* Routing for the user events page */}
              <Route path="/home" render={props => <UserEvents
                currentUser={this.state.user}
                apiCall={this.apiCall}
                clearSearch={this.clearSearch}
              />}
              />

              {/* Routing for the search page */}
              <Route path="/search" render={props => <SearchForm apiCall={this.apiCall} />} />

              {/* Routing for the page which renders the specific event the user is viewing */}
              <Route path="/event/:event" render={props => <SpecificEvent apiCall={this.apiCall} eventID={this.state.specificEventID} />} />

              {/* SearchEvents will populate the page with the results from the API call */}
              <SearchEvents
                currentUser={this.state.user}
                currentPage={this.state.currentPage}
                updatePage={this.updatePage}
                searchResults={this.state.searchResults}
                specificEvent={this.specificEvent}
                clearSearch={this.clearSearch}
                apiCall={this.apiCall}
                noEvents={this.noEvents}
              />
              <Footer clearSearch={this.clearSearch} currentUser={this.currentUser} updatePage={this.updatePage} currentPage={this.state.currentPage} />

          </div>
          :
          ''
          }
        </div>
      </Router>
    )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
