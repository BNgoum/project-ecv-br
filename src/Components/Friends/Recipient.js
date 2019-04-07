import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import FriendRecipient from './FriendRecipient';
import TextBold from '../Style/TextBold';

export default class Recipient extends Component {
    render() {
        return (
            <View>
                <TextBold style={styles.title} >Demande reçues : </TextBold>

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
        fontSize: 18,
        marginTop: 12,
        marginBottom: 12
    },
})