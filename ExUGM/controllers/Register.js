import * as React from 'react'
import { View, Text } from 'react-native'
import RegisterView from "../views/RegisterView";
import ImagePicker from 'react-native-image-picker';
import ImageCrop from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage';

export default class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            image: null,
            name: '',
            angkatan: '',
            noHP: ''
        }

        this.method = {
            changeState: this._changeState.bind(this),
            pickImage: this._imagePicker.bind(this),
            sendData: this._sendData.bind(this),
            // sendToFirebase: this._sendToFirebase.bind(this),
            uploadToFirebase: this._submitForm.bind(this)
        }
    }

    _changeState(key, value) {
        this.setState({
            [key]: [value]
        })
    }

    _imagePicker = () => {
        ImagePicker.showImagePicker(image => {
            if (image.didCancel) {
                console.log('User cancelled image picker');
            } else if (image.error) {
                console.log('ImagePicker Error: ', image.error);
            } else {
                ImageCrop.openCropper({
                    path: `file://${image.path}`,
                    width: 480,
                    height: 480,
                    cropping: true,
                }).then(img => this.setState({ image: img.path })).catch(e => console.log(e.message));
            }
        });
    };

    _sendData() {
        this.props.navigation.navigate('Main', {
            dataDiri: {
                image: this.state.image,
                name: this.state.name.toString(),
                email: this.state.email.toString(),
                angkatan: this.state.angkatan.toString(),
                noHP: this.state.noHP.toString()
            }
        })
    }

    _sendToFirebase(filename) {
        firebase.database().ref('Member/').push({
            'absent': false,
            'email': this.state.email.toString(),
            'generation': this.state.angkatan.toString(),
            'name': this.state.name.toString(),
            'phone': this.state.noHP.toString(),
            'photo': filename
        }).then((data) => {
            console.log("DATA::", data);

            alert('Success');

            this.props.navigation.navigate('Main', {
                dataDiri: {
                    image: filename,
                    name: this.state.name.toString(),
                    email: this.state.email.toString(),
                    angkatan: this.state.angkatan.toString(),
                    noHP: this.state.noHP.toString()
                }
            })

        }).catch((error) => {
            console.log(error);

            alert('Error')
        })
    }

    _uploadToFirebase() {

        var ext = this.state.image.split('.').pop()
        var filename = Math.random().toString(36).substring(2, 100) + Math.random().toString(36).substring(2, 100)

        firebase
            .storage()
            .ref('/photoprofile/' + filename)
            .putFile(this.state.image)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {

                    if (snapshot.state == firebase.storage.TaskState.SUCCESS) {
                        console.log("Download URL::", snapshot.downloadURL);
                        this._sendToFirebase(snapshot.downloadURL)
                    }

                }, error => {
                    console.log(error);

                }
            )
    }

    _submitForm = () => {

        let fileName = Math.random().toString(36).substring(2, 100) + Math.random().toString(36).substring(2, 100);

        firebase.storage().ref(`/photoprofile/${fileName}`).putFile(this.state.image)
            .then(response => {
                console.log("Response:", response)

                if (response.state === firebase.storage.TaskState.SUCCESS) {

                    firebase.database().ref('Member/').push({
                        'absent': false,
                        'email': this.state.email.toString(),
                        'generation': this.state.angkatan.toString(),
                        'name': this.state.name.toString(),
                        'phone': this.state.noHP.toString(),
                        'photo': response.downloadURL
                    }).then((data) => {
                        console.log("DATA::", data.key);

                        this.props.navigation.navigate('Main', {
                            dataDiri: {
                                image: response.downloadURL,
                                name: this.state.name.toString(),
                                email: this.state.email.toString(),
                                angkatan: this.state.angkatan.toString(),
                                noHP: this.state.noHP.toString()
                            }
                        })
                        
                    }).catch(error => console.log(error))

                }

            }).catch(error => console.log("Error:", error))

    }

    render() {
        return (
            <RegisterView state={this.state} method={this.method} navigation={this.props.navigation} />
        )
    }

}
