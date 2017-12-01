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

      var DateTime = timeStamp()
      console.log(DateTime)

      var comments = this.state.comments;
      comment.id = Date.now();
      comment.time = DateTime;


      var newComments = comments.concat([comment]);
      this.setState({comments: newComments});

  }

  render(){
    return(
      <div className="commentBox" >
        <h1>Comments </h1>
        
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />

        <CommentList comments={this.state.comments}/>
      
      </div>
    );
  }
}



