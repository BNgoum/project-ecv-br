import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { connect } from 'react-redux';

import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';

class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const pseudo = this.props.state.AuthenticationReducer.userInfo.pseudo;
        return (
            <View style={styles.container}>
                <TextBold style={ styles.titleStyle }>Bonjour { "\n" + pseudo }</TextBold>
                <View style={ styles.wrapperFabs }>
                    <View style={ styles.circle }></View>
                    <View style={ [styles.itemProfil, styles.itemProfil1] }>
                        <View style={ styles.itemProfilContent }><TextBold style={ styles.itemNumber }>4</TextBold></View>
                        <TextRegular style={ styles.itemText }>Bet Rooms crées</TextRegular>
                    </View>
                    <View style={ [styles.itemProfil, styles.itemProfil2] }>
                        <View style={ styles.itemProfilContent }><TextBold style={ styles.itemNumber }>9</TextBold></View>
                        <TextRegular style={ styles.itemText }>Bet Rooms participé</TextRegular>
                    </View>
                    <View style={ [styles.itemProfil, styles.itemProfil3] }>
                        <View style={ styles.itemProfilContent }><TextBold style={ styles.itemNumber }>8</TextBold></View>
                        <TextRegular style={ styles.itemText }>pronostics exacts</TextRegular>
                    </View>
                    <View style={ [styles.itemProfil, styles.itemProfil4] }>
                        <View style={ styles.itemProfilContent }><TextBold style={ styles.itemNumber }>12</TextBold></View>
                        <TextRegular style={ styles.itemText }>Bet Rooms remportées</TextRegular>
                    </View>

                    <Image style={ styles.imageUser } source={require('../../Images/profil/mbappe2.png')} resizeMode={"cover"} />
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        // justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40
    },  
    imageUser: {
        position: 'absolute',
        bottom: -250,
        left: -20,
        // width: '100%',
        // height: '100%',
        width: 220,
        height: 450,
        zIndex: 55
    },
    wrapperFabs: {
        position: 'relative',
        marginLeft: -20,
        width: 280,
        height: 280,
        borderRadius: '50%',
        zIndex: 50
    },
    circle: {
        opacity: 1,
        borderWidth: 1,
        borderColor: '#242647',
        width: '100%',
        height: '100%',
        borderRadius: 500,
        zIndex: 1
    },
    itemProfil: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#242647',
        zIndex: 51
    },
    itemProfil1: {
        top: -15,
        right: 160,
    },
    itemProfil2: {
        top: -10,
        right: 50,
    },
    itemProfil3: {
        right: -20,
        top: 80,
    },
    itemProfil4: {
        right: 0,
        top: 190,
    },
    itemText: {
        position: 'absolute',
        left: '50%',
        transform: [{translateX: -46}],
        width: 90,
        bottom: -40,
        textAlign: 'center'
    },
    itemProfilContent: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: '#242647',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemNumber: {
        fontSize: 24,
        color: '#ffd200'
    },
    titleStyle: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 60
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

export default connect(mapStateToProps)(Profil)