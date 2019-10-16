import * as React from 'react'
import { View, Text, TextInput, Dimensions, Image, TouchableOpacity, StyleSheet } from 'react-native'
import QRCode from "react-native-qrcode-svg";
import Modal from 'react-native-modal';
import { captureScreen } from "react-native-view-shot";
import RNFS from "react-native-fs"
import CameraRoll from "@react-native-community/cameraroll";

const { width, height } = Dimensions.get('window');

export default class MainViewScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            imageUri: null
        }

    }

    _takeScreenshot(){
        captureScreen({
            //either png or jpg or webm (Android). Defaults to png
            format: "jpg",
            //quality 0.0 - 1.0 (default). (only available on lossy formats like jpg)
            quality: 0.8
          })
          .then(
            //callback function to get the result URL of the screnshot
            uri => [alert('success'),console.log('uri',uri)
            ,CameraRoll.saveToCameraRoll(uri).then(alert('Success')),
        ],
            
            error => console.error("Oops, Something Went Wrong", error)
          );
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 16, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity activeOpacity={1} onPress={()=> alert('Touched')}>
                    <View style={{width:100, 
                                height: 100, 
                                backgroundColor: '#fff', 
                                zIndex:50, 
                                elevation: 15, 
                                borderRadius: 50, 
                                alignSelf:'center'}}>

                        <Image style={{width: 100, height: 100, borderRadius: 50}} source={{uri: this.props.state.dataDiri.image}} />

                    </View>
                    
                    <View style={{width: width/1.2,
                                    height: width/2.5,
                                    paddingTop: 50,
                                    alignItems:'center' ,
                                    backgroundColor:'#fff',
                                    elevation: 15,
                                    marginTop: -width/8,
                                    borderRadius: 30    
                                }}>

                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>{this.props.state.dataDiri.name}</Text>

                        <Text style={{fontSize: 16}}>{this.props.state.dataDiri.noHP}</Text>

                        <Text style={{fontSize: 16}}>{this.props.state.dataDiri.angkatan}</Text>

                        <Text style={{fontSize: 16}}>{this.props.state.dataDiri.email}</Text>

                    </View>

                    <View style={{ 
                                width: width/1.2, 
                                height: width/1.2, 
                                backgroundColor:'#fff',
                                elevation: 15,
                                borderRadius: 30,
                                alignItems:'center', 
                                justifyContent:'center'}}
                                // onLongPress={()=>this._takeScreenshot()}
                                
                                >
                    
                        <QRCode 
                            size={250}
                            logo={this.props.state.dataDiri.image}
                            logoSize={50}
                            getRef={(c) => this.svg = c}
                            logoBorderRadius={50}
                            value={JSON.stringify(this.props.state.dataDiri)}
                        />
                        
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = props => StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 24,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    icon: {
        width: 15,
        height: 15,
    },
});
