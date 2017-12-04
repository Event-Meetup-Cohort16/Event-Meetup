import React from 'react';
import ReactDOM from 'react-dom';
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import Comment from "./comment"

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      host: '',
      eventID: ''
    }
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  // Displaying comments already stored in database
  componentDidMount() {
    // We start by searching through the users database for the current event and retrieving the host information

    const user = this.props.userEmail.replace(/\./g, ',')

    const rootRef = firebase.database().ref(`users/${user}/events/${this.props.searchResults[0].id}/host`)
    rootRef.on('value', (snapshot) => {
      let host = snapshot.val()

      // Once we have the host information, we store all the comments regarding the specific event page in that HOST's node (this is because the host is the original person who created the event page)
      const userRef = firebase.database().ref(`users/${host}/events/${this.props.searchResults[0].id}/comments`);
        userRef.on('value', (snapshot) => {
          const firebaseData = snapshot.val()
          const commentData = []
          for (let commentKey in firebaseData) {
            commentData.push(firebaseData[commentKey])
          }
          
          this.setState({
            comments: commentData,
            host: host,
            eventID: this.props.searchResults[0].id
          })

        }) // closing userRef
      }) //closing rootRef
    }

    // Adding comments to database
    addComments(commentInfo) {
      // Host information and eventID is stored in state for every comment created
      const dbRef = firebase.database().ref(`users/${commentInfo.host}/events/${commentInfo.event}/comments`);

      dbRef.push(commentInfo)
    }
  
    handleCommentSubmit(comment) {
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
      let dateTime = timeStamp()

      let comments = this.state.comments;
      comment.id = Date.now();
      comment.time = dateTime;

      // When new comments are submitted, update state to included previous comments creating an array of comments objects
      let newComments = comments.concat([comment]);
      this.setState({ comments: newComments });
    }

  render(){
    return(
      <div className="commentBox__div" >
        <h2 className="commentBox__head--comments">Comments</h2>

        <CommentForm eventID={this.props.searchResults[0].id} host={this.state.host} onCommentSubmit={this.handleCommentSubmit} submitForm={this.addComments} user={this.props.userEmail} />

        <CommentList comments={this.state.comments} />

      </div>
    );
  }
}
