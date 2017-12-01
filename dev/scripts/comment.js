import React from 'react';
import ReactDOM from 'react-dom';


// This is where the comment get renders on to the page
export default class Comment extends React.Component {
  render() {
    return (
      
      <div className="comment">
        {/*  */}
        <h2 className="commentAuthor">
          {/* passed down from comment list */}
          {this.props.author}
        </h2>
          {/* passed down from comment list */}
        <span>{this.props.text} </span>
        <p>{this.props.time} </p>
        {/* <span>{this.props.time} </span> */}
      </div>
    );
  }
}