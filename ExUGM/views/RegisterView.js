import * as React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, Keyboard } from 'react-native'
import InputText from './components/InputText'

const { width, height } = Dimensions.get('window');


export default class RegisterView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
          
        }

    }

    render(){
        return (
        <View style={{flex: 1, paddingHorizontal: 16, paddingVertical: 10}}>

            <KeyboardAvoidingView style={{flex: 1}} behavior={"padding"} enabled>

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
                
                <View style={{padding: 16, alignItems:'center'}}>

                    <InputText
                        placeholder={"Name"}
                        background={'#fff'}
                        style={{ marginBottom: 16 }}
                        onChangeText={(text) => this.props.method.changeState('name', text)}
                        />

                    <InputText
                        placeholder={"Phone number"}
                        keyboardType={'phone-pad'}
                        style={{ marginBottom: 16 }}
                        onChangeText={(text) => this.props.method.changeState('noHP', text)}
                        />

                    <InputText
                        placeholder={"Email"}
                        keyboardType={"email-address"}
                        style={{ marginBottom: 16 }}
                        onChangeText={(text) => this.props.method.changeState('email', text)}
                        />

                    <InputText
                        placeholder={"Generation"}
                        background={'#fff'}
                        style={{ marginBottom: 16 }}
                        onChangeText={(text) => this.props.method.changeState('angkatan', text)}
                        />

                </View>
                        
                
                <TouchableOpacity 
                    style={{alignSelf:'center',
                            justifyContent:'center',
                            alignItems:'center',
                            width: width / 1.5, 
                            minHeight: 50,
                            marginTop: 16,
                            elevation: 3, 
                            borderRadius: 24, 
                            backgroundColor: '#F2C94C'}}
                    onPress={()=> this.props.method.uploadToFirebase()}>

                    <Text style={{fontSize: 24, fontWeight: 'bold'}} children={'Next'} />

                </TouchableOpacity>

            </KeyboardAvoidingView>
            
        </View>
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
});
