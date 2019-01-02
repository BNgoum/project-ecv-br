import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import ListMatchs from '../../Components/Match/ListMatchs';
import MatchsSelected from '../../Components/BetRoom/MatchsSelected';

class Matchs extends Component {
    render() {
        const numberBets = this.props.state.BetRoomReducer.numberBets;
        return (
           <ListMatchs />
        )
    }
}

const styles = StyleSheet.create({
})

const mapStateToProps = (state) => { 
    return {state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Matchs)