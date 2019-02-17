import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

class MatchInComing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            isBegin: false
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.wrapperMatch, this.state.isBegin && styles.isBegin]} disabled={this.state.isFinished}>
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchInComing)