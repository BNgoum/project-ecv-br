import React from 'react';
import { Font } from 'expo';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import Store from './src/client/Store/configureStore'

import Navigation from './src/client/Navigation/Navigation';
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
        <Navigation style={ styles.container} />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151830'
  },
});
