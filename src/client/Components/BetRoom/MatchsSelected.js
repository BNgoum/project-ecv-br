import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { requestCreateBetRoom } from '../../Store/Reducers/BetRoom/action';

class MatchsSelected extends Component {

    handleOnPress = () => {
        const betRoom = this.props.state.BetRoomReducer;

        return new Promise((resolve, reject) => {
            resolve(requestCreateBetRoom(betRoom.name, betRoom.owner, betRoom.participants, betRoom.reward, betRoom.matchs, betRoom.numberBets))
        })
        .then(() => this.props.navigation.navigate('Accueil'))
        .catch((error) => console.log('Erreur lors du handleOnPress MatchsSelected : ', error))
    }

    render() {
        const numberBets = this.props.state.BetRoomReducer.numberBets;
        return (
            <View style={styles.wrapperContent}>
                { numberBets > 1 ? 
                    <Text style={styles.label}>{numberBets} matchs sélectionnés</Text> :
                    <Text style={styles.label}>{numberBets} match sélectionné</Text>
                }
                <TouchableOpacity style={styles.buttonValidate} onPress={this.handleOnPress}>
                    <Text>Valider</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        backgroundColor: '#f7f7f7',
        padding: 16,
    },
    label: {
        fontSize: 18,
        alignSelf: 'center'
    },
    buttonValidate: {
        alignSelf: 'flex-end'
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

export default connect(mapStateToProps)(MatchsSelected)