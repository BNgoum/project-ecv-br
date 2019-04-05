import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';


export default class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isFocus: false
        }
    }

    handleOnBlur = () => {
        if (this.state.text === "") {
            this.setState({
                isFocus: false
            })
        }
    }

    handleChange = (text) => {
        this.setState({ text })

        this.props.sendPropsToParent(this.props.typeOfInput, text);            
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={ styles.inputText }
                    onChangeText={(text) => this.handleChange(text)}
                    value={this.state.text}
                    onFocus={() => this.setState({isFocus: true})}
                    onBlur={() => this.handleOnBlur()}
                    textContentType={this.props.typeContent}
                    secureTextEntry={this.props.isPassword}
                />
                <Text style={ [styles.placeholder, this.state.isFocus && styles.isFocus] }>{this.props.placeholder.toUpperCase()}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 28,
        marginBottom: 32,
    },
    inputText: {
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        paddingVertical: 5,
        fontFamily: 'pt-regular',
        color: '#fff',
        width: 'auto'
    },
    placeholder: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: [{ translateY: -10 }],
        textTransform: 'uppercase',
        color: '#8e8e8e',
        fontSize: 14,
        fontFamily: 'pt-regular',
        zIndex: -1,
    },
    isFocus: {
        fontSize: 10,
        top: 0
    }
})