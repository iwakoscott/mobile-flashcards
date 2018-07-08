import { AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";
import { decouple } from "./tools";
import uuidv1 from "uuid/v1";

const DECKS_STORAGE_KEY = "DECKS_STORAGE_KEY:UDACITY";
const CARDS_STORAGE_KEY = "CARDS_STORAGE_KEY:UDACITY";
const NOTIFICATION_KEY = "NOTIFICATION_KEY:UDACITY";

function createNotification() {
  return {
    title: `👋 Don't forget to take your daily quiz!`,
    body: `Remember practice make perfect. Take your daily quiz right now!`,
    ios: {
      sound: true
    }
  };
}

// CARDS API
const CARDS_DATA = {
  ca0d517f4a684e59b84f99a1dcc47a4c: {
    cardId: "ca0d517f4a684e59b84f99a1dcc47a4c",
    question: "What is a React Element?",
    answer: "A React Element is an object representation of a DOM node.",
    timestamp: 1529967629409
  },
  "46a5165e44144b8d88688ada865f5232": {
    cardId: "46a5165e44144b8d88688ada865f5232",
    question: "What is a Component?",
    answer:
      "A React Component is a function or class that takes in props and returns a React Element.",
    timestamp: 1527980429409
  },
  "728478bf9cbb400784564f68f3c619fc": {
    cardId: "728478bf9cbb400784564f68f3c619fc",
    question: "Do you love React.js?",
    answer: "What kind of question is that? 😍 ⚛️",
    timestamp: 1527894029409
  },
  ac90ac8caa0d4d189bb559e1f19c5bcf: {
    cardId: "ac90ac8caa0d4d189bb559e1f19c5bcf",
    question: "What is Paddington's Aunt's name?",
    answer: "Aunt Lucy 🐻",
    timestamp: 1525734029409
  },
  "9e615313343949008d33f6242ddc9bcb": {
    cardId: "9e615313343949008d33f6242ddc9bcb",
    question: "What is Paddington's favorite food?",
    answer: "Marmalade Sandwiches 🍊",
    timestamp: 1524783629409
  },
  "9f37a15769924fc6983f77b0d4de8f53": {
    cardId: "9f37a15769924fc6983f77b0d4de8f53",
    question: "The backside has a typo.",
    answer: "Your looking right at it!",
    timestamp: 1530913044752
  }
};

const DECKS_DATA = {
  e169c6a8bd0f4a8b8c7f1d61f9bdf6d4: {
    deckId: "e169c6a8bd0f4a8b8c7f1d61f9bdf6d4",
    title: "React",
    timestamp: 1530675271926,
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
    cards: ["9f37a15769924fc6983f77b0d4de8f53"]
  },
  "27ddaa32993841d0ad3f4ab8e8ece116": {
    deckId: "27ddaa32993841d0ad3f4ab8e8ece116",
    title: "Paddington Trivia",
    timestamp: 1530243358186,
    cards: [
      "ac90ac8caa0d4d189bb559e1f19c5bcf",
      "9e615313343949008d33f6242ddc9bcb"
    ]
  },
  "734a04709ad848119a593dae97f4cbd5": {
    deckId: "734a04709ad848119a593dae97f4cbd5",
    title: "Marked for Deletion",
    timestamp: 1108248107217,
    cards: []
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
      : JSON.parse(results);
  });
}

export function fetchCards() {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(results => {
    return results === null
      ? setDummyData("CARDS", CARDS_STORAGE_KEY)
      : JSON.parse(results);
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
    .then(() => deck);
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

export function removeCard(cardId, deckId) {
  // TODOS: delete card from CARD_STORAGE
  const updateCardStorage = AsyncStorage.getItem(CARDS_STORAGE_KEY).then(
    results => {
      const oldState = JSON.parse(results);
      AsyncStorage.setItem(
        CARDS_STORAGE_KEY,
        JSON.stringify(decouple(oldState)(cardId))
      );
    }
  );

  // TODOS: delete cardId from DECK_STORAGE
  const updateDeckStorage = AsyncStorage.getItem(DECKS_STORAGE_KEY).then(
    results => {
      const oldState = JSON.parse(results);
      AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          ...oldState,
          [deckId]: {
            ...oldState[deckId],
            cards: oldState[deckId].cards.filter(id => id !== cardId)
          }
        })
      );
    }
  );

  return Promise.all([updateCardStorage, updateDeckStorage]).then(() => ({
    cardId,
    deckId
  }));
}

export function updateCard(card) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(results => {
      const oldState = JSON.parse(results);
      AsyncStorage.setItem(
        CARDS_STORAGE_KEY,
        JSON.stringify({
          ...oldState,
          [card.cardId]: card
        })
      );
    })
    .then(() => card);
}

// NOTIFICATION API

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();
              // let tomorrow = new Date();
              // tomorrow.setDate(tomorrow.getDate() + 0);
              // tomorrow.setHours(16);
              // tomorrow.setMinutes(34);
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(10);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: "day"
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
          .catch(error => alert(JSON.stringify(error.sourceURL)));
      }
    });
}
