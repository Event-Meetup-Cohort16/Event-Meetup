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

  // when a comment is added
  handleCommentSubmit(comment) {
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
      //get user email from app component(to be passed down as props)
      const host = this.props.userEmail
      console.log(host)

      var DateTime = timeStamp()
      console.log(DateTime)


      // Sets the commentbox author to whoever 
      var comments = this.state.comments;
      comment.id = Date.now();
      comment.time = DateTime;
      comment.author = host;


      var newComments = comments.concat([comment]);
      this.setState({comments: newComments});
      console.log(this.state)



      
      //this is the reference
      const ref = firebase.database().ref(`users/${host}/events/${this.props.eventID}/comment`);
      
      ref.push({
      author: host,
      timestamp: this 
      })

      
     

    


      //2. create a reference in user/{host}/event/comment 
      
      // const ref = firebase.database().ref(`users/${user}/events/${this.props.eventID}`);
      // ref.set({
      //   host: host,
      //   going: false,
      //   invited: true
      //3. push the comment as an object
      
  }

  render(){
    return(
      <div className="commentBox" >
        <h1>Comments </h1>
        
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />

        <CommentList 
        comments={this.state.comments} />
      
      </div>
    );
  }
}



