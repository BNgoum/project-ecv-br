import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { requestGetMatch } from '../../Store/Reducers/Match/action';

import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';

class Match extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            isBegin: false
        }
    }

    // componentDidMount() {
    //     this.updateMatch();
    // }

    updateMatch = () => {
        return new Promise((resolve, reject) => {
            const matchId = this.props.matchs._id;
            resolve(requestGetMatch(matchId))
        })
        .then(data => {
            const statut = data.data.data.status;

            if ( statut === "IN_PLAY" || statut === "LIVE" || statut === "PAUSED" || statut === "FINISHED") {
                this.setState({isBegin: true})
            }
        })
        .catch((error) => console.log('Erreur de la promise updateMatch (Match/Match.js) : ', error))
    }

    handleOnPress = () => {
        return new Promise((resolve, reject) => {
            resolve(this.setState({isActive: !this.state.isActive}))
        })
        .then(() => {
            if(this.state.isActive) {
                // On incrémente le nombre de pari
                let currentNumberBets = this.props.state.BetRoomReducer.numberBets
                const actionAddNumberBets = { type: "ADD_NUMBER_BETS", value: currentNumberBets + 1 }
                this.props.dispatch(actionAddNumberBets);

                // On ajoute le pari à la liste de match choisi
                let currentMatchs = this.props.state.BetRoomReducer.matchs;
                currentMatchs.push(this.props.matchs)
                const actionAddMatch = { type: "ADD_MATCH", value: currentMatchs }
                this.props.dispatch(actionAddMatch);
            } else {
                // On décrémente le nombre de pari
                let currentNumberBets = this.props.state.BetRoomReducer.numberBets
                const actionDeleteNumberBets = { type: "DELETE_NUMBER_BETS", value: currentNumberBets - 1 }
                this.props.dispatch(actionDeleteNumberBets);

                // On retire le pari de la liste de match choisi
                let currentMatchs = this.props.state.BetRoomReducer.matchs;

                const index = currentMatchs.indexOf(this.props.matchs);
                if (index > -1) { currentMatchs.splice(index, 1); }

                const actionDeleteMatch = { type: "DELETE_MATCH", value: currentMatchs }
                this.props.dispatch(actionDeleteMatch);
            }
        })
        .catch((error) => console.log('Erreur lors du handleOnPress Match.js : ', error))
    }

    render() {
        return (
            <TouchableOpacity style={[styles.wrapperMatch, this.state.isActive && styles.isActive, this.state.isBegin && styles.isBegin]} onPress={this.handleOnPress} disabled={this.state.isFinished}>
                <View style={styles.wrapperDate}>
                    <TextRegular style={styles.dateMatch}>{this.props.matchs.dateMatch}</TextRegular>
                    <TextRegular style={styles.dateMatch}>{this.props.matchs.heureMatch}</TextRegular>
                </View>
                <View style={styles.wrapperTeams}>
                    <TextBold style={styles.nameTeam}>{this.props.matchs.homeTeam}</TextBold>
                    <TextRegular style={styles.versusText}>VS</TextRegular>
                    <TextBold style={styles.nameTeam}>{this.props.matchs.awayTeam}</TextBold>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapperMatch: {
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 0,
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 7,
        backgroundColor: '#282a4e',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: "#282a4e",
        borderWidth: 2
    },
    wrapperDate: {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center'
    },
    dateMatch: {
      fontSize: 11
    },
    wrapperTeams: {
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center'
    },
    nameTeam : {
        fontSize: 14,
        flex: 2,
        textAlign: 'center'
    },
    versusText: {
        marginLeft: 8,
        marginRight: 8,
        flex: 1,
        textAlign: 'center'
    },
    isActive: {
        borderColor: "#fff",
    },
    isBegin: {
        opacity: 0.4
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)