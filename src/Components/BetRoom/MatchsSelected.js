import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { requestCreateBetRoom, requestAddOwner, requestAddParticipant } from '../../Store/Reducers/BetRoom/action';

import ButtonPrimaryText from '../Style/ButtonPrimaryText';
import ButtonPrimary from '../Style/ButtonPrimary';
import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';

class MatchsSelected extends Component {

    handleOnPress = () => {
        const betRoom = this.props.state.BetRoomReducer;

        return new Promise((resolve, reject) => {
            resolve(requestCreateBetRoom(betRoom.name, betRoom.owner, betRoom.participants, betRoom.reward, betRoom.matchs, betRoom.numberBets))
        })
        .then(response => {
            const idOwner = response.data.data.owner;
            const betRoom = response.data.data;
            const idsParticipants = response.data.data.participants;

            requestAddOwner(idOwner, betRoom);

            idsParticipants.forEach(idParticipant => {
                requestAddParticipant(idParticipant, betRoom)
            });

            let currentBetRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
            currentBetRoomOwner.push(response.data.data);

            const action = { type: "ADD_BET_ROOM_ON_GOING", value: response.data.data }
            this.props.dispatch(action);
        })
        .then(() => this.props.navigation.navigate('Accueil'))
        .catch((error) => console.log('Erreur lors du handleOnPress MatchsSelected : ', error))
    }

    render() {
        const numberBets = this.props.state.BetRoomReducer.numberBets;
        return (
            <View style={styles.container}>
                { numberBets > 1 ? 
                    <TextRegular style={styles.label}>
                        <TextBold style={styles.labelNumber}>{numberBets}</TextBold> matchs sélectionnés
                    </TextRegular> :
                    <TextRegular style={styles.label}>
                        <TextBold style={styles.labelNumber}>{numberBets}</TextBold> match sélectionné
                    </TextRegular>
                }
                {/* <TouchableOpacity style={styles.buttonValidate} onPress={this.handleOnPress}>
                    <Text>Valider</Text>
                </TouchableOpacity> */}

                <ButtonPrimary style={styles.buttonValidate} onPress={this.handleOnPress}>
                    <ButtonPrimaryText style={styles.buttonValidateText}>Créer</ButtonPrimaryText>
                </ButtonPrimary>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    label: {
        color: '#333',
        fontSize: 14,
        alignSelf: 'center'
    },
    buttonValidate: {
        padding: 0,
        width: 100,
    },
    buttonValidateText: {
        fontSize: 14
    },
    labelNumber: {
        color: '#333',
        fontSize: 16
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

export default connect(mapStateToProps)(MatchsSelected)