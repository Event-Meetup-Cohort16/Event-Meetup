import React from 'react';
import ReactDOM from 'react-dom';


// This is where the comment get renders on to the page
export default class Comment extends React.Component {
  render() {
    return (

      <div className="comment__div">
        {/*  */}
        <h3 className="comment__head--author">
          {/* passed down from comment list */}
          {this.props.author}
        </h3>
          {/* passed down from comment list */}
        <p className="comment__p--time">{this.props.time} </p>
        <p className="comment__p--key">{this.props.key}</p>
        <span className="comment__span--text">{this.props.text} </span>
        {/* <span>{this.props.time} </span> */}
      </div>
    );
  }
}
