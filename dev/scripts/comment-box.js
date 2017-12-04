import React from 'react';
import ReactDOM from 'react-dom';
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import Comment from "./comment"

export default class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      host:'',
      eventID: ''

    }
  this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

 // Displaying comments already stored in database
  componentDidMount() { 
    // We start by searching through the users database for the current event and retrieving the host information
    var user = this.props.userEmail.replace(/\./g, ',')
    var eventID = `1A8ZAugGkdcikMK`// ****TO UPDATE WITH SPECIFIC EVENT ID
    // var eventID = this.props.eventID// ****TO UPDATE WITH SPECIFIC EVENT ID
    //1AvZZfsGkDdm6ES --> hardcoded cars
    //1AvZZfsGkDdm6ES --> hardcoded cars
    console.log(eventID) // ***TO UPDATE WITH SPECIFIC EVENTID
    const rootRef = firebase.database().ref(`users/${user}/events/${eventID}/host`)
    rootRef.on('value', (snapshot) => {
        console.log(snapshot.val())
        var host = snapshot.val()
      
      
      // Once we have the host information, we store all the comments regarding the specific event page in that HOST's node (this is because the host is the original person who created the event page)
      const userRef = firebase.database().ref(`users/${host}/events/${eventID}/comments`);
        userRef.on('value', (snapshot) => {
          const firebaseData = snapshot.val()
          const commentData = []
          for (let commentKey in firebaseData) {
            commentData.push(firebaseData[commentKey])
          }
          
          this.setState({
            comments: commentData
          })
          this.setState({
            host : host
          })
          this.setState({
            eventID : eventID
          })

        }) // closing userRef
    }) //closing rootRef
  }

  // Adding comments to database
  addComments(commentInfo) { 
    console.log(commentInfo)
    // Host information and eventID is stored in state for every comment created
    const dbRef = firebase.database().ref(`users/${commentInfo.host}/events/${commentInfo.event}/comments`);

    dbRef.push(commentInfo)
  }



  handleCommentSubmit(comment) {
      console.log(this.props.userEmail)
      console.log(this.props.eventID)
      // On submit of the Comment-Form, we create a timestamp.
      const timeStamp = () => {
        let options = {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        };
        let now = new Date().toLocaleString('en-US', options);
        return now;
      }
      var DateTime = timeStamp()
      console.log(DateTime)

      var comments = this.state.comments;
      comment.id = Date.now();
      comment.time = DateTime;
      // comment.author = this.props.userEmail; // Sets the commentbox author to whoever is logged in

      var comments = this.state.comments;
      comment.id = Date.now();
      comment.time = DateTime;

      // When new comments are submitted, update state to included previous comments creating an array of comments objects
      var newComments = comments.concat([comment]);
      this.setState({comments: newComments});
      console.log(this.state)
  }

  render(){
    return(
      <div className="commentBox__div" >
        <h2 className="commentBox__head--comments">Comments</h2>

        <CommentForm 
        onCommentSubmit={this.handleCommentSubmit} 
        submitForm={this.addComments} 
        user={this.props.userEmail}
        // Host & EventID stored as state, passed down as props to Comment-Form to be used in the addComments method
        host={this.state.host}
        eventID={this.state.eventID}
        />
        <CommentList comments={this.state.comments} />

      </div>
    );
  }
}
