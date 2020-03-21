export const SHOW_SCREEN = 'SHOW_SCREEN';
export const WIDTH_CHANGE = 'WIDTH_CHANGE';
export const SET_CHARACTER = 'SET_CHARACTER';
export const SET_RESPONSE = 'SET_RESPONSE';
export const HIDE_WELCOME_MODAL = 'HIDE_WELCOME_MODAL';
export const SORT_BY_FILTER = 'SORT_BY_FILTER';
export const SET_LIST_DATA = 'SET_LIST_DATA';


export const widthChange = (data) => {
  return { type: WIDTH_CHANGE, data };
};

export const setScreen = (data) => {
  return { type: SHOW_SCREEN, data };
};

export const setCharacter = (data) => {
  return { type: SET_CHARACTER, data };
};

export const setResponseInStore = (data) => {
  return { type: SET_RESPONSE, data };
};

export const listToDisplay = (data) => {
  return { type: SET_LIST_DATA, data };
};

export const setWelcomeModal = (data) => {
  return { type: HIDE_WELCOME_MODAL, data };
};

export const filterData = (data) => {
  return { type: SORT_BY_FILTER, data};
};
