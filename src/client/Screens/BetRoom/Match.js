import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import RewardsComponent from '../../Components/BetRoom/Rewards';

class Matchs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    
    render() {
        return (
            <View style={styles.wrapperRewards}>
                <Text>Matchs à choisir</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperButton: {
        alignSelf: 'center',
        backgroundColor: '#f7f7f7',
        padding: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(Matchs)