import { fetchCards, addCard } from "../utils/api";
export const FETCH_CARDS = "FETCH_CARDS";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAIL = "FETCH_CARDS_FAIL";
export const ADD_CARD = "ADD_CARD";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_CARD_FAIL = "ADD_CARD_FAIL";

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

function addCardSuccess(card) {
  return {
    type: ADD_CARD_SUCCESS,
    card
  };
}

function addCardFail(error) {
  return {
    type: ADD_CARD_FAIL,
    error
  };
}

export function fetchAndHandleCards() {
  return dispatch => {
    dispatch(fetchingCards());
    fetchCards()
      .then(cards => dispatch(fetchCardsSuccess(JSON.parse(cards))))
      .catch(() => dispatch(fetchCardsFail("Error fetching cards!")));
  };
}

export function handleAddCard(card) {
  return dispatch => {
    dispatch(addingCard());
    addCard(card)
      .then(result => dispatch(addCardSuccess(result)))
      .catch(() => dispatch(addCardFail(`Error adding card to Storage`)));
  };
}
