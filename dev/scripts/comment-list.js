import React from 'react';
import ReactDOM from 'react-dom';
import Comment from "./comment"


export default class CommentList extends React.Component {

  render() {

    var commentNodes = this.props.comments.map( (comment) => {
      return (
        <Comment text={comment.text} author={comment.author} key={comment.id} time={comment.time} />
      );
    });

    return (
      <div className="commentList__div">
        {commentNodes}
      </div>
    );
  }
};
