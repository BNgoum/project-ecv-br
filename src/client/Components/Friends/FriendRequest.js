import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { requestUserInformation, requestUserInformationByPseudo } from '../../Store/Reducers/User/action';
import { friendRequest } from '../../Store/Reducers/Friends/action'

const jwtDecode = require('jwt-decode');
import { connect } from 'react-redux';

class FriendRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            idUserA: "",
            idUserB: ""
        }
    }

    sendRequest = () => {
        return new Promise((resolve, reject) => {
            resolve(requestUserInformationByPseudo(this.state.pseudo));
        })
        .then(data => {
            if (data.type) {
                this.props.dispatch(data);
            } else {
                const action = { type: "FOUND_USER_BY_PSEUDO", value: "" }
                this.props.dispatch(action);

                const action2 = { type: "ADD_PENDING", value: data.pseudo }
                this.props.dispatch(action2);

                this.setState({ idUserB: data._id })
            }
        })
        .then( () => {
            const token = this.props.state.AuthenticationReducer.isLogin;
            const decoded = jwtDecode(token);
            return requestUserInformation(decoded.email)
        })
        .then(data => {
            this.setState({ idUserA: data._id })
        })
        .then(() => {
            const { idUserA, idUserB } = this.state;

            return friendRequest(idUserA, idUserB)
        })
        .then( action => {
            this.props.dispatch(action);
        })
        .catch((error) => console.log('Erreur lors de la requête d\'amis (FriendRequest) : ', error))
    }

    render() {
        return (
            <View styles={styles.wrapperRecipientFriend}>
                <TextInput
                    placeholder="Entrez le pseudo de votre ami..."
                    onChangeText={(pseudo) => this.setState({pseudo})}
                    style={styles.inputPseudo} />

                { this.props.state.AuthenticationReducer.found_user_by_pseudo !== "" ?
                    <Text>{this.props.state.AuthenticationReducer.found_user_by_pseudo}</Text>
                  :
                    null
                }

                { this.props.state.FriendReducer.friend_request !== "" ?
                    <Text>{this.props.state.FriendReducer.friend_request}</Text>
                  :
                    null
                }

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.sendRequest}>
                    <Text>Envoyer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperRecipientFriend: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    inputPseudo: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 14,
        color: '#000',
        backgroundColor: '#fff',
        padding: 8,
        width: 250
    },
    button: {
        display: 'flex',
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 8,
        marginTop: 16
    },
    icon: {
        width: 32,
        height: 32,
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest)