import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

const jwtDecode = require('jwt-decode');
import { requestUserInformation } from '../Store/Reducers/User/action';

import BetRoom from '../Components/BetRoom/BetRoom';
import { requestGetBetRoom } from '../Store/Reducers/BetRoom/action';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idsBetRoomOwner: [],
            betRoomOwner: [],
            idsBetRoomParticipant: [],
            betRoomParticipant: [],
        }
    }

    componentDidMount() {
        this.getBetRoom();
    }

    getInformationsUser = () => {
        const token = this.props.state.AuthenticationReducer.isLogin;

        const decoded = jwtDecode(token);

        return new Promise((resolve, reject) => {
            resolve(requestUserInformation(decoded.email))
        })
        .then((data) => {
            this.setState({
                idsBetRoomOwner: data.bet_room.owner,
                idsBetRoomParticipant: data.bet_room.participant
            })
        })
        .catch((error) => console.log('Erreur lors de la récupération des informations du user (Home.js) : ', error))
    }

    getBetRoom = () => {
        return new Promise((resolve, reject) => {
            resolve(this.getInformationsUser());
        })
        .then(() => {
            this.state.idsBetRoomOwner.map(idBetRoom => {
                return new Promise((resolve, reject) => {
                    resolve(requestGetBetRoom(idBetRoom));
                })
                .then(data => {
                    let currentBetRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
                    currentBetRoomOwner.push(data.data.data);

                    const action = { type: "ADD_OWNER_BET_ROOM", value: currentBetRoomOwner }
                    this.props.dispatch(action);
                })
            });
        })
        .then(() => {
            this.state.idsBetRoomParticipant.map(idBetRoom => {
                return new Promise((resolve, reject) => {
                    resolve(requestGetBetRoom(idBetRoom));
                })
                .then(data => {
                    let currentBetRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;
                    currentBetRoomParticipant.push(data.data.data);

                    const action = { type: "ADD_PARTICIPANT_BET_ROOM", value: currentBetRoomParticipant }
                    this.props.dispatch(action);
                })
            });
        })
        .catch((error) => console.log('Erreur lors de la récupération des bet room owner : ', error))
    }

    render() {
        
        const betroom = this.props.state.AuthenticationReducer;
        return (
            <View style={styles.wrapperContent}>
                <Text style={styles.title}>Bet Room en cours</Text>
                <Text style={styles.title}>Bet Room Admin :</Text>
                
                {
                    betroom.betRoomOwner.length > 0 ? 
                        <FlatList
                            data={ betroom.betRoomOwner }
                            keyExtractor={ (item) => item._id.toString() }
                            renderItem={ ({item}) => <BetRoom data={item} /> }
                        /> : null
                }

                <Text style={styles.title}>Bet Room Participant :</Text>

                {
                    betroom.betRoomParticipant.length > 0 ?
                        <FlatList
                            data={ betroom.betRoomParticipant }
                            keyExtractor={ (item) => item._id.toString() }
                            renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} /> }
                        /> : null
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