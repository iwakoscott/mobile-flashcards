import { AsyncStorage } from "react-native";
import { decouple } from "./tools";
import uuidv1 from "uuid/v1";

const DECKS_STORAGE_KEY = "DECKS_STORAGE_KEY";
const CARDS_STORAGE_KEY = "CARDS_STORAGE_KEY";

const CARDS_DATA = {
  ca0d517f4a684e59b84f99a1dcc47a4c: {
    cardId: "ca0d517f4a684e59b84f99a1dcc47a4c",
    question: "What is a React Element?",
    answer: "A React Element is an object representation of a DOM node."
  },
  "46a5165e44144b8d88688ada865f5232": {
    cardId: "46a5165e44144b8d88688ada865f5232",
    question: "What is a Component?",
    answer:
      "A React Component is a function or class that takes in props and returns a React Element."
  },
  "728478bf9cbb400784564f68f3c619fc": {
    cardId: "728478bf9cbb400784564f68f3c619fc",
    question: "Do you love React.js?",
    answer: "What kind of question is that? 😍 ⚛️"
  },
  ac90ac8caa0d4d189bb559e1f19c5bcf: {
    cardId: "ac90ac8caa0d4d189bb559e1f19c5bcf",
    question: "What is the capital of California?",
    answer: "Sacramento"
  },
  "9e615313343949008d33f6242ddc9bcb": {
    cardId: "9e615313343949008d33f6242ddc9bcb",
    question: "What is Scott's favorite movie series?",
    answer: "Paddington 🐻"
  }
};

const DECKS_DATA = {
  e169c6a8bd0f4a8b8c7f1d61f9bdf6d4: {
    deckId: "e169c6a8bd0f4a8b8c7f1d61f9bdf6d4",
    title: "React",
    timestamp: 1530675271926,
    topScore: 3,
    cards: [
      "ca0d517f4a684e59b84f99a1dcc47a4c",
      "46a5165e44144b8d88688ada865f5232",
      "728478bf9cbb400784564f68f3c619fc"
    ]
  },
  ac1183d4a5004d82ab3fee8715fbfe06: {
    deckId: "ac1183d4a5004d82ab3fee8715fbfe06",
    title: "Javascript",
    timestamp: 1525664158186,
    topScore: 0,
    cards: []
  },
  "27ddaa32993841d0ad3f4ab8e8ece116": {
    deckId: "27ddaa32993841d0ad3f4ab8e8ece116",
    title: "General",
    timestamp: 1530243358186,
    topScore: 0,
    cards: [
      "ac90ac8caa0d4d189bb559e1f19c5bcf",
      "9e615313343949008d33f6242ddc9bcb"
    ]
  }
};

function setDummyData(type, storageKey) {
  let data = {};
  switch (type) {
    case "DECKS":
      data = DECKS_DATA;
      break;
    case "CARDS":
      data = CARDS_DATA;
      break;
    default:
      break;
  }
  AsyncStorage.setItem(storageKey, JSON.stringify(data));
  return data;
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    return results === null
      ? setDummyData("DECKS", DECKS_STORAGE_KEY)
      : results;
  });
}

export function fetchCards() {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(results => {
    return results === null
      ? setDummyData("CARDS", CARDS_STORAGE_KEY)
      : results;
  });
}

export function addDeck(deck) {
  const { deckId } = deck;
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const oldState = JSON.parse(results);
      AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          ...oldState,
          [deckId]: deck
        })
      );
    })
    .then(() => ({
      [deckId]: deck
    }));
}

export function removeDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const oldState = JSON.parse(results);
      const { cards } = oldState[deckId]; // cards from the deleted deck

      // delete from DECKS_STORAGE
      const updateDecksStorage = AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(decouple(oldState)(deckId))
      );

      // but, we also need to delete from CARDS_STORAGE
      AsyncStorage.getItem(CARDS_STORAGE_KEY).then(results => {
        const oldCardsState = JSON.parse(results);
        const newCardsState = cards.reduce((acc, next) => {
          acc = decouple(acc)(next);
          return acc;
        }, oldCardsState);
        AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(newCardsState));
      });
    })
    .then(() => deckId);
}

export function updateDeck(deck) {
  const { deckId } = deck;
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const oldState = JSON.parse(results);
      AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          ...oldState,
          [deckId]: deck
        })
      );
    })
    .then(() => deck);
}

export function addCard(card, deckId) {
  const { cardId } = card;

  const updateCardsStorage = AsyncStorage.getItem(CARDS_STORAGE_KEY).then(
    results => {
      const oldState = JSON.parse(results);
      AsyncStorage.setItem(
        CARDS_STORAGE_KEY,
        JSON.stringify({
          ...oldState,
          [cardId]: card
        })
      );
    }
  );

  const updateDecksStorage = AsyncStorage.getItem(DECKS_STORAGE_KEY).then(
    results => {
      const oldState = JSON.parse(results);
      AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          ...oldState,
          [deckId]: {
            ...oldState[deckId],
            cards: [cardId, ...oldState[deckId].cards]
          }
        })
      );
    }
  );

  return Promise.all([updateCardsStorage, updateDecksStorage]).then(() => card);
}

export function generateUID() {
  return uuidv1().replace(/-/g, "");
}
