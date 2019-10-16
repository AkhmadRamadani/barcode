import * as React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import InputText from './components/InputText'
import Modal from "react-native-modal";

const { width, height } = Dimensions.get('window');


export default class RegisterView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
          
        }

    }

    render(){
        return (

            <KeyboardAvoidingView style={{flex: 1,paddingHorizontal: 16, paddingVertical: 10}} behavior={"padding"} enabled>
                
                <Modal
                    style={{justifyContent:'center'}}
                    isVisible={this.props.state.loading}
                >
                    <ActivityIndicator style={{position:"absolute",alignSelf:'center'}} size={'large'} color={'white'}/>
                </Modal>
                
                <View style={{paddingHorizontal: 2}}>
                    <Text style={{fontWeight: 'bold', fontSize: 32}}>Sign Up</Text>    
                </View> 
                                  
                <View style={{ alignItems: 'center', marginVertical: 20, width: '100%' }}>

                    <TouchableOpacity onPress={() => this.props.method.pickImage()}>
                        <View style={styles().imageContainer}>
                            {
                                this.props.state.image === null ?
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../assets/images/plus-dark.png')}/>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontSize: 20,
                                                fontFamily: 'Rubik-Bold',
                                                color: '#444',
                                            }}
                                            children="Student's Image"
                                        />
                                    </View> 
                                    :
                                    <Image style={{ flex: 1, borderRadius: 14 }}
                                            source={{ uri: this.props.state.image }}/>
                            }
                        </View>
                    </TouchableOpacity>

                </View>
                
                <View style={{padding: 16, height: width / 1.3,justifyContent:'space-between',alignItems:'center'}}>

                    <InputText
                        placeholder={"Name"}
                        background={'#fff'}
                        style={{  }}
                        onChangeText={(text) => this.props.method.changeState('name', text)}
                        />

                    <InputText
                        placeholder={"Phone number"}
                        keyboardType={'phone-pad'}
                        style={{ }}
                        onChangeText={(text) => this.props.method.changeState('noHP', text)}
                        />

                    <InputText
                        placeholder={"Email"}
                        keyboardType={"email-address"}
                        style={{  }}
                        onChangeText={(text) => this.props.method.changeState('email', text)}
                        />

                    <InputText
                        placeholder={"Generation"}
                        background={'#fff'}
                        style={{}}
                        onChangeText={(text) => this.props.method.changeState('angkatan', text)}
                        />

                </View>
                
                {
                    this.props.state.name == '' || this.props.state.angkatan == '' || this.props.state.email == '' || this.props.state.noHP == '' || this.props.state.image == null
                    ?
                    <TouchableOpacity 
                        style={{alignSelf:'center',
                                justifyContent:'center',
                                alignItems:'center',
                                width: width / 1.5, 
                                height: 50,
                                marginTop: 16,
                                elevation: 3, 
                                borderRadius: 24, 
                                backgroundColor: '#F2f2f2'}}>

                        <Text style={{fontSize: 24, fontWeight: 'bold'}} children={'Next'} />

                    </TouchableOpacity>
                    :
                    <TouchableOpacity 
                        style={{alignSelf:'center',
                                justifyContent:'center',
                                alignItems:'center',
                                width: width / 1.5, 
                                height: 50,
                                marginTop: 16,
                                elevation: 3, 
                                borderRadius: 24, 
                                backgroundColor: '#F2C94C'}}
                        onPress={()=> this.props.method.uploadToFirebase()}>

                        <Text style={{fontSize: 24, fontWeight: 'bold'}} children={'Next'} />

                    </TouchableOpacity>
                }
                
                
                
            </KeyboardAvoidingView>
            
        )
    }

}

const styles = props => StyleSheet.create({
    
    imageContainer: {
        width: width / 2.5,
        height: width / 2.5,
        backgroundColor: '#f2f2f2',
        elevation: 10,
        borderRadius: 14,
    },
    modal: {
        height: 120,
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});
