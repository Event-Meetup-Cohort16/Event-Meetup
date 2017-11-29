import React from 'react';
import ReactDOM from 'react-dom';

const provider = new firebase.auth.GoogleAuthProvider()

// Login component will get rendered on the main app component
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
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
                <a href="" onClick={this.login}>Login</a>
                <br />
                <a href="" onClick={this.logout}>Logout</a>
            </div>
        )
    }
}