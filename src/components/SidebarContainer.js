import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false,
    };
    this.openSideBar = this.openSideBar.bind(this);
  }

  openSideBar() {
    const { showSideBar } = this.state;
    const currentState = showSideBar;
    this.setState({
      showSideBar: !currentState,
    });
  }

  render() {
    const { showSideBar } = this.state;
    return (
      // eslint-disable-next-line
      <div className="side-bar-container">
        <div className={`side-bar-icon ${showSideBar ? 'active' : ''}`} onClick={this.openSideBar} />
        { showSideBar && (
          <div className="sideBarWrapper">
            <div className="sideBarElems">
              <div className="label-text"> Choose the filters</div>
              <div className="choose-filter-button">Show Result</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SidebarContainer;
