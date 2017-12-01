import React from 'react';
import ReactDOM from 'react-dom';
import Comment from "./comment"


export default class CommentList extends React.Component {
  render() {
    // this.props.comments is being passed down from CommentBox
    //     var commentTime = this.props.time.map(function (time) {
    //   return (
    //     <Comment time={time} />
    //   );
    // });

    var commentNodes = this.props.comments.map(function (comment) {
      return (
        <Comment text={comment.text} author={comment.author} key={comment.id} time={comment.time}/>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
        {/* {commentTime} */}
     
      </div>
    );
  


  }
};