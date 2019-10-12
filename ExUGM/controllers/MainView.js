import * as React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import MainViewScreen from "../views/MainViewScreen";
import { Object } from 'core-js';
import firebase from "react-native-firebase";

export default class MainView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            dataDiri : {},
            keyId: null
        }

    }

    componentDidMount(){
        Object.assign(this.state.dataDiri,this.props.navigation.state.params.dataDiri)
        this.setState({
            dataDiri: this.props.navigation.state.params.dataDiri
        })
        // this._getData()
    }

    async _getData(){
        const keyId = await AsyncStorage.getItem('keyId')
        firebase.database().ref('Member/' + keyId).once('value',(snapshot) => {

            console.log(snapshot);
            
            this.setState({
                dataDiri: snapshot.val()
            })
        })
    }

    render(){
        return <MainViewScreen state={this.state}></MainViewScreen>
    }
}