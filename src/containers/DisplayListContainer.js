import { connect } from 'react-redux';
import DisplayList from '../components/DisplayList';
import { setResponseInStore, setWelcomeModal, listToDisplay } from '../actions';


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    apiResponse: state.apiResponse,
    filtersData: state.filtersData,
    displayList: state.displayList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setResponseInStore: (data) => {
      dispatch(setResponseInStore(data));
    },
    setDisplayList: (data) => {
      dispatch(listToDisplay(data));
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
