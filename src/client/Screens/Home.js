import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import jwt_decode from 'jwt-decode';
import { requestUserInformation } from '../Store/Reducers/User/action';

import BetRoom from '../Components/BetRoom/BetRoom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            betRoomOwner: [],
            betRoomParticipant: [],
        }
    }

    componentDidMount() {
        this.getBetRoom();
    }

    getInformationsUser = () => {
        const token = this.props.state.AuthenticationReducer.isLogin;
        const decoded = jwt_decode(token);

        return new Promise((resolve, reject) => {
            resolve(requestUserInformation(decoded.email))
        })
        .then((data) => {
            this.setState({
                betRoomOwner: data.bet_room.owner,
                betRoomParticipant: data.bet_room.participant
            })
        })
        .catch((error) => console.log('Erreur lors de la récupération des informations du user (Home.js) : ', error))
    }

    getBetRoom = () => {
        return new Promise((resolve, reject) => {
            resolve(this.getInformationsUser());
        })
        .then(() => {
            this.state.betRoomOwner.map(betRoom => {
                let currentBetRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
                currentBetRoomOwner.push(betRoom);

                const action = { type: "ADD_OWNER_BET_ROOM", value: currentBetRoomOwner }
                this.props.dispatch(action);
            });
        })
        .then(() => {
            this.state.betRoomParticipant.map(betRoom => {
                let currentBetRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;
                currentBetRoomParticipant.push(betRoom);

                const action = { type: "ADD_PARTICIPANT_BET_ROOM", value: currentBetRoomParticipant }
                this.props.dispatch(action);
            });
        })
        .catch((error) => console.log('Erreur lors de la récupération des bet room owner : ', error))
    }

    render() {
        const betroom = this.props.state.AuthenticationReducer;
        return (
            <View style={styles.wrapperContent}>
                <Text style={styles.title}>Bet Room en cours</Text>
                
                {
                    betroom.betRoomOwner.length > 0 ? 
                        <View>
                            <Text style={styles.title}>Bet Room Admin :</Text>
                            <ScrollView style={ styles.wrapperBetRoom }>
                                <FlatList
                                    data={ betroom.betRoomOwner }
                                    keyExtractor={ (item) => item._id.toString() }
                                    renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="owner" /> }
                                /> 
                            </ScrollView>
                        </View>
                        : null
                }

                {
                    betroom.betRoomParticipant.length > 0 ?
                    <View>
                        <Text style={styles.title}>Bet Room Participant :</Text>
                        <ScrollView style={ styles.wrapperBetRoom }>
                            <FlatList
                                data={ betroom.betRoomParticipant }
                                keyExtractor={ (item) => item._id.toString() }
                                renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="participant" /> }
                            />
                        </ScrollView>
                    </View> 
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        flex: 1
    },
    title: {
        margin: 16,
        fontSize: 18
    },
    wrapperBetRoom: {
        maxHeight: 270
    }
})

const mapStateToProps = (state) => { 
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)