import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      userCity:'',
      userCountry:'',
    };

    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChangeKeyword(e) {
    this.setState({ keyword: e.target.value });
  };
  handleChangeCity(e) {
    this.setState({ userCity: e.target.value });
  };
  handleChangeCountry(e) {
    this.setState({ userCountry: e.target.value });
  };


  handleSubmit(e) {
    e.preventDefault();
    //this will be the axios request (apiCall)
    this.props.apiCall(this.state.keyword, this.state.userCity, this.state.userCountry, '');
    //on submit, clear the inputs stored in searchForm state
    this.setState({
      keyword: '',
      userCity: '',
      userCountry: '' });
  };
  render() {
    return (
      <div>
        <form
          id="searchForm__form"
          action=""
          onSubmit={this.handleSubmit}
          role="search">

          {/* Enter a city  */}
          <select
            id="searchForm__input--city"
            name="city"
            onChange={this.handleChangeCity}
            type="search"
            placeholder="Enter a Canadian city"
            value={this.state.city}>

            <option>Toronto</option>
            <option>Montreal</option>
            <option>Ottawa</option>
            <option>Edmonton</option>
            <option>Victoria</option>
            <option>Winnipeg</option>
            <option>Fredericton</option>
            <option>St. John's</option>
            <option>Halifax</option>
            <option>Charlottetown</option>
            <option>Quebec City</option>
            <option>Regina</option>
            <option>Yellowknife</option>
            <option>Iqaluit</option>
            <option>Whitehorse</option>

          </select>


          
          {/* Enter the event type you are looking for. e.g. */}
          <select
            id="searchForm__input--keyword"
            name="q"
            onChange={this.handleChangeKeyword}
            type="search"
            placeholder="Enter the event type you are looking for. e.g."
            value={this.state.keyword} >
              <option>Music</option>
              <option>Arts & Culture</option>
              <option>Sports</option>
              <option>Family</option>
          </select>

          <button type="submit">Search</button>
        </form>
      </div>
    ); // return
  }; // render()
}; // class SearchForm
