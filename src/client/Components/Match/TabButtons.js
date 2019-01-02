import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';

class TabButtons extends Component {

    handleOnPress = (championnat) => {
        const action = { type: "IS_ACTIVE", value: championnat }
        this.props.dispatch(action);
    }

    render() {
        const isActive = this.props.state.MatchReducer.isActive;
        return (
            <View style={styles.wrapperTab}>
                <TouchableOpacity 
                    style={isActive === "LDC" ? styles.isSelected : styles.wrapperButton} 
                    onPress={() => this.handleOnPress("LDC")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/ligue_des_champions.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={isActive === "Ligue1" ? styles.isSelected : styles.wrapperButton} 
                    onPress={() => this.handleOnPress("Ligue1")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/ligue_1.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                style={isActive === "LaLiga" ? styles.isSelected : styles.wrapperButton} 
                onPress={() => this.handleOnPress("LaLiga")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/la_liga.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={isActive === "PremierLeague" ? styles.isSelected : styles.wrapperButton} 
                    onPress={() => this.handleOnPress("PremierLeague")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/premier_league.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={isActive === "SerieA" ? styles.isSelected : styles.wrapperButton} 
                    onPress={() => this.handleOnPress("SerieA")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/serie_a.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={isActive === "Bundesliga" ? styles.isSelected : styles.wrapperButton} 
                    onPress={() => this.handleOnPress("Bundesliga")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/bundesliga.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperTab: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wrapperButton: {
        padding: 6
    },
    isSelected: {
        backgroundColor: '#ccc',
        padding: 6
    },
    pictoLeague: {
        width: 55,
        height: 55,
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

export default connect(mapStateToProps, mapDispatchToProps)(TabButtons)