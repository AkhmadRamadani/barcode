import React, { Component } from 'react';
import { TextInput, StyleSheet, TextInputProps, Dimensions } from 'react-native'
import PropTypes from 'prop-types';


export default class InputText extends React.Component{

    constructor(props) {
        super(props)

    }

    render() {
        return <TextInput
            {...this.props}
            style={[this.props.style, styles(this.props).container]}
            placeholder={this.props.placeholder} />
    }
}

InputText.propTypes = {
    background: PropTypes.string
}

const styles = (props) => StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 16,
        borderRadius: 24,
        fontFamily: 'OpenSans-Regular',
        width: Dimensions.get('window').width - 40,
        elevation: 1
    }
})
