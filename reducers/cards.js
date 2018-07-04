import {
  FETCH_CARDS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAIL
} from "../actions/cards";

const initialState = {
  data: [],
  error: null,
  isFetching: false
};

export default function cards(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.cards
      };
    case FETCH_CARDS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
