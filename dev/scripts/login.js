import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

const provider = new firebase.auth.GoogleAuthProvider()

// Login component will get rendered on the main app component
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        // this.addRef = this.addRef.bind(this)
    }

    // Login Method
    login(e) {
        e.preventDefault();
        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                // When the user logs in, set the user state on app.js to the user id
                this.props.currentUser({
                    user: user.uid,
                    email: user.email
                })
                var userEmail = user.user.email.replace(/\./g, ',')
                console.log(userEmail)
                const dbRef = firebase.database().ref(`users/${userEmail}`)
                dbRef.set('events')
            })
    }

    // Logout Method
    logout(e) {
        e.preventDefault();
        firebase.auth().signOut()
            .then(() => {
                // When the user logs out, set the user state on app.js to an empty string
                this.props.currentUser('')
            })
    }

    // addRef(){ //when user logs in then add a reference
    //     const user = this.props.currentUser.email.replace(/\./g, ',')
    //     const dbRef = firebase.database().ref(`users/${user}`)
    // }

    // Check if the user is logged in or not when they visit the page and when the component mounts
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // Set the user state on app.js to an object with the user ID and email
                this.props.currentUser({
                    user: user.uid,
                    email: user.email
                })
            } else {
                // If not logged in, set the user state on app.js to an empty string
                this.props.currentUser('')
            }
        })
    }

    render () {
        return (
            <div>
                {this.props.loggedIn
                ? 
                <a href="" onClick={this.logout}><Link to="/">Logout</Link></a>
                :
                <a href="" 
                onClick={this.login} 
                // onClick={this.addRef}
                >Login with Google</a>
                }
            </div>
        )
    }
}