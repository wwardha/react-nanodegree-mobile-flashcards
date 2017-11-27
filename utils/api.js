import { AsyncStorage } from 'react-native';
import { setDefaultNotification, getDeckResults, FLASH_CARDS_STORAGE_KEY } from './_cards';

export function getDecks() {
    return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
        .then(setDefaultNotification)
        .then(getDeckResults);
}

export function getDeck(title) {
    return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            return data[title];
        })
}

export function saveDeckTitle(id, title) {
    var card = {[id]: {title: title, questions: []}};
    return AsyncStorage.mergeItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(card));    
}

export function addCardToDeck(id, card) {
    return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);

            let deck = data[id];
            let cards = deck.questions.concat(card);

            deck.questions = cards;
            data[id] = deck;

            AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(data));
        }
    );
}