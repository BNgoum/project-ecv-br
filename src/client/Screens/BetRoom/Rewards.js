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

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Friends')} style={ styles.buttonValidate }>
                    <Text style={ styles.textValidate }>Valider</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonValidate: {
        alignSelf: 'center',
        backgroundColor: '#ccc',
        padding: 12,
        marginTop: 16
    },
    textValidate: {
        fontSize: 18
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