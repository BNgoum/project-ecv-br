import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import FriendRecipient from './FriendRecipient';

export default class Recipient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >Demande reçues : </Text>

                {
                    this.props.friends.length > 0 ?
                    <FlatList
                        data={ this.props.friends }
                        keyExtractor={ (item) => item._id.toString() }
                        renderItem={ ({item}) => <FriendRecipient data={item} />}
                        style={styles.friendRecipient}
                    />
                    :
                    <Text>Aucune demande d'amis</Text>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 22
    },
})