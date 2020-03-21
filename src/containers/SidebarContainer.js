import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { filterData } from '../actions';


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    // apiResponse: state.apiResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterData: (data) => {
      dispatch(filterData(data));
    },
  };
};

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

export default SidebarContainer;
