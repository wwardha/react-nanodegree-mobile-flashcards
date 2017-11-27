import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

const receiveDecks = (state=[], action) => {
    let decks = action.decks; 
    let data = Object.keys(decks).map((key) => { 
        return decks[key]; }
    );

    let result = data.reduce((obj, item) => {
        let arr = {};
        arr['id'] = item.title.toLowerCase();
        arr['title'] = item.title;
        arr['questions'] = item.questions;
    
        obj.push(arr);
        return obj;
    }, [])

    return result;
}

const addDeck = (state=[], action) => {
    let deck = action.deck;
    let result = state.concat(deck);
    return result;
}

const addCard = (state=[], action) => {
    let id = action.id;
    let title = action.title;
    let card = action.card;

    let filteredDecks = state.filter((item) => item.id !== id);
    let currentDeck = state.filter((item) => item.id === id)[0];
    let questions = currentDeck.questions.concat(card);
    
    currentDeck.questions = questions;
    let result = filteredDecks.concat(currentDeck);

    return result;
}

function decks (state = [], action) {
  switch (action.type) {
    case RECEIVE_DECKS : return receiveDecks(state, action);
    case ADD_DECK : return addDeck(state, action);
    case ADD_CARD : return addCard(state, action);
    default : return state;
    }
}

export default decks