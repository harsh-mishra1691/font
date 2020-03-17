import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    widthChange: state.widthChange,
    selectedCharacter: state.selectedCharacter,
    showWelcomeModal: state.showWelcomeModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export default AppContainer;
