import React from 'react';
import ReactDOM from 'react-dom';


export default class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      author: '',
      text: '',
    };

  this.handleTextChange = this.handleTextChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if(!text ) { // if input is empty - then do not submit
      return;
    }

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
    // this.props.on Comment Submit passed down from Comment Box
    this.props.onCommentSubmit({ author: author, text: text });

    var DateTime = timeStamp()

    console.log(this.props.user)


    var commentInfo = {
      author: this.props.user, //the author is determined by whoever is signed in
      text: text,
      time: DateTime
    }

    //refer to comment-box for commentInfo on submit
    this.props.submitForm(commentInfo)
    this.setState({ author: '', text: '' });
  }

  render() {
    return(
      <form className = "commentForm" onSubmit= {this.handleSubmit} >
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}