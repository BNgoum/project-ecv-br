import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Match from './Match'
import {requestLigue1Matchs, requestPremierLeagueMatchs, requestBundesligaMatchs, requestSerieAMatchs, requestLigueDesChampionsMatchs, requestLaLigaMatchs, requestFetchMatchs} from '../../Store/Reducers/BetRoom/action'
const moment = require('moment');

class ListMatchs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchs : [],
            Ligue1: [],
            PremierLeague: [],
            Bundesliga: [],
            SerieA: [],
            LaLiga: [],
            LiguedesChampions: [],
            isLoading: true
        }
        this.domain = '192.168.1.81'
    }

    componentDidMount() {
        this.getMatchs();
    }

    getMatchs = () => {
        return new Promise ((resolve, reject) => { resolve(requestLigueDesChampionsMatchs()) })
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestLigue1Matchs() )
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestLaLigaMatchs() )
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestPremierLeagueMatchs() )
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestBundesligaMatchs() )
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestSerieAMatchs() )
        .then((action) => {this.props.dispatch(action)})
        .catch((error) => console.log('Erreur lors de l\'affichage des matchs de la semaine', error))
    }

    fetchMatchs = () => {
        let today = moment().format('YYYY-MM-DD');
        let nextWeek = moment(today, "YYYY-MM-DD").add(7, 'days');
        return new Promise ((resolve, reject) => {
            resolve(requestFetchMatchs(today, nextWeek))
            .then(() => this.getMatchs())
            .catch((error) => console.log('Erreur lors du fetch des matchs dans le composant ListMatchs : ', error))
        })
    }

    // loadMatchs = () => {
        
    //     fetch('http://' + this.domain + ':3000/api/matchdelasemaine?championnat=Ligue 1')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log(responseJson)
    //         this.setState({
    //             Ligue1: responseJson.matchs,
    //         })
    //     })
    //     .catch((error) => console.error(error));

    //     fetch('http://' + this.domain + ':3000/api/matchdelasemaine?championnat=La Liga')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         this.setState({
    //             LaLiga: responseJson.matchs,
    //         })
    //     })
    //     .catch((error) => console.error(error));

    //     fetch('http://' + this.domain + ':3000/api/matchdelasemaine?championnat=Premier League')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         this.setState({
    //             PremierLeague: responseJson.matchs,
    //         })
    //     })
    //     .catch((error) => console.error(error));

    //     fetch('http://' + this.domain + ':3000/api/matchdelasemaine?championnat=Bundesliga')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         this.setState({
    //             Bundesliga: responseJson.matchs,
    //         })
    //     })
    //     .catch((error) => console.error(error));

    //     fetch('http://' + this.domain + ':3000/api/matchdelasemaine?championnat=Serie A')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         this.setState({
    //             SerieA: responseJson.matchs,
    //         })
    //     })
    //     .catch((error) => console.error(error));

    //     fetch('http://' + this.domain + ':3000/api/matchdelasemaine?championnat=Ligue des champions')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         this.setState({
    //             LiguedesChampions: responseJson.matchs,
    //         })
    //     })
    //     .catch((error) => console.error(error));
    // }

    render() {
        console.log(this.props.state.BetRoomReducer)
        return (
            <ScrollView>
                <TouchableOpacity
                    onPress={this.fetchMatchs}
                    style={styles.buttonLoad}>
                    <Image style={styles.icon} source={require('../../Images/refresh.png')}/>
                </TouchableOpacity>

                {
                    this.props.state.BetRoomReducer.Ligue1.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../../Images/leagues/ligue_1.png')}/>
                                <Text style={styles.titreLeague}>Ligue 1</Text>
                            </View>
                            
                            <FlatList
                                data={this.props.state.BetRoomReducer.Ligue1}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }
                
                {   
                    this.props.state.BetRoomReducer.LaLiga.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../../Images/leagues/la_liga.png')}/>
                                <Text style={styles.titreLeague}>La Liga</Text>
                            </View>
                            <FlatList
                                data={this.props.state.BetRoomReducer.LaLiga}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }
                
                {
                    this.props.state.BetRoomReducer.PremierLeague.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../../Images/leagues/premier_league.png')}/>
                                <Text style={styles.titreLeague}>Premier League</Text>
                            </View>

                            <FlatList
                                data={this.props.state.BetRoomReducer.PremierLeague}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }

                {
                    this.props.state.BetRoomReducer.SerieA.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../../Images/leagues/serie_a.png')}/>
                                <Text style={styles.titreLeague}>Serie A</Text>
                            </View>

                            <FlatList
                                data={this.props.state.BetRoomReducer.SerieA}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }

                {
                    this.props.state.BetRoomReducer.Bundesliga.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../../Images/leagues/bundesliga.png')}/>
                                <Text style={styles.titreLeague}>Bundesliga</Text>
                            </View>

                            <FlatList
                                data={this.props.state.BetRoomReducer.Bundesliga}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }

                { this.props.state.BetRoomReducer.LigueDesChampions.length > 0 ? 
                    <View style={styles.wrapperLeague}>
                        <View style={styles.wrapperLeagueHeader}>
                            <Image style={styles.pictoLeague} source={require('../../Images/leagues/ligue_des_champions.png')}/>
                            <Text style={styles.titreLeague}>Ligue des Champions</Text>
                        </View>

                        <FlatList
                            data={this.props.state.BetRoomReducer.LigueDesChampions}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({item}) => <Match matchs={item} />}
                        />
                    </View>
                :
                    null
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    buttonLoad: {
        alignSelf: 'flex-end',
        padding: 16,
    },
    wrapperLeague: {
        marginBottom: 32,
    },
    wrapperLeagueHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titreLeague: {
        fontSize: 32,
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16
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
    return {state: state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMatchs)