import { fetchCards, addCard, removeCard } from "../utils/api";
export const FETCH_CARDS = "FETCH_CARDS";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAIL = "FETCH_CARDS_FAIL";
export const ADD_CARD = "ADD_CARD";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_CARD_FAIL = "ADD_CARD_FAIL";
export const DELETE_CARD = "DELETE_CARD";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAIL = "DELETE_CARD_FAIL";

function fetchingCards() {
  return {
    type: FETCH_CARDS
  };
}

function fetchCardsSuccess(cards) {
  return {
    type: FETCH_CARDS_SUCCESS,
    cards
  };
}

function fetchCardsFail(error) {
  return {
    type: FETCH_CARDS_FAIL,
    error
  };
}

function addingCard() {
  return {
    type: ADD_CARD
  };
}

function addCardSuccess(card, deckId) {
  return {
    type: ADD_CARD_SUCCESS,
    card,
    deckId
  };
}

function addCardFail(error) {
  return {
    type: ADD_CARD_FAIL,
    error
  };
}

function deletingCard() {
  return {
    type: DELETE_CARD
  };
}

function deleteCardSuccess(cardId, deckId) {
  return {
    type: DELETE_CARD_SUCCESS,
    cardId,
    deckId
  };
}

function deleteCardFail(error) {
  return {
    type: DELETE_CARD_FAIL,
    error
  };
}

export function fetchAndHandleCards() {
  return dispatch => {
    dispatch(fetchingCards());
    fetchCards()
      .then(cards => dispatch(fetchCardsSuccess(cards)))
      .catch(() => dispatch(fetchCardsFail("Error fetching cards!")));
  };
}

export function handleAddCard(card, deckId) {
  return dispatch => {
    dispatch(addingCard());
    addCard(card, deckId)
      .then(result => dispatch(addCardSuccess(result, deckId)))
      .catch(() => dispatch(addCardFail(`Error adding card to Storage`)));
  };
}

export function handleDeleteCard(cardId, deckId) {
  return dispatch => {
    dispatch(deletingCard());
    removeCard(cardId, deckId)
      .then(({ cardId, deckId }) => dispatch(deleteCardSuccess(cardId, deckId)))
      .catch(() => dispatch(deleteCardFail(`Error deleting card.`)));
  };
}
