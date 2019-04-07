import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import ListMatchs from '../../Components/Match/ListMatchs';

class Matchs extends Component {
    render() {
        return (
           <ListMatchs navigation={this.props.navigation}/>
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