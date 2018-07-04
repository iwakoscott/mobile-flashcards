import { fetchCards } from "../utils/api";
export const FETCH_CARDS = "FETCH_CARDS";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAIL = "FETCH_CARDS_FAIL";

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

export function fetchAndHandleCards() {
  return dispatch => {
    dispatch(fetchingCards());
    fetchCards()
      .then(cards => dispatch(fetchCardsSuccess(JSON.parse(cards))))
      .catch(() => dispatch(fetchCardsFail("Error fetching cards!")));
  };
}
