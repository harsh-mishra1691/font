import { combineReducers } from 'redux';
// import activityConfig from './data/activityConfig';

import {
  SHOW_SCREEN,
  WIDTH_CHANGE,
  SET_CHARACTER,
  SET_RESPONSE,
  HIDE_WELCOME_MODAL,
  SORT_BY_FILTER,
  SET_LIST_DATA,
} from './actions';
// import { stat } from 'fs';

function widthChange(state = {}, action) {
  switch (action.type) {
    case WIDTH_CHANGE:
      return { ...action.data };
    default:
      return state;
  }
}

function activeScreen(state = 'video', action) {
  switch (action.type) {
    case SHOW_SCREEN:
      return action.data;
    default:
      return state;
  }
}

function selectedCharacter(state = 'none', action) {
  switch (action.type) {
    case SET_CHARACTER:
      return action.data;
    default:
      return state;
  }
}

function apiResponse(state = '', action) {
  switch (action.type) {
    case SET_RESPONSE:
      return action.data;
    default:
      return state;
  }
}

function displayList(state = '', action) {
  switch (action.type) {
    case SET_LIST_DATA:
      return action.data;
    default:
      return state;
  }
}

function showWelcomeModal(state = true, action) {
  switch (action.type) {
    case HIDE_WELCOME_MODAL:
      return action.data;
    default:
      return state;
  }
}

function filtersData(state = '', action) {
  switch (action.type) {
    case SORT_BY_FILTER:
      return action.data;
    default:
      return state;
  }
}

const reducers = combineReducers({
  widthChange,
  activeScreen,
  selectedCharacter,
  apiResponse,
  showWelcomeModal,
  filtersData,
  displayList,
});

export default reducers;
