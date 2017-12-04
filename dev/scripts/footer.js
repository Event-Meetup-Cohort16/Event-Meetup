import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';


// This component will be rendered  in the User Events, Search and Specific Event components (and not the log in section)
export default class Footer extends React.Component {

    constructor() {
        super();
        this.goBack = this.goBack.bind(this)
        this.logout = this.logout.bind(this)
    }

    goBack(e) {
        // Prevent page refresh on click
        e.preventDefault();
        // Take the user to the top of the page
        window.scrollTo(0, 0)
        // This loads the most previous page based on browser history
        window.history.back();
    }

    // Logout Method
    logout(e) {
        e.preventDefault();
        this.props.clearSearch()
        firebase.auth().signOut()
            .then(() => {
                // When the user logs out, set the user state on app.js to an empty string
                this.props.currentUser()
            })
    }

    render(){
        return(
            <div className="footer__div">
                <ul className="footer__ul">
                    <li className="footer__li--link">
                        <NavLink to="/home" onClick={() => {
                            if (this.props.currentPage !== 'home') {
                            this.props.updatePage('home')
                            this.props.clearSearch()
                            }
                        }}>
                            My Events
                        </NavLink>
                    </li>
                    <li className="footer__li--link">
                        <NavLink to="/search" onClick={() => {
                            this.props.updatePage('search')
                            this.props.clearSearch()
                            }
                        }>
                            Search
                        </NavLink>
                    </li>
                    <li className="footer__li--link">
                        <a className="login__a--logout" href="" onClick={this.logout}><Link to="/">Logout</Link></a>
                    </li>
                </ul>
            </div>

        )
    }
}
