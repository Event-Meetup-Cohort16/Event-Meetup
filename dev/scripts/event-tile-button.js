import React from 'react';
import ReactDOM from 'react-dom';

export default class EventTileButton extends React.Component {
  constructor(props) {
    super(props);
    this.addEvent = this.addEvent.bind(this)
  }

  // On click, the user's directory in Firebase is sent an object which contains the User ID and the event ID
  // Regex is being used to replace '.' with ',' in email addresses for Firebase storing purposes

  addEvent() {
    const user = this.props.currentUser.email.replace(/\./g, ',')
    const ref = firebase.database().ref(`users/${user}/events/going`);
    ref.push({
      eventID: this.props.eventID,
      host: user
    })
  }


  render() {

    // Declare a variable which will determine whether clicking the <Link> will actually route the user to a new page or not. Depending on the state of currentPage on app.js, the <Link> may not need to take the user to a new page and e.preventDefault should be called.
    let linkClick = ''

    // Declare variables which will determine what text appears in the <button> element, as well as what method will be executed onClick
    let buttonClick = '';
    let buttonText = '';

    if (this.props.currentPage === 'search') {
      buttonClick = this.addEvent;
      linkClick = e => e.preventDefault();

    } else if (this.props.currentPage === 'home') {
      buttonClick = this.addEvent

    } else if (this.props.currentPage === 'event') {
      buttonClick = this.addEvent
      
    }


    return (

      <Link
        onClick={this.props.currentPage === 'home' && this.props.invited === true
        ?  


        :
        e => e.preventDefault()}
        
        to={'/'}>
        <button onClick={buttonClick}>{buttonText}</button>
      </Link>
    )
  }
}
