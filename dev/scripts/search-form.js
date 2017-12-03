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
        <form className="searchForm__form" action="" id="searchForm__form" onSubmit={this.handleSubmit} role="search">

          {/* Enter a city  */}
          <select className="searchForm__select--city" id="searchForm__select--city" name="city" onChange={this.handleChangeCity} placeholder="Enter a Canadian city" type="search"value={this.state.city}>

            <option className="searchForm__option--city">
              Toronto
            </option>
            <option className="searchForm__option--city">
              Montreal
            </option>
            <option className="searchForm__option--city">
              Ottawa
            </option>
            <option className="searchForm__option--city">
              Edmonton
            </option>
            <option className="searchForm__option--city">
              Victoria
            </option>
            <option className="searchForm__option--city">
              Winnipeg
            </option>
            <option className="searchForm__option--city">
              Fredericton
            </option>
            <option className="searchForm__option--city">
              St. John's
            </option>
            <option className="searchForm__option--city">
              Halifax
            </option>
            <option className="searchForm__option--city">
              Charlottetown
            </option>
            <option className="searchForm__option--city">
              Quebec City
            </option>
            <option className="searchForm__option--city">
              Regina
            </option>
            <option className="searchForm__option--city">
              Yellowknife
            </option>
            <option className="searchForm__option--city">
              Iqaluit
            </option>
            <option className="searchForm__option--city">
              Whitehorse
            </option>

          </select>

          {/* Enter the event type you are looking for. e.g. */}
          <select className="searchForm__select--keyword" id="searchForm__select--keyword" name="q" onChange={this.handleChangeKeyword} placeholder="Enter the event type you are looking for. e.g." type="search" value={this.state.keyword} >
              <option className="searchForm__select--keyword">
                Music
              </option>
              <option className="searchForm__select--keyword">
                Arts & Culture
              </option>
              <option className="searchForm__select--keyword">
                Sports
              </option>
              <option className="searchForm__select--keyword">
                Family
              </option>
          </select>

          <button className="searchForm__button--submit" type="submit">Search</button>
        </form>
    ); // return
  }; // render()
}; // class SearchForm
