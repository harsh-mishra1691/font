/* eslint-disable react/prop-types */
import React from 'react';
import configData from '../data/index';

// eslint-disable-next-line react/prefer-stateless-function
class DisplayList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFont: '',
    };
    this.filtersData = props.filtersData;
    this.getAPIData = this.getAPIData.bind(this);
    this.showSelectedFont = this.showSelectedFont.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.apiUrl = configData.apiUrl;
  }

  componentDidMount() {
    // const
    // let response = await fetch(configData.apiUrl);

    // if (response.ok) { // if HTTP-status is 200-299
    //   // get the response body (the method explained below)
    //   let json = await response.json();
    // } else {
    //   alert("HTTP-Error: " + response.status);
    // }
    this.getAPIData('', true);
  }

  componentWillReceiveProps(newProps, oldProps) {
    console.log(newProps.filtersData, oldProps.filtersData);
    if (newProps.filtersData !== this.filtersData) {
      console.log('filterdata', oldProps.filtersData, newProps.filtersData);
      const queryParam = '&sort=' + newProps.filtersData;
      this.getAPIData(queryParam);
      this.filtersData = newProps.filtersData;
    }
  }

  getAPIData(queryparam, initialLoad) {
    const { setResponseInStore, setWelcomeModal, setDisplayList } = this.props;
    const url = this.apiUrl + queryparam;
    // let res = ''
    const resData = fetch(url);
    resData
      .then((res) => res.json())
      .then((result) => {
        console.log('res>>>', result);
        setResponseInStore(result.items);
        setDisplayList(result.items);
        if (initialLoad) {
          setWelcomeModal(false);
        }
      }, (err) => {
        console.log('err', err);
      });
  }

  // searchedString()

  showSelectedFont(font) {
    console.log('selected Font>', font);
    this.setState({
      selectedFont: font,
    });

    const fontUrl = font['files'][font.variants[0]];
    // console.log('fnt url', fontUrl);
    const fontTOLoad = 'url('+fontUrl+')'

    const selectedFont = new FontFace('Font Regular', fontTOLoad);
    selectedFont.load().then(function(loaded_face) {
    document.fonts.add(loaded_face);
        document.body.style.fontFamily = '"Font Regular", Arial';
    }).catch( function (error) {
      // error occurred
    });
  }

  handleKeyUp(event) {
    const { apiResponse, setDisplayList } = this.props;
    let searchedData = [...apiResponse];
    let fontToSearch = event.currentTarget.value.toString();
    console.log('keydown>>>', fontToSearch);
    if (event.key === 'Enter') {
      console.log('enter press here! ', searchedData);
      searchedData = searchedData.filter(function (item) {
        return item.family.includes(fontToSearch);
      });
      console.log(searchedData);
      setDisplayList(searchedData);
    }
  }

  render() {
    const { displayList } = this.props;
    const { selectedFont } = this.state;
    console.log('api res>', displayList);
    if (!displayList) {
      return '';
    }
    return (
      // eslint-disable-next-line
      <div className="fonts-list-container">
        {/* <SearchList searchedItem = {() => this.searchedString()}></SearchList> */}
        <div className="search-container">
          <input onKeyUp={this.handleKeyUp} placeholder="Search font" />
        </div>
        <div className="fonts-list">
          <ul className="font-list-elem">
            {
              displayList.map((elem, index) => (
                <li key={index} className="list-item" onClick={() => this.showSelectedFont(elem)}>{elem.family}</li>
              ))
            }
          </ul>
        </div>
        <div className="selectedFontDetails_container">
          {
            (selectedFont !== '') && (
              selectedFont.variants.map((elem, ind) => (
                <div key={ind} className="selectedFontDetails">
                  <div className="font-variant-label ">{elem}</div>
                  <div className="font-example-1"> Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj</div>
                </div>
              )

              )
            )

          }
        </div>
      </div>
    );
  }
}

export default DisplayList;
