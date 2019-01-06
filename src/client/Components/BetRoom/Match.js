import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreHomeTeam: 0,
            scoreAwayTeam: 0,
        }
    }

    handleOnPressScore = (type, team) => {
        if ( type === "plus" && team === "scoreHomeTeam" ) {
            this.setState({ scoreHomeTeam: this.state.scoreHomeTeam + 1 })
        } else if ( type === "plus" && team === "scoreAwayTeam" ) {
            this.setState({ scoreAwayTeam: this.state.scoreAwayTeam + 1 })
        } else if ( type === "moins" && team === "scoreAwayTeam" ) {
            if ( this.state.scoreAwayTeam > 0 )
                this.setState({ scoreAwayTeam: this.state.scoreAwayTeam - 1 })
        } else {
            if ( this.state.scoreHomeTeam > 0 )
                this.setState({ scoreHomeTeam: this.state.scoreHomeTeam - 1 })
        }
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
                        <TouchableOpacity onPress={ () => this.handleOnPressScore("moins", "scoreHomeTeam") } style={ styles.wrapperButtonScore }><Text style={styles.buttonScore}>-</Text></TouchableOpacity>
                        <Text style={styles.teamScore}>{this.state.scoreHomeTeam}</Text>
                        <TouchableOpacity onPress={ () => this.handleOnPressScore("plus", "scoreHomeTeam") } style={ styles.wrapperButtonScore }><Text style={styles.buttonScore}>+</Text></TouchableOpacity>
                    </View>

                    <Text style={styles.versusText}>|</Text>

                    <View style={styles.wrapperTeamScore}>
                        <TouchableOpacity onPress={ () => this.handleOnPressScore("moins", "scoreAwayTeam") } style={ styles.wrapperButtonScore }><Text style={styles.buttonScore}>-</Text></TouchableOpacity>
                        <Text style={styles.teamScore}>{this.state.scoreAwayTeam}</Text>
                        <TouchableOpacity onPress={ () => this.handleOnPressScore("plus", "scoreAwayTeam") } style={ styles.wrapperButtonScore }><Text style={styles.buttonScore}>+</Text></TouchableOpacity>
                    </View>
                </View>
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
        height: 150,
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
        marginTop: 16
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
    }
})