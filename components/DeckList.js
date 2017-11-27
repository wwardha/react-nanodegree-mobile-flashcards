import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import { white, gainsboro } from '../utils/colors';
import { AppLoading } from 'expo';
import sortBy from 'sort-by'

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount () {
        const { dispatch } = this.props;

        getDecks()
        .then((decks) => dispatch(receiveDecks(decks)))
        .then(() => this.setState(() => ({ready: true})));
    } 

    render() {
        const { decks } = this.props;
        const { ready } = this.state;

        if (ready === false) {
            return <AppLoading />
        }

        decks.sort(sortBy('title'));  

        return (
            <ScrollView style={styles.container}>
                {decks.map((deck) => (
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate(
                            'Deck',
                            { id: deck.id, title: deck.title, deckTitle: deck.title }
                        )}
                        key={deck.title} 
                        style={styles.item}>
                        <Text style={styles.itemTitle}>{deck.title}</Text>
                        <Text style={styles.itemCardCount}>
                            {deck.questions !== null ? deck.questions.length : 0} 
                            {deck.questions !== null ? (deck.questions.length > 1 ? ' cards': ' card') : ' card'} 
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: gainsboro
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 10 : 5,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    itemTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    itemCardCount: {
        textAlign: 'center',
        padding: 4,
        fontSize: 14
    }
})

function mapStateToProps (decks) {
    return {
        decks
    };
}

export default connect(mapStateToProps)(DeckList)