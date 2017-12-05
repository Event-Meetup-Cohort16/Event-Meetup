import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      userCity: '',
    };
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    this.setState({ keyword: 'Arts&Culture', userCity: 'Calgary'})
  }

  handleChangeKeyword(e) {
    this.setState({ keyword: e.target.value });
  };
  handleChangeCity(e) {
    this.setState({ userCity: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    //this will be the axios request (apiCall)
    this.props.apiCall(this.state.keyword, this.state.userCity);
  };
  render() {
    return (
        <form className="searchForm__form" action="" id="searchForm__form" onSubmit={this.handleSubmit} role="search">

          {/* Enter a city  */}
          <select className="searchForm__select--city" id="searchForm__select--city" name="city" onChange={this.handleChangeCity} type="search" value={this.state.value}>

            <option className="searchForm__option--city" value="Calgary">
              Calgary
            </option>
            <option className="searchForm__option--city" value="Edmonton">
              Edmonton
            </option>
            <option className="searchForm__option--city" value="Fredericton">
              Fredericton
            </option>
            <option className="searchForm__option--city" value="Halifax">
              Halifax
            </option>
            <option className="searchForm__option--city" value="Hamilton">
              Hamilton
            </option>
            <option className="searchForm__option--city" value="Montreal">
              Montréal
            </option>
            <option className="searchForm__option--city" value="Ottawa">
              Ottawa
            </option>
            <option className="searchForm__option--city" value="Red Deer">
              Red Deer
            </option>
            <option className="searchForm__option--city" value="Regina">
              Regina
            </option>
            <option className="searchForm__option--city" value="St Johns">
              St. John's
            </option>
            <option className="searchForm__option--city" value="Toronto">
              Toronto
            </option>
            <option className="searchForm__option--city" value="Vancouver">
              Vancouver
            </option>
            <option className="searchForm__option--city" value="Victoria">
              Victoria
            </option>
            <option className="searchForm__option--city" value="Winnipeg">
              Winnipeg
            </option>

          </select>

          {/* Enter the event type you are looking for. e.g. */}
          <select className="searchForm__select--keyword" id="searchForm__select--keyword" name="q" onChange={this.handleChangeKeyword} type="search" value={this.state.value} >
              <option className="searchForm__select--keyword" value="Arts&Culture">
                Arts &amp; Culture
              </option>
              <option className="searchForm__select--keyword" value="Family">
                Family
              </option>
              <option className="searchForm__select--keyword" value="Film">
                Film
              </option>
              <option className="searchForm__select--keyword" value="Music">
                Music
              </option>
              <option className="searchForm__select--keyword" value="Sports">
                Sports
              </option>
              <option className="searchForm__select--keyword" value="Theatre">
                Theatre
              </option>
          </select>

          <button className="searchForm__button--submit" type="submit">Search</button>
        </form>
    ); // return
  }; // render()
}; // class SearchForm
