import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './login.js';
import UserEvents from './user-events.js';
import SearchEvents from './search-events.js';
import EventTile from './event-tile.js';
import SearchForm from './search-form.js'

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

var config = {
  apiKey: "AIzaSyDd8y8IyT-l37rZ1mZjqvrVLTUIICKMMlY",
  authDomain: "what-s-the-haps.firebaseapp.com",
  databaseURL: "https://what-s-the-haps.firebaseio.com",
  projectId: "what-s-the-haps",
  storageBucket: "what-s-the-haps.appspot.com",
  messagingSenderId: "265551062294"
};
firebase.initializeApp(config);

const apiURL =  `https://app.ticketmaster.com/discovery/v2/events.json?apikey=uuTnaGAVvta7ICBgb68XcI2AHioUcEKT`;

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      // state.user will be used to keep track of who is logged in (or if nobody is logged in)
      user: '',
      // state.currentpage will be used to keep track of where the user is on the website, and will also be used to conditionally render parts of the EventTile component.
      currentPage: '',
      // state.searchResults will hold an array of event data objects, as returned by the api call, based on users search terms
      searchResults: [],
      // state.userEvents will hold an array of the users saved event data objects, as returned by a call to the firebase database
      userEvents: [],
    }
    this.currentUser = this.currentUser.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.userEvents = this.userEvents.bind(this);
  }

  // This method will get passed down as a prop on the Login component, and will be used to update the user state on the main App component depending on if a user is logged in or not.
  currentUser (email) {
    this.setState({
      user: email
    })
  }

  userEvents (array) {
    this.setState({
      userEvents: array
    })
  }

  // This method accepts props from SearchForm and passes them into an api call, then returns event data to state.searchResults
  // If the API call is being used to populate the User Events page, then leave the first three parameters as empty strings, and only fill in the eventID param
  // If the API call is being used to populate the Search page, then use the first three paramaters, and leave the eventID param as an empty string.
  apiCall(keyword, userCity, userCountry, eventID) {

    let eventSearch = '';

    if (eventID) {
      eventSearch = `&id=${eventID}`
    } else {
      eventSearch = `&keyword=${keyword}&city=${userCity}&countryCode=${userCountry}`
    }

    axios.get(`${apiURL}${eventSearch}`).then((res)=> {
        console.log(res)
        const searchResults = res.data._embedded.events;
        console.log(searchResults);
        this.setState({searchResults});
      }
    )
  }

    render() {
      return (
        <Router>
          <div>
            <Route exact path="/" render={props => <Login currentUser={this.currentUser} />} />
            <Route path="/home" component={UserEvents} />
            <Route path="/search" render={props => <SearchEvents searchResults={this.state.searchResults}/>}/>
            <Route path="/event" component={EventTile} />

            <SearchForm apiCall={this.apiCall} />

            <UserEvents apiCall={this.apiCall} userEvents={this.userEvents}/>
            <SearchEvents currentUser={this.state.user} currentPage={this.state.currentPage} searchResults={this.state.searchResults} />
         
          </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
