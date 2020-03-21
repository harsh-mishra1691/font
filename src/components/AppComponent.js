import React from 'react';
import Header from './Header';
import DisplayListContainer from '../containers/DisplayListContainer';
import WelcomeModal from './WelcomeModal';
import SidebarContainer from '../containers/SidebarContainer';

// eslint-disable-next-line react/prefer-stateless-function
class AppComponent extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { showWelcomeModal } = this.props;
    console.log('show modal>', showWelcomeModal);
    return (
      // eslint-disable-next-line
      <div className="poc-app-wrapper">
        <div className="poc-activity-container">
          <Header />
          <DisplayListContainer />
          {showWelcomeModal && <WelcomeModal />}
          <SidebarContainer />
        </div>
      </div>
    );
  }
}

export default AppComponent;
