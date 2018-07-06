import {
  FETCH_DECKS,
  FETCH_DECKS_SUCCESS,
  FETCH_DECKS_FAIL,
  ADD_DECK,
  ADD_DECK_SUCCESS,
  ADD_DECK_FAIL,
  DELETE_DECK,
  DELETE_DECK_SUCCESS,
  DELETE_DECK_FAIL,
  UPDATE_DECK,
  UPDATE_DECK_SUCCESS,
  UPDATE_DECK_FAIL
} from "../actions/decks";

import { ADD_CARD_SUCCESS, DELETE_CARD_SUCCESS } from "../actions/cards";

import { decouple } from "../utils/tools";

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
          [action.deck.deckId]: action.deck
        }
      };
    case ADD_DECK_FAIL:
      return {
        ...state,
        error: action.error
      };
    case DELETE_DECK:
      return {
        ...state,
        error: null
      };
    case DELETE_DECK_SUCCESS:
      return {
        ...state,
        data: {
          ...decouple(state.data)(action.deckId)
        }
      };
    case DELETE_DECK_FAIL:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_DECK:
      return {
        ...state,
        error: null
      };
    case UPDATE_DECK_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.deck.deckId]: action.deck
        }
      };
    case UPDATE_DECK_FAIL:
      return {
        ...state,
        error: action.error
      };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.deckId]: {
            ...state.data[action.deckId],
            cards: [action.card.cardId, ...state.data[action.deckId].cards]
          }
        }
      };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: state[action.deckId].cards.filter(id => id !== action.cardId)
        }
      };
    default:
      return state;
  }
}
