import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import MatchInComing from './MatchInComing';
import TabButtons from './TabButtons';
import {getAllMatchsPending} from '../../Store/Reducers/Match/action'

import TextBold from '../Style/TextBold';

class ListMatchsInComing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchs : [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getMatchs();
    }

    getMatchs = () => {
        return new Promise((resolve, reject) => {
            resolve(getAllMatchsPending())
        })
        .then(data => {
            const action = { type: "MATCHS_PENDING", value: data.data.data.matchs }
            this.props.dispatch(action);
        })
        .catch(error => console.log('Erreur lors de la récupération des match à venir et en cours (ListMatchsInComing.js) : ', error));
    }
    
    render() {
        const matchsPending = this.props.state.MatchReducer.matchsPending;
        return (
            <View style={styles.container}>
                <View>
                    <TabButtons />
                </View>
                <ScrollView>

                    { this.props.state.MatchReducer.isActive === "LDC" && 
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/ligue_des_champions.png')}/> */}
                                <TextBold style={styles.titreLeague}>Ligue des Champions</TextBold>
                            </View>

                            <FlatList
                                data={matchsPending.UEFAChampionsLeague}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <MatchInComing matchs={item} />}
                            />
                        </View>
                    }

                    {
                        this.props.state.MatchReducer.isActive === "Ligue1" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/ligue_1.png')}/> */}
                                    <TextBold style={styles.titreLeague}>Ligue 1</TextBold>
                                </View>
                                
                                <FlatList
                                    data={matchsPending.Ligue1}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <MatchInComing matchs={item} />}
                                />
                            </View>
                    }
                    
                    {   
                        this.props.state.MatchReducer.isActive === "LaLiga" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/la_liga.png')}/> */}
                                    <TextBold style={styles.titreLeague}>La Liga</TextBold>
                                </View>
                                <FlatList
                                    data={matchsPending.PrimeraDivision}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <MatchInComing matchs={item} />}
                                />
                            </View>
                    }
                    
                    {
                        this.props.state.MatchReducer.isActive === "PremierLeague" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/premier_league.png')}/> */}
                                    <TextBold style={styles.titreLeague}>Premier League</TextBold>
                                </View>

                                <FlatList
                                    data={matchsPending.PremierLeague}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <MatchInComing matchs={item} />}
                                />
                            </View>
                    }

                    {
                        this.props.state.MatchReducer.isActive === "SerieA" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/serie_a.png')}/> */}
                                    <TextBold style={styles.titreLeague}>Serie A</TextBold>
                                </View>

                                <FlatList
                                    data={matchsPending.SerieA}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <MatchInComing matchs={item} />}
                                />
                            </View>
                    }

                    {
                        this.props.state.MatchReducer.isActive === "Bundesliga" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/bundesliga.png')}/> */}
                                    <TextBold style={styles.titreLeague}>Bundesliga</TextBold>
                                </View>

                                <FlatList
                                    data={matchsPending.Bundesliga}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <MatchInComing matchs={item} />}
                                />
                            </View>
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonLoad: {
        alignSelf: 'flex-end',
        padding: 16,
    },
    wrapperLeague: {
        marginVertical: 16,
    },
    wrapperLeagueHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    titreLeague: {
        fontSize: 22,
        alignSelf: 'center'
    },
    pictoLeague: {
        width: 50,
        height: 50,
        marginRight: 8
    },
    icon: {
        width: 20,
        height: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(ListMatchsInComing)