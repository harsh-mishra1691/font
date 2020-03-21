import React from 'react';
import configData from '../data/index';

// eslint-disable-next-line react/prefer-stateless-function
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false,
      filterData: '',
      disableResultsButton: true,
    };
    this.openSideBar = this.openSideBar.bind(this);
    this.showResultsFilter = this.showResultsFilter.bind(this);
    this.onInputchange = this.onInputchange.bind(this);
  }

  onInputchange(e) {
    console.log(e);
    this.setState({
      disableResultsButton: false,
    });
  }

  openSideBar() {
    const { showSideBar } = this.state;
    const currentState = showSideBar;
    this.setState({
      showSideBar: !currentState,
    });
  }

  showResultsFilter() {
    const { filterData } = this.props;
    const val = document.getElementById("sortByOrder").value;
    console.log(val, 'this');
    if (val !== 'Select') {
      filterData(val);
    }
  }

  render() {
    const { showSideBar, disableResultsButton } = this.state;
    return (
      // eslint-disable-next-line
      <div className="side-bar-container">
        <div className={`side-bar-icon ${showSideBar ? 'active' : ''}`} onClick={this.openSideBar} />
        { showSideBar && (
          <div className="sideBarWrapper">
            <div className="sideBarElems">
              <div className="label-text"> Choose filters</div>
              <div className="sortby-filter">
                <div>Sort By:</div>
                <select id="sortByOrder" onChange={(e) => this.onInputchange(e)}>
                  {
                    configData.sortbyFilter.map((elem, index) => (
                      <option key={index} value={elem}>{elem}</option>
                    ))
                  }
                  {/* <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option> */}
                </select>
              </div>
              <button type="button" className={`choose-filter-button ${disableResultsButton ? 'disabled' : ''}`} onClick={() => this.showResultsFilter()}>Show Result</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
