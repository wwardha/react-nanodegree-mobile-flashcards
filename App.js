import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Deck from './components/Deck';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { Constants } from 'expo';
import { white, purple, darkSlateBlue } from './utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TabNavigator, StackNavigator } from 'react-navigation';

function MobileStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 50,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MobileStatusBar backgroundColor={darkSlateBlue} barStyle="light-content"/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
