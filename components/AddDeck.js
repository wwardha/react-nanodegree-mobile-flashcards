import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
import { gainsboro, purple, white } from '../utils/colors';

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
    );
}

class AddDeck extends Component {
    state = {
        text: ''
    }

    submit = () => {
        if (this.state.text.trim() === '') return;

        if (!this.isDeckExist(this.state.text)) {
            this.props.dispatch(addDeck({
                id: this.state.text.toLowerCase(),
                title: this.state.text,
                questions: []
            }));
    
            saveDeckTitle(this.state.text.toLowerCase(), this.state.text);    
            this.toDeck();    
        }
        else {
            this.toExisitngDeck();
        }
    }

    toDeck = () => {
        this.props.navigation.navigate('Deck',{ id: this.state.text.toLowerCase(), title: this.state.text, deckTitle: this.state.text });
        this.setState({text: ''});
    }

    toExisitngDeck = () => {
        const {decks} = this.props;
        let deck = decks.filter((deck) => deck.id === this.state.text.toLowerCase())[0];
        this.props.navigation.navigate('Deck',{ id: deck.id, title: deck.title });    
        this.setState({text: ''});    
    }

    isDeckExist = (title) => {
        const {decks} = this.props;
        let deck = decks.filter((deck) => deck.id === title.toLowerCase());

        return (deck.length > 0) ? true : false;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleLabel}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.titleText}
                    placeholder='Deck Title'
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <SubmitBtn onPress={this.submit} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: gainsboro
    },
    titleLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center'
    },
    titleText: {
        height: 40, 
        marginTop: 5,
        marginBottom: 20,
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 5
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

function mapStateToProps (decks) {
    return {
        decks
    };
}

export default connect(mapStateToProps)(AddDeck)
