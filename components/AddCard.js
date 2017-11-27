import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { gainsboro, purple, white } from '../utils/colors';

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    );
}

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    render() {
        const { submitCard, title } = this.props;
        const { question, answer } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.titleLabel}>{title}</Text>
                <TextInput
                    style={styles.titleText}
                    placeholder='Question'
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.text}
                />
                <TextInput
                    style={styles.titleText}
                    placeholder='Answer'
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.text}
                />
                <SubmitBtn onPress={() => {
                    submitCard(question, answer);
                }} />
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
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center'
    },
    titleText: {
        height: 40, 
        marginTop: 5,
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 5
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        marginTop: 10,
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


export default AddCard
