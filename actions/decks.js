import { fetchDecks, addDeck } from "../utils/api";

export const FETCH_DECKS = "FETCH_DECKS";
export const FETCH_DECKS_SUCCESS = "FETCH_DECKS_SUCCESS";
export const FETCH_DECKS_FAIL = "FETCH_DECKS_FAIL";
export const ADD_DECK = "ADD_DECK";
export const ADD_DECK_SUCCESS = "ADD_DECK_SUCCESS";
export const ADD_DECK_FAIL = "ADD_DECK_FAIL";

function fetchingDecks() {
  return {
    type: FETCH_DECKS
  };
}

function fetchDecksSuccess(decks) {
  return {
    type: FETCH_DECKS_SUCCESS,
    decks
  };
}

function fetchDecksFail(error) {
  return {
    type: FETCH_DECKS_FAIL,
    error
  };
}

function addingDeck() {
  return {
    type: ADD_DECK
  };
}

function addDeckSuccess(deck) {
  return {
    type: ADD_DECK_SUCCESS,
    deck
  };
}

function addDeckFail(error) {
  return {
    type: ADD_DECK_FAIL,
    error
  };
}

export function fetchAndHandleDecks() {
  return dispatch => {
    dispatch(fetchingDecks());
    fetchDecks()
      .then(decks => dispatch(fetchDecksSuccess(JSON.parse(decks))))
      .catch(() => dispatch(fetchDecksFail("Error fetching Decks!")));
  };
}

export function handleAddDeck(deck) {
  return dispatch => {
    dispatch(addingDeck());
    addDeck(deck)
      .then(result => dispatch(addDeckSuccess(result)))
      .catch(error => dispatch(addDeckFail(error)));
  };
}
