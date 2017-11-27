import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform } from 'react-native';
import AnimatedDeck from './AnimatedDeck';
import AddCard from './AddCard';
import Quiz from './Quiz';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/api';
import { gainsboro, purple, white } from '../utils/colors';

class Deck extends Component {
    state = {
        screen: 'Home'
    }

    static navigationOptions = ({ navigation }) => {   
        const { deckTitle } = navigation.state.params; 
        return {
            title: deckTitle
        };
    }

    addCard = () => {
        this.setDeckTile('Add Card');
        this.setScreen('AddCard');           
    }

    startQuiz = () => {
        this.setDeckTile('Quiz');
        this.setScreen('Quiz');                   
    }
    
    backToDeck = () => {
        const { title } = this.props;

        this.setDeckTile(title);
        this.setScreen('Home'); 
    }

    submitCard = (question, answer) => {
        if ((question.trim() === '') || (answer.trim() === '')) return;
        const { id, title } = this.props;

        const card = { question: question, answer: answer }
        this.props.dispatch(addCard(id, title, card));
        addCardToDeck(id, card);    

        this.setDeckTile(title);
        this.setScreen('Home');       
    }

    setScreen = (name) => {
        this.setState(() => ({screen: name}));  
    }

    setDeckTile = (title) => {
        this.props.navigation.setParams({deckTitle: title});
    }

    render() {
        const { screen } = this.state
        const { decks, id } = this.props;

        let deck = decks.filter((item) => item.id === id)[0];
        let count = deck.questions.length;

        return (
            <View style={styles.container}>
                {screen === 'Home' &&
                    <AnimatedDeck title={deck.title} count={count} addCard={this.addCard} startQuiz={this.startQuiz} />
                }
                {screen === 'AddCard' &&
                    <AddCard title={deck.title} submitCard={this.submitCard} />
                }
                {screen === 'Quiz' &&
                    <Quiz title={deck.title} card={deck.questions} backToDeck={this.backToDeck} />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gainsboro
    }
})

function mapStateToProps (decks, { navigation }) {
    const { id, title, deckTitle } = navigation.state.params;
    return {
        decks,
        id, 
        title,
        deckTitle
    };
}

export default connect(mapStateToProps)(Deck)