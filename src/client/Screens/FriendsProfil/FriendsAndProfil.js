import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';

import { connect } from 'react-redux';

import Friends from '../../Components/Friends/Friends';

import Tabs from '../../Components/Tabs';
import Profil from '../../Components/Profil/Profil';

class FriendsAndProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexScreen: 0,
            isProfil: true,
            isFriends: false
        }
    }

    handleSwipeScreen = (index) => { this.setState({indexScreen: index}) }

    handleDisplayTabContent = side => {
        if ( side === "first" ) { this.setState({ isProfil: true, isFriends: false }) }
        else { this.setState({ isFriends: true, isProfil: false }) }
    }

    displayContent = () => {

        if (this.state.isProfil) {
            return <Profil />
        } else {
            return <Friends navigation={ this.props.navigation } />
        }
    }

    render() {
        return (
            <LinearGradient style={{ flex: 1 }} colors={['#10122d', '#385284', '#10122d']}>
                <View style={styles.container}>
                    <Tabs firstTab="Profil" secondTab="Amis" displayTabContent={this.handleDisplayTabContent}/>
                    { this.displayContent() }
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },  
    title: {
        alignSelf: 'center',
        fontSize: 22
    },
    buttonFriends: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 8
    },
    pictoFriends: {
        width: 40,
        height: 40
    },
    profilSlide: {
        // position: 'relative',
        flex: 1,
        // justifyContent: 'center',
        // marginBottom: 160
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    imageUser: {
        position: 'absolute',
        bottom: 0,
        left: -50,
        width: '100%',
        height: '100%'
    }
})

const mapStateToProps = (state) => { 
    return { state: state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsAndProfil)