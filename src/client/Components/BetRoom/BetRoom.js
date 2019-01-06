import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

class BetRoom extends Component {
    handleOnPress = () => {
        return new Promise((resolve, reject) => {
            const action = { type: "SET_CURRENT_BET_ROOM", value: this.props.data }
            resolve(this.props.dispatch(action));
        })
        .then( () => this.props.navigation.navigate('BetRoomDetails') )
        .catch((error) => console.log('Erreur lors du handleOnPress (BetRoom.js) : ', error))
    }

    render() {
        return (
            <TouchableOpacity onPress={ this.handleOnPress } style={styles.wrapperContent}>
                <Text style={styles.title}>{ this.props.data.name }</Text>
                { 
                    this.props.data.betsNumber > 1 ? 
                    <Text>{ this.props.data.betsNumber } paris</Text> :
                    <Text>{ this.props.data.betsNumber } pari</Text>
                }
                <Text>{ this.props.data.participants.length + 1 } participants</Text>
                <Text>Récompense : { this.props.data.reward }</Text>
                { 
                    this.props.data.isBegin ? 
                    <Text>Statut: A débuté</Text> : 
                    <Text>Statut: Pas encore débuté</Text>
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        backgroundColor: '#ccc',
        padding: 16,
        margin: 8
    },
    title: {
        fontSize: 18
    }
})

const mapStateToProps = (state) => { return {state} }

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetRoom)