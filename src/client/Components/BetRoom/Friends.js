import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
const jwtDecode = require('jwt-decode');

import { requestUserInformation } from '../../Store/Reducers/User/action';

import Friend from './Friend';
import ButtonPrimary from '../Style/ButtonPrimary';
import ButtonPrimaryText from '../Style/ButtonPrimaryText';
import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';

import StepNumber from '../../Components/Style/StepNumber';
import StepNumberContainer from '../../Components/Style/StepNumberContainer';

class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllActive: false
        }
    }

    handleOnPress = (friend) => {
        this.setState(prevState => ({
            friends: [...prevState.friends, friend]
        }))
    }
    
    handleOnPressAllFriends = () => {
        this.setState({
            isAllActive: !this.state.isAllActive
        })
    }

    handleValidate = () => {
        return new Promise((resolve, reject) => {
            const token = this.props.state.AuthenticationReducer.isLogin;
            const decoded = jwtDecode(token);

            resolve(requestUserInformation(decoded.email))
        })
        .then(data => {
            const action = { type: "SET_OWNER", value: data._id }
            this.props.dispatch(action);

            this.props.navigation.navigate('MatchsBR');
        })
        .catch((error) => console.log('Erreur lors du handleValidate Friends.js component : ', error))
    }

    render() {
        const friends = this.props.state.FriendReducer.accepted;
        return (
            <View style={ styles.container }>
                <StepNumberContainer><StepNumber>3</StepNumber></StepNumberContainer>
                <TextBold style={ styles.title }>Invite tes amis</TextBold>
                
                <TouchableOpacity
                    onPress={() => this.handleOnPressAllFriends()}
                    style={ [styles.buttonAllFriends, this.state.isAllActive && styles.buttonAllFriendsSelected]}
                >
                    <TextRegular style={ styles.textButton }>Tous mes amis</TextRegular>
                </TouchableOpacity>

                <View style={ styles.separateLine }></View>

                <FlatList
                    data={ friends }
                    keyExtractor={ (item) => item._id.toString() }
                    renderItem={ ({item}) => 
                        <Friend data={item} all={this.state.isAllActive} />
                    }
                />

                <ButtonPrimary onPress={() => this.handleValidate()} style={ styles.buttonValidate }>
                    <ButtonPrimaryText style={ styles.textValidate }>Suivant</ButtonPrimaryText>
                </ButtonPrimary>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 20
    },
    title: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 25,
        marginTop: 4
    },
    buttonAllFriends: {
        justifyContent: 'center',
        alignItem: 'center',
        marginBottom: 8,
        borderRadius: 4,
        backgroundColor: '#242647',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#242647',
        height: 60
    },
    buttonAllFriendsSelected: {
        borderColor: '#fff',
    },
    buttonValidate: {
        alignSelf: 'center',
        width: 150
    },
    separateLine: {
        height: 1,
        width: '20%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: 24
    },
    textButton: {
        fontSize: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends)