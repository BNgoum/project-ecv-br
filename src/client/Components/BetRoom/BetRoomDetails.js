import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';

import { connect } from 'react-redux';

import { requestUserInformationById } from '../../Store/Reducers/User/action';
import Match from './Match'

class BetRoomDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: []
        }
    }

    componentDidMount() {
        this.setParticipantsName();
    }

    setParticipantsName = () => {
        const participants = this.props.state.AuthenticationReducer.currentBetRoom.participants;

        participants.map(participant => {
            return new Promise((resolve, reject) => {
                resolve(requestUserInformationById(participant));
            })
            .then(data => {
                this.setState(prevState => ({
                    participants: [...prevState.participants, data]
                }))
            })
            .catch((error) => console.log('Erreur du map de la fonction setParticipantsName (BetRoomDetails.js) : ', error))
        })
    }

    render() {
        const betRoomDetails = this.props.state.AuthenticationReducer.currentBetRoom;
        const userId = this.props.state.AuthenticationReducer.userInfo._id;
        const typeParticipant = this.props.state.AuthenticationReducer.typeParticipant;

        return (
            <View style={styles.wrapperContent}>
                <Text style={ styles.title }>{ betRoomDetails.name }</Text>

                <View style={ styles.wrapperBet }>
                    <Text>{ betRoomDetails.betsNumber } pari</Text>
                </View>

                <View style={ styles.wrapperReward }>
                    <Text>Récompense : { betRoomDetails.reward }</Text>
                </View>
                
                <View style={ styles.wrapperIsBegin }>
                    <Text>Statut: { betRoomDetails.statut }</Text>
                </View>

                <View style={ styles.wrapperParticipants }>
                    <Text>Les participants : </Text>
                    {
                        this.state.participants.length > 0 ?
                        <FlatList
                            data={ this.state.participants }
                            keyExtractor={ (item) => item._id.toString() }
                            renderItem={ ({item}) => <Text>{item.pseudo}</Text> }
                        /> :
                        null
                    }
                </View>
                

                <View style={ styles.wrapperMatchs }>
                    <Text>Les matchs</Text>
                    <ScrollView>
                        <FlatList
                            data={ betRoomDetails.matchs }
                            keyExtractor={ (item) => item._id.toString() }
                            renderItem={ ({item}) => <Match data={item} betRoom={betRoomDetails} userId={userId} typeParticipant={typeParticipant} /> }
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        backgroundColor: '#ccc',
        padding: 16,
        margin: 8,
        flex: 1
    },
    title: {
        fontSize: 20,
        alignSelf: 'center'
    },
    wrapperBet: {
        marginTop: 8,
        marginBottom: 8,
    },
    wrapperReward: {
        marginTop: 8,
        marginBottom: 8,
    },
    wrapperIsBegin: {
        marginTop: 8,
        marginBottom: 8,
    },
    wrapperParticipants: {
        marginTop: 8,
        marginBottom: 8,
    },
    wrapperMatchs: {
        flex: 2
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

export default connect(mapStateToProps)(BetRoomDetails)