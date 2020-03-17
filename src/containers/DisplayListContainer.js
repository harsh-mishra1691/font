import { connect } from 'react-redux';
import DisplayList from '../components/DisplayList';
import { setResponseInStore, setWelcomeModal } from '../actions';


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    apiResponse: state.apiResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setResponseInStore: (data) => {
      dispatch(setResponseInStore(data));
    },
    setWelcomeModal: (data) => {
      // dispatch(setWelcomeModal(data));
    },
  };
};

const DisplayListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayList);

export default DisplayListContainer;
