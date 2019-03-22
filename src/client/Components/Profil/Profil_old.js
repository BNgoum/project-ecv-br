import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import TextRegular from '../Style/TextRegular';

export default class ProfilOld extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <View style={styles.container}>
            <View style={ styles.wrapperFabs }>
                <ActionButton buttonColor="rgba(231,76,60,1)" active={true} position="left" radius={200} autoInactive={false}>
                        <ActionButton.Item buttonColor='#fff' title="Test Test" onPress={() => console.log("notes tapped!")}>
                            {/* <Icon name="android-create" style={styles.actionButtonIcon} />
                            <TextRegular>Test Test</TextRegular> */}
                        </ActionButton.Item>
                    
                    <ActionButton.Item buttonColor='#fff' title="Notifications" onPress={() => {}}>
                        <Icon name="android-notifications-none" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item buttonColor='#fff' title="All Tasks" onPress={() => {}}>
                        <Icon name="android-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    
                    <ActionButton.Item buttonColor='#fff' title="All Tasks" onPress={() => {}}>
                        <Icon name="android-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
                
                <Image style={ styles.imageUser } source={require('../../Images/profil/mbappe.png')} resizeMode={"contain"} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },  
    imageUser: {
        position: 'absolute',
        bottom: -100,
        left: -50,
        width: '100%',
        height: '100%'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    wrapperFabs: {
        flex: 1,
        marginBottom: 100,
        marginLeft: 50
    }
})
