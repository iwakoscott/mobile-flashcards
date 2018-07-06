import {
  FETCH_CARDS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAIL,
  ADD_CARD,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  DELETE_CARD,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAIL
} from "../actions/cards";

import { decouple } from "../utils/tools";

const initialState = {
  data: {},
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
        data: {
          ...state.data,
          ...action.cards
        }
      };
    case FETCH_CARDS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case ADD_CARD:
      return {
        ...state,
        error: null
      };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.card.cardId]: action.card
        }
      };
    case ADD_CARD_FAIL:
      return {
        ...state,
        error: action.error
      };
    case DELETE_CARD:
      return {
        ...state,
        error: null
      };
    case DELETE_CARD_SUCCESS:
      return {
        ...decouple(state)(action.cardId)
      };
    case DELETE_CARD_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
