import React from 'react';
import ReactDOM from 'react-dom';


export default class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      author: '',
      text: '',
    };
  this.handleAuthorChange = this.handleAuthorChange.bind(this)
  this.handleTextChange = this.handleTextChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleAuthorChange(e) {
    
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    
    this.setState({ text: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if(!text || !author) {
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

    // const userEmail = () =>{
    //   return this.props.userEmail
    // }
    // const emailCall = userEmail()

    // Object Made to push to firebase
    // console.log(userEmail)
    // var userEmail = this.props.userEmail
    var commentInfo = {
      author: this.props.user, //change this to user logged in in the comment box
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
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
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