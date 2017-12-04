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
    }
  this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

  addComments(commentInfo) { // adding comments to database
    console.log(commentInfo)

    const dbRef = firebase.database().ref(`users/host/events/eventID/comments`);

    dbRef.push(commentInfo).then((snapshot) => {
      let newKey = snapshot.key;
      let updateShoeRef = firebase.database().ref(`users/host/events/eventID/comments/${newKey}`);
      commentInfo.key = newKey;
      //updates comment with property of "key" (i.e. key: key)
      updateShoeRef.update(commentInfo);
    })
  }
  componentDidMount() { // showing comments already stored in database
    const userRef = firebase.database().ref(`users/host/events/eventID/comments`);
    userRef.on('value', (snapshot) => {
      // console.log(snapshot.val())
      const firebaseData = snapshot.val()
      const commentData = []
      for (let commentKey in firebaseData) {
        commentData.push(firebaseData[commentKey])
      }
      this.setState({
        comments: commentData
      })
    })

  }

  handleCommentSubmit(comment) {
      console.log(this.props.userEmail)
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
      // get user email from app component(to be passed down as props)
      // const userLoggedIn = this.props.userEmail
      // console.log(userLoggedIn)

      var DateTime = timeStamp()
      console.log(DateTime)

      var comments = this.state.comments;
      comment.id = Date.now();
      comment.time = DateTime;
      // comment.author = this.props.userEmail; // Sets the commentbox author to whoever is logged in

      var newComments = comments.concat([comment]);
      this.setState({comments: newComments});
      console.log(this.state)
  }

  render(){
    return(
      <div className="commentBox__div" >
        <h2 className="commentBox__head--comments">Comments</h2>

        <CommentForm onCommentSubmit={this.handleCommentSubmit} submitForm={this.addComments} user={this.props.userEmail}
          // userLoggedIn={userLoggedIn}
        />
        <CommentList comments={this.state.comments} />

      </div>
    );
  }
}
