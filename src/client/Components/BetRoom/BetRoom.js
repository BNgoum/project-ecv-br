import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

import { connect } from 'react-redux';

import { requestPointsBR } from '../../Store/Reducers/BetRoom/action';
import { requestUserInformationById } from '../../Store/Reducers/User/action';

import TextBold from '../../Components/Style/TextBold';
import TextRegular from '../../Components/Style/TextRegular';

import { Arrow } from '../../Images/icons';

class BetRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statut: "Pas débuté",
            arrayStatut: [],
            participants: [],
            ranking: {},
            reward: {},
            styleReward: {},
        }
    }

    componentDidMount() {
        this.setImage();

        const idUser = this.props.state.AuthenticationReducer.userInfo._id;

        return new Promise((resolve, reject) => {
            resolve(this.checkStatut())
        })
        .then(() => {
            if (this.state.statut === "Terminée") {
                let points = this.calculPointsMatch();

                // this.props.data.matchs.map(match => {
                //     points += match.points
                // })

                
                const typeParticipant = this.props.typeParticipant;
                const idBetRoom = this.props.data._id;

                return new Promise((resolve, reject) => {
                    resolve(requestPointsBR(idUser, typeParticipant, idBetRoom, points))
                })

            }
        })
        .then(() => {
            // this.setParticipantsName();
        })
        .then(() => {
            this.checkStatutParticipant();
        })
    }

    setParticipantsName = () => {
        //const idUser = this.props.state.AuthenticationReducer.userInfo._id;

        // On récupère tous les participant de la bet room courante et les ajoutent dans le state participants
        let promiseParticipants = this.props.data.participants.map(participant => {
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

        // Une fois qu'on a récupéré tous les participants de la bet room, on calcul les points gagné
        Promise.all(promiseParticipants).then(() => {
            const idCurrentBetRoom = this.props.data._id;

            this.state.participants.map(participant => {
                let totalPoints = 0;
                
                // Si le participant est l'owner de la Bet Room
                if ( this.props.data.owner === participant._id) {
                    participant.bet_room.owner.map(betroom => {
                        if ( idCurrentBetRoom == betroom._id) {
                            console.log('ça match !')
                        }
                    })
                } else {
                    participant.bet_room.participant.map(betroom => {
                        // Si la bet room mapper correspond à la bet room actuelle, on calcul les points gagnés
                        if ( idCurrentBetRoom === betroom._id) {
                            const pointsRecup = this.calculPointsMatchGenerique(betroom.matchs);
                            
                            totalPoints += pointsRecup;
                            this.setState({
                                ranking: { [participant.pseudo]: pointsRecup }
                            })
                        }
                    })
                }
                // console.log('Ranking : ', this.state.ranking)
                // console.log('Points total pour le participant : ', participant.pseudo, ', il a eu : ', totalPoints, ', dans la bet room : ', idCurrentBetRoom)
            })
        });
    }

    calculPointsMatchGenerique = (matchs) => {
        let points = 0;

        matchs.map(match => {
            // console.log('Un match : ', match)
            const scoreHTBet = match.scoreHomeTeamInputUser;
            const scoreATBet = match.scoreAwayTeamInputUser;
            const scoreHTFinal = match.scoreHomeTeam;
            const scoreATFinal = match.scoreAwayTeam;
            const gagnant = match.gagnant;


            // Si le score parié est égale au score final = 3 points
            // En cas de match nul / pronostic gagnant réussi = 1 points
            if (scoreHTBet === scoreHTFinal && scoreATBet === scoreATFinal) { points += 3 }
            else if (
                scoreATBet === scoreHTBet && gagnant === "DRAW" ||
                scoreATBet > scoreHTBet && gagnant === "AWAY_TEAM" ||
                scoreATBet < scoreHTBet && gagnant === "HOME_TEAM"
            ) { points += 1 }
            else { points += 0 }
        })

        return points;
    }

    calculPointsMatch = () => {
        let points = 0;

        this.props.data.matchs.map(match => {
            const scoreHTBet = match.scoreHomeTeamInputUser;
            const scoreATBet = match.scoreAwayTeamInputUser;
            const scoreHTFinal = match.scoreHomeTeam;
            const scoreATFinal = match.scoreAwayTeam;
            const gagnant = match.gagnant;

            // Si le score parié est égale au score final = 3 points
            // En cas de match nul / pronostic gagnant réussi = 1 points
            if (scoreHTBet === scoreHTFinal && scoreATBet === scoreATFinal) { points += 3 }
            else if (
                scoreATBet === scoreHTBet && gagnant === "DRAW" ||
                scoreATBet > scoreHTBet && gagnant === "AWAY_TEAM" ||
                scoreATBet < scoreHTBet && gagnant === "HOME_TEAM"
            ) { points += 1 }
            else { points += 0 }
        })

        return points;
    }

    checkStatut = () => {
        // On récupère tous les status des matchs de cette Bet Room et on les stock dans le state
        const matchs = this.props.data.matchs;
        let promiseMatchs = matchs.map( match => {
            this.setState(prevState => ({
                arrayStatut: [...prevState.arrayStatut, match.statut]
            }))
        })

        // On vérifie le contenu du state et on modifie le statut en fonction de cela
        Promise.all(promiseMatchs).then(() => {
            if (this.state.arrayStatut.every( val => val === "FINISHED" ) )
                { this.setState({statut: "Terminée"}) }
            else if (this.state.arrayStatut.includes("IN_PLAY") || this.state.arrayStatut.includes("PAUSED") || this.state.arrayStatut.includes("FINISHED")) { this.setState({statut: "En cours"} )}
            else { this.setState({statut: "Pas débuté"}) }
        });
    }

    handleOnPress = () => {
        return new Promise((resolve, reject) => {
            const action = { type: "SET_CURRENT_BET_ROOM", value: this.props.data }
            //console.log('In BetRoom.js before dispatch current BR : ', this.props.data)
            resolve(this.props.dispatch(action));
        })
        .then( () => {
            const action = { type: "SET_TYPE_PARTICIPANT", value: this.props.typeParticipant }
            this.props.dispatch(action);

            this.props.navigation.navigate('BetRoomDetails');
        })
        .catch((error) => console.log('Erreur lors du handleOnPress (BetRoom.js) : ', error))
    }

    setImage = () => {
        const picto = this.props.data.reward;

        switch (picto) {
            case 'Gage':
                this.setState({ reward: require("../../Images/new_bet_room/gage.png"), styleReward: { width: 54, height: 31} })
                break;
            case 'Double les points':
                this.setState({ reward: require("../../Images/new_bet_room/double_points.png"), styleReward: { width: 56, height: 48} })
                break;
            case 'Un verre':
                this.setState({ reward: require("../../Images/new_bet_room/verre.png"), styleReward: { width: 49, height: 49} })
                break;
            case 'Restaurant':
                this.setState({ reward: require("../../Images/new_bet_room/restaurant.png"), styleReward: { width: 50, height: 50} })
                break;
        }
    }

    checkStatutParticipant = () => {
        // const currentId = this.props.state.AuthenticationReducer.userInfo._id;
        // const currentIdBetRoomOwner = this.props.data.owner;

        // if (currentId == currentIdBetRoomOwner) {
        //     this.setState({ participantStatut: "Admin" })
        // } else {
        //     this.setState({ participantStatut: "Participant" })
        // }

        const currentId = this.props.state.AuthenticationReducer.userInfo._id;
        const currentIdBetRoomOwner = this.props.data.owner;

        if (currentId == currentIdBetRoomOwner) {
            return "Admin"
        } else {
            return "Participant"
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={ this.handleOnPress } style={ styles.wrapperContent }>
                <View style={ styles.wrapperRight }>
                    <Image source={this.state.reward} style={ styles.iconRewards } resizeMode={"contain"} />
                    
                    <View>
                        <TextRegular style={styles.typeParticipant}>{ this.checkStatutParticipant() }</TextRegular>
                        <TextBold style={styles.title}>{ this.props.data.name }</TextBold>
                        {
                            this.props.data.betsNumber > 1 ? 
                            <TextRegular style={ styles.textBetsNumber }>{ this.props.data.betsNumber } paris</TextRegular> :
                            <TextRegular style={ styles.textBetsNumber }>{ this.props.data.betsNumber } pari</TextRegular>
                        }
                        <View style={ styles.wrapperParticipant }>
                            <Image style={ styles.iconParticipant } source={require('../../../../assets/images/tab_bar/participant.png')} resizeMode={"contain"}/>
                            <TextRegular style={ styles.secondText }> x { this.props.data.participants.length + 1 }</TextRegular>
                        </View>
                    </View>
                </View>

                <Arrow />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#242647',
        paddingVertical: 12,
        paddingRight: 15,
        paddingLeft: 30,
        marginBottom: 8,
        borderRadius: 7
    },
    wrapperRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
    },
    textBetsNumber: {
        fontSize: 12
    },
    typeParticipant: {
        fontSize: 12,
        color: '#6b6d8a',
        marginBottom: 12
    },
    iconRewards: {
        width: 55,
        height: 55,
        marginRight: 32
    },
    iconParticipant: {
        width: 11,
        height: 12
    },
    wrapperParticipant: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3
    },
    secondText: {
        fontSize: 12,
        color: '#6b6d8a'
    }
})

const mapStateToProps = (state) => { return {state} }

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetRoom)