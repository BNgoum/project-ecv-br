import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'react-native-axios';
import Navigation from './src/client/Navigation/Navigation';

const apiHeaders = { 'X-Auth-Token': '74a86b94a67541189f94e8266901f6e4' }

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matchs: {}
    }
  }

  componentDidMount() {
    // fetch('http://192.168.1.81:3000/api/matchdujour?championnat=La Liga')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       let arrayMatchs = [];
    //       responseJson.matchs.forEach(match => {
    //         //console.log(match.awayTeam);
    //         arrayMatchs.push(match);
    //       });
    //       this.setState({
    //         matchs: arrayMatchs
    //       })
    //       // console.log(this.state.matchs)
    //       // return responseJson.matchs[0].awayTeam;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    
  }

  afficheMatch() {
    console.log('In affichematch', this.state.matchs[0])

      return (
        <View>
          <Text>Championnat : {this.state.matchs[0].championnat}</Text>
          <Text>Equipe à domicile : {this.state.matchs[0].homeTeam}</Text>
          <Text> VS </Text>
          <Text>Equipe à l'extérieur : {this.state.matchs[0].awayTeam}</Text>
        </View>
      )

  }

  render() {
    return (
      <Navigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
