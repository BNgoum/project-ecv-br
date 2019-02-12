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
                    style={[styles.wrapperButton, isActive === "LDC" && styles.isSelected]} 
                    onPress={() => this.handleOnPress("LDC")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/ligue_des_champions.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.wrapperButton, isActive === "Ligue1" && styles.isSelected]} 
                    onPress={() => this.handleOnPress("Ligue1")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/ligue_1.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.wrapperButton, isActive === "LaLiga" && styles.isSelected]} 
                onPress={() => this.handleOnPress("LaLiga")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/la_liga.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.wrapperButton, isActive === "PremierLeague" && styles.isSelected]} 
                    onPress={() => this.handleOnPress("PremierLeague")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/premier_league.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.wrapperButton, isActive === "SerieA" && styles.isSelected]} 
                    onPress={() => this.handleOnPress("SerieA")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/serie_a.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.wrapperButton, isActive === "Bundesliga" && styles.isSelected]} 
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
        borderBottomWidth: 2,
        borderBottomColor: "#dedede",
    },
    wrapperButton: {
        padding: 6,
    },
    isSelected: {
        borderBottomWidth: 3,
        borderBottomColor: '#000'
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