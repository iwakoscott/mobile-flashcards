import {
  FETCH_DECKS,
  FETCH_DECKS_SUCCESS,
  FETCH_DECKS_FAIL,
  ADD_DECK,
  ADD_DECK_SUCCESS,
  ADD_DECK_FAIL
} from "../actions/decks";

const initialState = {
  data: {},
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
        data: {
          ...state.data,
          ...action.decks
        }
      };
    case FETCH_DECKS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case ADD_DECK:
      return {
        ...state,
        error: null
      };
    case ADD_DECK_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.deck
        }
      };
    case ADD_DECK_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
