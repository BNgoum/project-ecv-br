import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
const jwtDecode = require('jwt-decode');

import { requestUserInformation } from '../../Store/Reducers/User/action';

import Friend from './Friend';


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

            this.props.navigation.navigate('Matchs');

            console.log(this.props.state)
        })
        .catch((error) => console.log('Erreur lors du handleValidate Friends.js component : ', error))
    }

    render() {
        const friends = this.props.state.FriendReducer.accepted;
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => this.handleOnPressAllFriends()}
                    style={ this.state.isAllActive ? styles.buttonAllFriendsSelected : styles.buttonAllFriends}
                >
                    <Text>Tous mes amis</Text>
                </TouchableOpacity>

                <FlatList
                    data={ friends }
                    keyExtractor={ (item) => item._id.toString() }
                    renderItem={ ({item}) => 
                        <Friend data={item} all={this.state.isAllActive} />
                    }
                />

                <TouchableOpacity onPress={() => this.handleValidate()}>
                    <Text>Valider</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperRewards: {
        display: 'flex',
        flexDirection: 'row'

    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 32,
    },
    buttonAllFriends: {
        backgroundColor: '#FFF',
        padding: 16,
        marginTop: 32
    },
    buttonAllFriendsSelected: {
        backgroundColor: '#OFO',
        padding: 16,
        marginTop: 32
    },
    buttonFriend: {
        backgroundColor: '#0FF',
        padding: 16,
        marginTop: 32
    },
    buttonFriendSelected: {
        borderColor: '#F00'
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