import React from 'react';
import ReactDOM from 'react-dom';

export default class InviteUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // friend's email goes here:
        friend: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
      this.setState({ friend: e.target.value });
    };
    handleSubmit(e) {
      e.preventDefault();
      this.props.submitEmail(this.state.friend);
      this.setState({ friend: '' });
    };
    render() {
      return (
        <form className="inviteUser__form" action="" onSubmit={this.handleSubmit} role="email">
          <input className="inviteUser__input--email" action="" onChange={this.handleChange} placeholder="Enter a friend's email" type="email" value={this.state.friend} />
          <button className="inviteUser__button--send" type="submit">Send Invite</button>
        </form>
      )
    }
  }
