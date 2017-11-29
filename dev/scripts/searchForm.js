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
    this.props.apiCall(this.state.keyword);
    this.props.apiCall(this.state.userCity);
    this.props.apiCall(this.state.userCountry);
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
          <input
            id="searchForm__input--city"
            name="city"
            onChange={this.handleChangeCity}
            type="search"
            placeholder="Enter a city"
            value={this.state.city} />

          {/* Enter the country  */}
          <input
            id="searchForm__input--country"
            name="country"
            onChange={this.handleChangeCountry}
            type="search"
            placeholder="Enter a country"
            value={this.state.country} />


          {/* Enter the event type you are looking for. e.g. */}
          <input
            id="searchForm__input--keyword"
            name="q"
            onChange={this.handleChangeKeyword}
            type="search"
            placeholder="Enter the event type you are looking for. e.g."
            value={this.state.keyword} />

          <button type="submit">Search</button>
        </form>
      </div>
    ); // return
  }; // render()
}; // class SearchForm