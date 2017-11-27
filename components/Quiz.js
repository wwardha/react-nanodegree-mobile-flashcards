import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { gainsboro, purple, white, red, limeGreen } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helper';

function ShowAnswerBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Show Answer</Text>
        </TouchableOpacity>
    );
}

function CorrectBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? [styles.iosSubmitBtn,{ backgroundColor: limeGreen}] : [styles.AndroidSubmitBtn,{ backgroundColor: limeGreen}]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>
    );
}

function IncorrectBtn ({ onPress }) {
    return (
        <TouchableOpacity
        style={Platform.OS === 'ios' ? [styles.iosSubmitBtn,{ backgroundColor: red}] : [styles.AndroidSubmitBtn,{ backgroundColor: red}]}
        onPress={onPress}>
            <Text style={styles.submitBtnText}>Incorrect</Text>
        </TouchableOpacity>
    );
}

function RestartQuizBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Restart Quiz</Text>
        </TouchableOpacity>
    );
}

function BackToDeckBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Back to Deck</Text>
        </TouchableOpacity>
    );
}

class Quiz extends Component {
    state = {
        index: 0,
        screen: 'Question',
        correct: 0,
        incorrect: 0
    }

    setupNotification = () => {
        clearLocalNotification()
            .then(setLocalNotification(1));                
    }

    render() {
        const { title, card, backToDeck } = this.props;
        const { index, screen, correct, incorrect } = this.state;

        let counter = '(' + (index + 1 ) + ' / ' + card.length + ')';
        let question = card[index].question;
        let answer = card[index].answer;

        return (
            <View style={styles.container}>
                {screen === 'Question' &&
                    <View>
                    <Text style={styles.titleLabel}>{title}</Text> 
                    <Text style={styles.titleCounter}>{counter}</Text>            
                        <View style={styles.item}>
                            <Text style={[styles.titleAnswer,{ fontSize: 14, fontWeight: 'bold'}]}>Question</Text>
                            <Text style={styles.titleQuestion}>{question}</Text>  
                        </View> 
                        <ShowAnswerBtn onPress={() => {
                            this.setState( {screen: 'Answer'});
                        }} />    
                    </View>     
                }
                {screen === 'Answer' &&
                    <View>
                        <Text style={styles.titleLabel}>{title}</Text> 
                        <Text style={styles.titleCounter}>{counter}</Text>            
                        <View style={styles.item}>
                            <Text style={[styles.titleAnswer,{ fontSize: 14, fontWeight: 'bold'}]}>Answer</Text>
                            <Text style={styles.titleAnswer}>{answer}</Text>  
                        </View> 
                        <CorrectBtn onPress={() => {
                            let correctValue = correct + 1;
                            if (index < card.length-1)
                            {
                                let nextIndex = index + 1; 
                                this.setState( {screen: 'Question', index: nextIndex, correct: correctValue} );
                            }
                            else {
                                this.setupNotification();
                                this.setState( {screen: 'Result', correct: correctValue});
                            }
                        }} /> 
                        <IncorrectBtn onPress={() => {
                            let incorrectValue = incorrect + 1;
                            if (index < card.length-1)
                            {
                                let nextIndex = index + 1; 
                                this.setState( {screen: 'Question', index: nextIndex, incorrect: incorrectValue} );
                            }
                            else {
                                this.setupNotification();
                                this.setState( {screen: 'Result', incorrect: incorrectValue});
                            }
                        }} /> 
                    </View>     
                }
                {screen === 'Result' &&
                    <View>
                        <Text style={styles.titleLabel}>{title}</Text> 
                        <View style={styles.item}>
                            <Text style={styles.titlePercentage}>{((correct/card.length)*100).toFixed(1)} %</Text>
                            <Text style={[styles.titleLabel,{ fontSize: 16, marginBottom: 40 }]}>correct {card.length > 1 ? 'answers' : 'answer'}</Text> 
                            <Text style={styles.titleResult}>Correct answers = {correct}</Text>
                            <Text style={styles.titleResult}>Incorrect answers = {incorrect}</Text>
                        </View>
                        <RestartQuizBtn onPress={() => {
                            this.setState( {screen: 'Question', index: 0, correct: 0, incorrect: 0} );
                        }} />
                        <BackToDeckBtn onPress={() => {
                            backToDeck();
                        }} />
                    </View>
                }
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
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 10 : 5,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        marginBottom: 10,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    titleLabel: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center'
    },
    titleCounter: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    titleQuestion: {
        fontSize: 16,
        padding: 10,
        textAlign: 'center'
    },
    titleAnswer: {
        fontSize: 16,
        padding: 10,
        textAlign: 'center'
    },
    titlePercentage: {
        fontSize: 40,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center'
    },
    titleResult: {
        fontSize: 12,
        padding: 2,
        textAlign: 'center'
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

export default Quiz
