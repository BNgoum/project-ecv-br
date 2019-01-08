import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

class NewBetRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    handleOnPress = (name) => {
        const action = { type: "SET_NAME", value: name }
        this.props.dispatch(action);

        this.props.navigation.navigate('Rewards')
    }
    
    render() {
        return (
            <View style={styles.wrapperHome}>

                <TextInput
                    onChangeText={(name) => this.setState({name})}
                    placeholder="Saisissez un nom pour votre Bet Room..." 
                    style={styles.inputName}
                />

                <TouchableOpacity style={styles.wrapperButton} onPress={ () => this.handleOnPress(this.state.name) }>
                    <Text style={ styles.textValidate }>Valider</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperHome: {

    },
    inputName: {
        borderBottomColor: '#333',
        borderBottomWidth: 2,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 8,
        paddingLeft: 8,
        marginTop: 32,
        marginBottom: 32,
        marginLeft: 32,
        marginRight: 32,
    },
    wrapperButton: {
        alignSelf: 'center',
        backgroundColor: '#ccc',
        padding: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(NewBetRoom)