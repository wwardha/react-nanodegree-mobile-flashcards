import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { white, purple } from '../utils/colors';

function AddCardBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Create New Question</Text>
        </TouchableOpacity>
    );
}

function StartQuizBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Start a Quiz</Text>
        </TouchableOpacity>
    );
}

class AnimatedDeck extends Component {
    state = {
        fadeValue: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(                  
          this.state.fadeValue,            
          {
            toValue: 1,                   
            duration: 3000,              
          }
        ).start();                        
    }
    
    render() {
        let { fadeValue } = this.state;
        let { title, count } = this.props;

        return (
            <Animated.View                 
                style={{ opacity: fadeValue }}
            >
                <View style={styles.item}>
                    <Text style={styles.itemTitle}>{title}</Text>
                    <Text style={styles.itemCardCount}>
                        {count !== null ? count : 0} 
                        {count !== null ? (count > 1 ? ' cards': ' card') : ' card'} 
                    </Text>
                </View>
                <AddCardBtn onPress={this.props.addCard} />
                <StartQuizBtn onPress={this.props.startQuiz} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
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
    itemTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20
    },
    itemCardCount: {
        textAlign: 'center',
        padding: 4,
        fontSize: 14
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

export default AnimatedDeck;
