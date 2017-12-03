import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

import Header from './header.js';

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
                // This will be used for a number of things
                this.props.currentUser({
                    user: user.uid,
                    email: user.email
                })
                var userEmail = user.user.email.replace(/\./g, ',')
                const dbRef = firebase.database().ref(`users`)

                // Check the database to see if the user who is logging in exists or not already
                dbRef.on('value', (snapshot) => {

                    // We can use a variable with a boolean value to determine whether the user exists or not. We will start it with a falsey value, then change it to a truthy value if the user does exist.
                    let userExists = false;

                    // This for...in loop runs through the 'users' directory, and checks to see if the user's email matches any emails that exist in that directory. If it does match, then update userExists's value to true
                    for (let user in snapshot.val()) {
                        if (user === userEmail) {
                            userExists = true;
                        }
                    }

                    // If the for...in loop could not match the user's email with any emails that already exist in the directory, then the user doesn't exist yet, we will have to create a directory for that user using .set()
                    if (userExists === false) {
                        const dbRef = firebase.database().ref(`users/${userEmail}`)
                        dbRef.set(':~)')
                    }

                })
            })
    }

    // Logout Method
    logout(e) {
        e.preventDefault();
        firebase.auth().signOut()
            .then(() => {
                // When the user logs out, set the user state on app.js to an empty string
                this.props.currentUser()
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
                this.props.currentUser()
            }
        })
    }

    render () {
        return (
            <div className="login__div">
                <Header />
                {this.props.loggedIn
                ?
                <a className="login__a--login" href="" onClick={this.logout}><Link to="/">Logout</Link></a>
                :
                <a className="login__a--logout" href=""
                onClick={this.login}
                // onClick={this.addRef}
                >Login with Google</a>
                }
            </div>
        )
    }
}
