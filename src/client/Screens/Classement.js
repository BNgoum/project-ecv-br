import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { requestUserInformationById } from '../Store/Reducers/User/action';

class Classement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }

    setFriends = () => {
        const user = this.props.state.AuthenticationReducer.userInfo;
        this.setState({ friends: [] });

        let promiseAllFriends = user.friends.accepted.map(friend => {
            return new Promise((resolve, reject) => {
                // On récupère les données de l'ami
                resolve(requestUserInformationById(friend))
            })
            .then( friendData => {
                // On crée un objet pour l'ami courant
                let friendInfo = { "pseudo": friendData.pseudo, "totalPoints": friendData.totalPoints }
                // Et on l'ajoute dans le state
                this.setState(prevState => ({
                    friends: [...prevState.friends, friendInfo]
                }))
            })
            .catch(error => console.log('Erreur dans le foreach des amis (classement.js) : ', error))
        });   

        return Promise.all(promiseAllFriends)
    }

    componentDidMount() {
        const user = this.props.state.AuthenticationReducer.userInfo;

        return new Promise((resolve, reject) => {
            resolve(this.setFriends())
        })
        .then( () => {
            let currentUser = { "pseudo": user.pseudo, "totalPoints": user.totalPoints };
            this.setState(prevState => ({
                friends: [...prevState.friends, currentUser]
            }))
        })
        .then(() => {
            let arraySort = this.state.friends.sort((friendA, friendB) => {
                return friendA.totalPoints > friendB.totalPoints
            })
            arraySort.reverse();
        })
        .catch(error => console.log('Erreur dans le componentDidMount des amis (classement.js) : ', error))
    }
    
    render() {
        return (
            <View>
                <Text>Classement Screen</Text>
                {
                    this.state.friends.length > 0 &&
                    <FlatList
                        data={ this.state.friends }
                        keyExtractor={ (item) => item.pseudo }
                        renderItem={ ({item}) => 
                            <View style={ styles.wrapperContent }>
                                <Text>{item.pseudo}</Text>
                                <Text>{item.totalPoints}</Text>
                            </View>
                        }
                    />
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 16,
        margin: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = state => { 
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classement)