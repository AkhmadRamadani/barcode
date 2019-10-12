import * as React from 'react'
import { View, Text, TextInput, Dimensions, Image, TouchableHighlight, StyleSheet } from 'react-native'
import QRCode from "react-native-qrcode-svg";
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

export default class MainViewScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            modalVisibility: false
        }

    }

    _modalAction = () => {
        this.setState({ modalVisibility: !this.state.modalVisibility });
    };

    render(){
        return (
            <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 16}}>
                
                <Modal
                    isVisible={this.state.modalVisibility}
                    onBackButtonPress={this._modalAction}
                    onBackdropPress={this._modalAction}
                >
                        <View style={{ 
                                    width: width/1, 
                                    height: width/1, 
                                    backgroundColor:'#fff',
                                    elevation: 15,
                                    alignSelf:'center',
                                    borderRadius: 20,
                                    alignItems:'center', 
                                    justifyContent:'center'}}>
                        
                            <QRCode 
                                size={300}
                                value={JSON.stringify(this.props.state.dataDiri)}
                            />
                            
                        </View>

                </Modal>


                <View style={{paddingHorizontal: 2, flexDirection: 'row',alignItems:'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 32, color: '#000'}}>QR Code</Text>    
                </View> 
                
                <View style={{alignSelf:'center',justifyContent:'center', marginTop: width/5}}>
                  
                    <View style={{width:55, 
                                height: 55, 
                                backgroundColor: '#fff', 
                                zIndex:50, 
                                elevation: 15, 
                                borderRadius: 50, 
                                alignSelf:'center'}}>

                        <Image style={{width: 55, height: 55, borderRadius: 50}} source={{uri: this.props.state.dataDiri.image}} />

                    </View>
                    
                    <View style={{width: width/1.5,
                                 height: width/3,
                                 paddingTop: 30,
                                 alignItems:'center' ,
                                 backgroundColor:'#fff',
                                 elevation: 15,
                                 marginTop: -width/12, 
                                 borderBottomLeftRadius: 20, 
                                 borderBottomRightRadius: 20}}>

                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>{this.props.state.dataDiri.name}</Text>

                        <Text style={{fontSize: 16}}>{this.props.state.dataDiri.noHP}</Text>

                        <Text style={{fontSize: 16}}>{this.props.state.dataDiri.angkatan}</Text>

                        <Text style={{fontSize: 16}}>{this.props.state.dataDiri.email}</Text>

                    </View>

                    <TouchableHighlight style={{ 
                                width: width/1.5, 
                                height: width/1.5, 
                                backgroundColor:'#fff',
                                elevation: 15,
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20,
                                alignItems:'center', 
                                justifyContent:'center'}}
                                onPress={()=>this._modalAction()}>
                    
                        <QRCode 
                            size={200}
                            value={JSON.stringify(this.props.state.dataDiri)}
                        />
                        
                    </TouchableHighlight>
                </View>
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
