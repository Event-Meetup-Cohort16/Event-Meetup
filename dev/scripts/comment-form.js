import React from 'react';
import ReactDOM from 'react-dom';


export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      text: ''
    };

  this.handleTextChange = this.handleTextChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if(!text ) { // if input is empty - then do not submit
      return;

      console.log(text)
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

    const dateTime = timeStamp()

    let commentInfo = {
      author: this.props.user, //the author is determined by whoever is signed in
      text: text,
      time: dateTime,
      host: this.props.host, // passed down from comment box
      event: this.props.eventID // passed down from comment box
    }

    this.props.submitForm(commentInfo)
    this.setState({ text: '' });
  }

  render() {
    return(
      <form className="commentForm__form" onSubmit={this.handleSubmit} >
        <textarea className="commentForm__input--comment" onChange={this.handleTextChange} placeholder="Say something..." type="text" value={this.state.text} />

        <button className="commentForm__button--submit" type="submit">Post</button>
      </form>
    );
  }
}
