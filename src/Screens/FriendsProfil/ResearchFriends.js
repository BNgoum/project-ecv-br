import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';

// import Profil from '../Components/Profil/Profil_Bis';
import FriendsRequest from '../../Components/Friends/FriendRequest';

export default class ResearchFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <LinearGradient style={{ flex: 1 }} colors={['#10122d', '#385284', '#10122d']}>
                <FriendsRequest />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
})
