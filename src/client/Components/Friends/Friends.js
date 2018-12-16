import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Accepted from './Accepted';
import Pending from './Pending';
import Recipient from './Recipient';
import FriendRequest from './FriendRequest';

export default class Friends extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >Mes amis</Text>
                <FriendRequest />
                <Accepted />
                <Recipient />
                <Pending />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 22
    }
})