import {
  FETCH_DECKS,
  FETCH_DECKS_SUCCESS,
  FETCH_DECKS_FAIL
} from "../actions/decks";

const initialState = {
  data: [],
  error: null,
  isFetching: false
};

export default function decks(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case FETCH_DECKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.decks
      };
    case FETCH_DECKS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
