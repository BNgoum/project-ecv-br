import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { requestSetScore, requestUpdateMatch } from '../../Store/Reducers/BetRoom/action';
import { requestGetMatch } from '../../Store/Reducers/Match/action';

export default class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreHomeTeam: this.props.data.scoreHomeTeamInputUser,
            scoreAwayTeam: this.props.data.scoreAwayTeamInputUser,
            isDisabled : true,
            isBegin: false,
            statut: "Pas débuté"
        }
    }

    componentDidMount() {
        const statut = this.props.data.statut;
        if ( statut === "IN_PLAY" || statut === "LIVE" || statut === "PAUSED") {
            this.setState({isBegin: true, statut: "En cours"})
        } else if (statut === "FINISHED") {
            this.setState({isBegin: true, statut: "Terminée"})
        }
    }

    // On calcul le total des points gagné en fonction du pari
    calculPoints = () => {
        const scoreHTBet = this.props.data.scoreHomeTeamInputUser;
        const scoreATBet = this.props.data.scoreAwayTeamInputUser;
        const scoreHTFinal = this.props.data.scoreHomeTeam;
        const scoreATFinal = this.props.data.scoreAwayTeam;
        const gagnant = this.props.data.gagnant;

        // Si le score parié est égale au score final = 3 points
        if (scoreHTBet === scoreHTFinal && scoreATBet === scoreATFinal) {

        } else if ( scoreATBet === scoreHTBet && gagnant === "DRAW") {
            // En cas de match nul = 1 points
        } else if ( scoreATBet > scoreHTBet && gagnant === "AWAY_TEAM") {
            // Si l'équipe à l'extérieur est gagnante = 1 point

        } else if ( scoreATBet < scoreHTBet && gagnant === "HOME_TEAM") {
            // Si l'équipe à domicile est gagnante = 1 point

        }
    }

    // updateMatch = () => {
    //     return new Promise((resolve, reject) => {
    //         const matchId = this.props.data._id;
    //         resolve(requestGetMatch(matchId))
    //     })
    //     .then(data => {
    //         const match = data.data.data;
    //         const userId = this.props.userId;
    //         const typeParticipant = this.props.typeParticipant;
    //         const betRoomId = this.props.betRoom._id;
    //         const matchId = this.props.data._id;
    //         const homeTeamScore = match.score.fullTime.homeTeam;
    //         const awayTeamScore = match.score.fullTime.homeTeam;
    //         const statut = match.status;

    //         if ( statut === "IN_PLAY" || statut === "LIVE" || statut === "PAUSED" || statut === "FINISHED") {
    //             this.setState({isBegin: true})
    //         }

    //         return requestUpdateMatch(userId, typeParticipant, betRoomId, matchId, homeTeamScore, awayTeamScore, statut)
    //     })
    //     .catch((error) => console.log('Erreur de la promise updateMatch (BetRoom/Match.js) : ', error))
    // }

    handleOnPressScore = (type, team) => {
        if ( type === "plus" && team === "scoreHomeTeam" ) {
            this.setState({ scoreHomeTeam: this.state.scoreHomeTeam + 1, isDisabled: false })
        } else if ( type === "plus" && team === "scoreAwayTeam" ) {
            this.setState({ scoreAwayTeam: this.state.scoreAwayTeam + 1, isDisabled: false })
        } else if ( type === "moins" && team === "scoreAwayTeam" ) {
            if ( this.state.scoreAwayTeam > 0 )
                this.setState({ scoreAwayTeam: this.state.scoreAwayTeam - 1, isDisabled: false })
        } else {
            if ( this.state.scoreHomeTeam > 0 )
                this.setState({ scoreHomeTeam: this.state.scoreHomeTeam - 1, isDisabled: false })
        }
    }

    handleOnPressValidate = () => {
        return new Promise((resolve, reject) => {
            const userId = this.props.userId;
            const typeParticipant = this.props.typeParticipant;
            const betRoomId = this.props.betRoom._id;
            const matchId = this.props.data._id;
            const homeTeamScore = this.state.scoreHomeTeam;
            const awayTeamScore = this.state.scoreAwayTeam;

            resolve(requestSetScore(userId, typeParticipant, betRoomId, matchId, homeTeamScore, awayTeamScore))
        })
        .then(() => this.setState({ isDisabled: true }))
        .catch((error) => console.log('Erreur de la promise handleOnPressValidate (Match.js) : ', error))
    }

    render() {
        return (
            <View style={styles.wrapperMatch}>
                <View style={styles.wrapperDate}>
                    <Text style={styles.dateMatch}>{this.props.data.dateMatch}</Text>
                    <Text style={styles.heureMatch}>{this.props.data.heureMatch}</Text>
                </View>
                <View style={styles.wrapperTeams}>
                    <Text style={styles.nameTeam}>{this.props.data.homeTeam}</Text>
                    <Text style={styles.versusText}>VS</Text>
                    <Text style={styles.nameTeam}>{this.props.data.awayTeam}</Text>
                </View>
                <View style={styles.wrapperScore}>
                    <View style={styles.wrapperTeamScore}>
                        {
                            this.state.isBegin ? null : 
                            <TouchableOpacity onPress={ () => this.handleOnPressScore("moins", "scoreHomeTeam") } style={ styles.wrapperButtonScore }>
                                <Text style={styles.buttonScore}>-</Text>
                            </TouchableOpacity>
                        }

                        <Text style={styles.teamScore}>{this.state.scoreHomeTeam}</Text>

                        {
                            this.state.isBegin ? null : 
                            <TouchableOpacity onPress={ () => this.handleOnPressScore("plus", "scoreHomeTeam") } style={ styles.wrapperButtonScore }>
                                <Text style={styles.buttonScore}>+</Text>
                            </TouchableOpacity>
                        }
                        
                    </View>

                    <Text style={styles.versusText}>|</Text>

                    <View style={styles.wrapperTeamScore}>
                        {
                            this.state.isBegin ? null : 
                            <TouchableOpacity onPress={ () => this.handleOnPressScore("moins", "scoreAwayTeam") } style={ styles.wrapperButtonScore }><Text style={styles.buttonScore}>-</Text></TouchableOpacity>
                        }

                        <Text style={styles.teamScore}>{this.state.scoreAwayTeam}</Text>
                        
                        {
                            this.state.isBegin ? null : 
                            <TouchableOpacity onPress={ () => this.handleOnPressScore("plus", "scoreAwayTeam") } style={ styles.wrapperButtonScore }><Text style={styles.buttonScore}>+</Text></TouchableOpacity>
                        }
                    </View>
                </View>

                {
                    this.state.statut === "Terminée" && 
                    <View>
                        <Text style={ styles.titleScoreFinal }>Score final</Text>
                        <View style={ styles.wrapperScoreFinal }>
                            <Text style={styles.teamScore}>{this.props.data.scoreHomeTeam}</Text>
                            <Text>|</Text>
                            <Text style={styles.teamScore}>{this.props.data.scoreAwayTeam}</Text>
                        </View>
                    </View>
                }
                
                {
                    !this.state.isBegin && 
                    <TouchableOpacity onPress={this.handleOnPressValidate} style={[styles.buttonValidatePronostic, this.state.isDisabled ? styles.isDisabled : null]} disabled={this.state.isDisabled}><Text>Valider le pronostic</Text></TouchableOpacity>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperMatch: {
        marginBottom: 16,
        marginTop: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 8,
        paddingLeft: 8,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    wrapperDate: {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center'
    },
    dateMatch: {
      fontSize: 13
    },
    wrapperTeams: {
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center'
    },
    nameTeam : {
        fontSize: 18,
        flex: 2,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    versusText: {
        marginLeft: 8,
        marginRight: 8,
        flex: 1,
        textAlign: 'center'
    },
    wrapperScore: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    wrapperTeamScore: {
        textAlign: 'center',
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamScore: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 12,
        marginLeft: 12
    },
    buttonScore: {
        fontSize: 24,
        marginRight: 8,
        marginLeft: 8,
    },
    wrapperButtonScore: {
        borderWidth: 1,
    },
    buttonValidatePronostic: {
        alignSelf: 'center',
        backgroundColor: '#ccc',
        padding: 8
    },
    isDisabled: {
        opacity: 0.4
    },
    wrapperScoreFinal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titleScoreFinal: {
        fontSize: 14,
        alignSelf: 'center'
    }
})