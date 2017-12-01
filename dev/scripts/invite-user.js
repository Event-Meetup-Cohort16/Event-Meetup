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
        <div>
          <form
            action=""
            onSubmit={this.handleSubmit}
            role="email">
            <input
              action=""
              onChange={this.handleChange}
              placeholder="Enter a friend's email to send them the haps!"
              type="email"
              value={this.state.friend} />
            <button type="submit">Send Invite</button>
          </form>
        </div>
      )
    }
  }
