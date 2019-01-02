import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import RewardsComponent from '../../Components/BetRoom/Rewards';

class Rewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    
    render() {
        return (
            <View style={styles.wrapperRewards}>
                <RewardsComponent />

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Friends') }>
                    <Text>Valider</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperRewards: {

    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Rewards)