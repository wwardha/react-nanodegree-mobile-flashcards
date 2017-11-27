import { AsyncStorage } from 'react-native';
import { setLocalNotification } from './helper';

export const FLASH_CARDS_STORAGE_KEY = 'MobileFlashCards';

function setDefaultDecks() {
    const decks = {
        react: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        javascript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    };

    AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(decks));

    return decks;
}

export function setDefaultNotification(results) {
    if (results === null) setLocalNotification(0);
    return results;
}

export function getDeckResults(results) {
    return results === null
        ? setDefaultDecks()
        : JSON.parse(results);
}