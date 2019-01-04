import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class BetRoom extends Component {
    handleOnPress = () => {
        return new Promise((resolve, reject) => {
            const action = { type: "SET_CURRENT_BET_ROOM", value: this.props.data }
            resolve(this.props.dispatch(action));
        })
        .then(() => {})
        .catch((error) => console.log('Erreur lors du handleOnPress (betroom.js) : ', error))
    }

    render() {
        console.log('Props : ', this.props.navigation)
        return (
            <TouchableOpacity style={styles.wrapperContent}>
                <Text>{ this.props.data.name }</Text>
                <Text>{ this.props.data.betsNumber } pari</Text>
                <Text>Récompense : { this.props.data.reward }</Text>
                { this.props.data.isBegin ? <Text>Statut: A débuté</Text> : <Text>Statut: Pas encore débuté</Text> }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        backgroundColor: '#ccc',
        padding: 16,
        margin: 8
    }
})
