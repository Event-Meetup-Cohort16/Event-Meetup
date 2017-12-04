import React from 'react';
import ReactDOM from 'react-dom';


// This is where the comment gets rendered onto the page
export default class Comment extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="comment__div">
        {/* passed down from comment list */}
        <h3 className="comment__head--author">{this.props.author}</h3>
        <p className="comment__p--time">{this.props.time} </p>
        <p className="comment__p--key">{this.props.key}</p>
        <span className="comment__span--text">{this.props.text} </span>
      </div>
    );
  }
}
