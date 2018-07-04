import { fetchDecks } from "../utils/api";

export const FETCH_DECKS = "FETCH_DECKS";
export const FETCH_DECKS_SUCCESS = "FETCH_DECKS_SUCCESS";
export const FETCH_DECKS_FAIL = "FETCH_DECKS_FAIL";

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

export function fetchAndHandleDecks() {
  return dispatch => {
    dispatch(fetchingDecks());
    fetchDecks()
      .then(decks => dispatch(fetchDecksSuccess(JSON.parse(decks))))
      .catch(() => dispatch(fetchDecksFail("Error fetching Decks!")));
  };
}
