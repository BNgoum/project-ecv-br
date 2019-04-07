import React from 'react';
import { Font } from 'expo';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';

import Store from './src/Store/configureStore'

import Navigation from './src/Navigation/Navigation';
// import Authentification from './src/client/Navigation/Authentification';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      fontLoaded: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'pt-regular': require('./assets/fonts/PT_Sans-Web-Regular.ttf'),
      'pt-bold': require('./assets/fonts/PT_Sans-Web-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded &&
      <Provider store={Store}>
        <View style={ { flex: 1 } }>
          <StatusBar barStyle="light-content" translucent={true} />
          <Navigation />
        </View>
        
      </Provider>
    )
  }
}