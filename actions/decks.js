import { fetchDecks, addDeck, removeDeck, updateDeck } from "../utils/api";

export const FETCH_DECKS = "FETCH_DECKS";
export const FETCH_DECKS_SUCCESS = "FETCH_DECKS_SUCCESS";
export const FETCH_DECKS_FAIL = "FETCH_DECKS_FAIL";
export const ADD_DECK = "ADD_DECK";
export const ADD_DECK_SUCCESS = "ADD_DECK_SUCCESS";
export const ADD_DECK_FAIL = "ADD_DECK_FAIL";
export const DELETE_DECK = "DELETE_DECK";
export const DELETE_DECK_SUCCESS = "DELETE_DECK_SUCCESS";
export const DELETE_DECK_FAIL = "DELETE_DECK_FAIL";
export const UPDATE_DECK = "UPDATE_DECK";
export const UPDATE_DECK_SUCCESS = "UPDATE_DECK_SUCCESS";
export const UPDATE_DECK_FAIL = "UPDATE_DECK_FAIL";

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

function deletingDeck() {
  return {
    type: DELETE_DECK
  };
}

function deleteDeckSuccess(deckId) {
  return {
    type: DELETE_DECK_SUCCESS,
    deckId
  };
}

function deleteDeckFail(error) {
  return {
    type: DELETE_DECK_FAIL,
    error
  };
}

function updatingDeck() {
  return {
    type: UPDATE_DECK,
    error: null
  };
}

function updateDeckSuccess(deck) {
  return {
    type: UPDATE_DECK_SUCCESS,
    deck
  };
}

function updateDeckFail(error) {
  return {
    type: UPDATE_DECK_FAIL,
    error
  };
}

export function fetchAndHandleDecks() {
  return dispatch => {
    dispatch(fetchingDecks());
    fetchDecks()
      .then(decks => dispatch(fetchDecksSuccess(decks)))
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

export function handleDeleteDeck(deckId) {
  return dispatch => {
    dispatch(deletingDeck());
    removeDeck(deckId)
      .then(deckId => dispatch(deleteDeckSuccess(deckId)))
      .catch(() => dispatch(deleteDeckFail(`Error deleting deck: ${deckId}`)));
  };
}

export function handleUpdateDeck(deck) {
  return dispatch => {
    dispatch(updatingDeck());
    updateDeck(deck)
      .then(result => dispatch(updateDeckSuccess(result)))
      .catch(() =>
        dispatch(updateDeckFail(`Error updating deck: ${deck.deckId}`))
      );
  };
}
