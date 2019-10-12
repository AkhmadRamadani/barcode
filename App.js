import * as React from 'react'
import { View } from 'react-native'
import { MainNavigator } from './ExUGM/systems/Config'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage';

var config = {
    databaseURL: "https://exugm-01.firebaseio.com/",
    projectId: "exugm-01",
};

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
          
        }

    }

    async componentDidMount(){
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    render = () => {

        const Navigator = MainNavigator()

        return <Navigator />

    }

}
