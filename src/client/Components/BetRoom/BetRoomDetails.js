import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class BetRoomDetails extends Component {

    render() {
        console.log('Props : ', this.props.navigation)
        return (
            <View style={styles.wrapperContent}>
                <Text style={ styles.title }>{ this.props.data.name }</Text>
                <Text>{ this.props.data.betsNumber } pari</Text>
                <Text>Récompense : { this.props.data.reward }</Text>
                { this.props.data.isBegin ? <Text>Statut: A débuté</Text> : <Text>Statut: Pas encore débuté</Text> }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        backgroundColor: '#ccc',
        padding: 16,
        margin: 8,
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontSize: 20
    }
})
