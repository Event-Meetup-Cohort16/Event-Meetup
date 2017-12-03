import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';


// This component will be rendered  in the User Events, Search and Specific Event components (and not the log in section)
class Footer extends React.Component {

    constructor() {
        super();
        this.goBack = this.goBack.bind(this)
    }

    goBack(e) {
        // Prevent page refresh on click
        e.preventDefault();
        // Take the user to the top of the page
        window.scrollTo(0, 0)
        // This loads the most previous page based on browser history
        window.history.back();
    }

    render(){
        return(
            <div className="footer__div">
                <ul className="footer__ul">
                    <li className="footer__li--link">
                        <NavLink to="/home" onClick={() => this.props.updatePage('home')}>My Events</NavLink>
                    </li>
                    <li className="footer__li--link">
                        <NavLink to="/search" onClick={() => this.props.updatePage('search')}>Search</NavLink>
                    </li>
                    <li className="footer__li--link">
                        <a className="footer__a--back" href="#" onClick={this.goBack}>Back</a>
                    </li>
                </ul>
            </div>

        )
    }
}

export default Footer;
