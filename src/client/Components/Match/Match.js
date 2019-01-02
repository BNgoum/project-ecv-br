import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

class Match extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
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
            <TouchableOpacity style={[styles.wrapperMatch, this.state.isActive ? styles.isActive : null]} onPress={this.handleOnPress}>
                <View style={styles.wrapperDate}>
                    <Text style={styles.dateMatch}>{this.props.matchs.dateMatch}</Text>
                    <Text style={styles.heureMatch}>{this.props.matchs.heureMatch}</Text>
                </View>
                <View style={styles.wrapperTeams}>
                    <Text style={styles.nameTeam}>{this.props.matchs.homeTeam}</Text>
                    <Text style={styles.versusText}>VS</Text>
                    <Text style={styles.nameTeam}>{this.props.matchs.awayTeam}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapperMatch: {
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 8,
        paddingLeft: 8,
        height: 100,
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
        textAlign: 'center'
    },
    versusText: {
        marginLeft: 8,
        marginRight: 8,
        flex: 1,
        textAlign: 'center'
    },
    isActive: {
        backgroundColor: "#ccc"
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