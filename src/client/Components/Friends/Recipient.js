import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import FriendRecipient from './FriendRecipient';

export default class Recipient extends Component {
    render() {
        return (
            <View>
                <Text style={styles.title} >Demande reçues : </Text>

                <FlatList
                    data={ this.props.friends }
                    keyExtractor={ (item) => item._id.toString() }
                    renderItem={ ({item}) => <FriendRecipient data={item} />}
                    style={styles.friendRecipient}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        marginBottom: 8
    },
})