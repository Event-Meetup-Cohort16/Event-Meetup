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
        e.preventDefault();
        // This loads the most previous page based on browser history
        window.history.back();
    }
    
    render(){
        return(
            <ul>
                <li>
                    <NavLink to="/home">My Events </NavLink>
                    <NavLink to="/search">Search</NavLink>
                    <a href="#" onClick={this.goBack}>Back</a>
                </li>
            </ul>
        )
    }
}

export default Footer;