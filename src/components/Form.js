import { Platform ,BackHandler} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Component} from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text, TextInput
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {onDetailsEnter, onDetailsEntered, onSignIn} from '../auth'

import { useNavigation } from '@react-navigation/native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


// import messaging from '@react-native-firebase/messaging';
// import axios from 'axios';
class Form extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      OtpSent: false,
      press: false,
      WorngNumber:false,
      correctOtp:true,
      verifyButtonPress:false,
      code:"",
      number:"",
      confirmResult: null,
      verificationCode: '',
      userId: null,
      goToEnter:false,
      goToSignIn:false,
      verificationId:null,
      isLoading:false,

    };
    this.sentOtp = this.sentOtp.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);
    this.setNumber = this.setNumber.bind(this);
    this.setotp = this.setotp.bind(this);
    this.goToPhoneNumber = this.goToPhoneNumber.bind(this);
    this.checkState=this.checkState.bind(this);
  }
  goToPhoneNumber()
  {
    this.setState({OtpSent: false})
  }

  async componentDidMount()
  {
    auth().onAuthStateChanged(async(user) => {
      if (user) {

        var uid = user.uid;        
        alert(`welcome user`)
        const a=this.state.number;
        this.setState({userId:uid });
        this.checkState();
        await onSignIn(uid,a);
      } else {
      }
    });
  }


  async checkState()
  { 
    // await messaging().registerDeviceForRemoteMessages();
    // const token = await messaging().getToken();
    let option = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          userId:this.state.userId,
          number:this.state.number,
          // token:token,
      })
    }
    console.log(option.body);
    fetch(`https://nociw.herokuapp.com/addNumber`, option)
    .then(() => {

    });


    let res1 = await fetch(`https://nociw.herokuapp.com/checkUser?id=${this.state.userId}`);  
    let jsonResponse=await res1.json();
    console.log(jsonResponse);
    if(jsonResponse.statusCode===200)
    {
      this.setState({goToSignIn:true});
      this.setState({isDetailsEnter:true})
      onDetailsEntered();      
      onDetailsEnter(jsonResponse.user.userName);
    }
    else
    {
      this.setState({goToEnter:true});
    }
  }
  sentOtp() 
  {
    if(!this.state.isLoading)
    {
      this.setState({isLoading:true});
      if (1) 
      {
        auth()
          .signInWithPhoneNumber(this.state.number)
          .then(confirmResult => {
            this.setState({confirmResult: confirmResult,verificationId:confirmResult.verificationId})
            this.setState({ WorngNumber : false})
            this.setState({OtpSent: true, press: true})      
            this.setState({isLoading:false});
          })
          .catch(error => {
            console.log(error.message);      
            this.setState({isLoading:false});
          })
      } 
      else 
      {
        this.setState({ WorngNumber : true})
      }
    }
  }
  async verifyOtp()
  {    
    if(!this.state.isLoading)
    {
      this.setState({isLoading:true});
      const { verificationId, code} = this.state
      //console.log(confirmResult);
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      if (code.length == 6) {
        auth()
          .signInWithCredential(credential)
          .then(async(user) => {
                  
            this.setState({isLoading:false});
            alert(`welcome user`)
            const a=this.state.number;
            this.setState({userId:user.user.uid });
            this.checkState();
            await onSignIn(user.user.uid,a);
          })
          .catch(error => {
            
            this.setState({isLoading:false});
            alert(error.message)
            console.log(error)
          })
      } 
      else 
      {  
        this.setState({OtpSent: false, press: false,verifyButtonPress:true})
      }
    }
  }
  setotp(mycode)
  {
    this.setState({code: mycode})
  }
  setNumber(myNumber)
  {
      this.setState({number:"+91"+myNumber})
  }

  render() 
  {
    
    if(this.state.goToEnter)
    {
        const { navigation } = this.props;
        navigation.navigate("EnterInfo")
    }
    if(this.state.goToSignIn)
    {
        const { navigation } = this.props;
        navigation.navigate("SignedIn",{value:"Chat"})
    }
    return ( 
      <KeyboardAvoidingView behavior="padding" style={[styles.container,{
        flexDirection: "column",
        alignItems: 'center',
      }]}>
          
            {(!this.state.OtpSent) 
                && 
            (   
                <View  >
                <View style={[styles.inputWrapper,{borderColor:"#000000",borderWidth:1,
                      width:DEVICE_WIDTH-40,alignSelf:"center", borderRadius:40}]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType = 'number-pad'
                        placeholderTextColor="#000000"
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setNumber(text)}
                    />
                </View> 
                <TouchableOpacity
                activeOpacity={1}
                style={styles.btnEye}
                onPress={this.sentOtp}>
                <Text style={styles.text}
                >
                   Send Otp
                </Text>
                </TouchableOpacity>
                </View>
                )
            }
            {this.state.OtpSent 
                && 
            (   
                <View style={{ flex: 1}} >
                <OTPInputView style={styles.inputWrapper}
                pinCount={6}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(code) => this.setotp(code) }
                />
                <TouchableOpacity
                activeOpacity={1}
                style={styles.btnEye}
                onPress={this.verifyOtp}>
                <Text style={styles.text}
                >
                    Verify Otp
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                activeOpacity={1}
                style={styles.btnEye}
                onPress={this.sentOtp}>
                <Text style={styles.text}
                >
                   ReSend Otp
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                activeOpacity={1}
                style={styles.btnEye}
                onPress={this.goToPhoneNumber}>
                <Text style={styles.text}
                >
                   Change Number
                </Text>
                </TouchableOpacity>
                </View>)
            }
        {this.state.WorngNumber &&(<View style={{ flex: 1}} ><Text style={styles.Alerttext}>
                 Please enter the valid number
            </Text></View>)}
        
        {(!this.state.correctOtp && this.state.verifyButtonPress )&&<View style={{ flex: 1}} ><Text style={styles.Alerttext}
        >
                Incorrect Otp
        </Text></View>}
        
        {this.state.isLoading && 
        <ActivityIndicator animating={true} width={DEVICE_WIDTH} backgroundColor="#ffffff" color={'#000000'} />
        }
            
      </KeyboardAvoidingView>
    );
  }
}
export default function() {
  const navigation = useNavigation();
  return <Form navigation={navigation} />;
}
const styles = StyleSheet.create({
    Alerttext:{
        color: '#ff0000',
        fontSize: 16,
        textAlign:"left",
        paddingLeft:30,
        paddingTop:20
    },
    text: {
    backgroundColor: 'rgba(200, 155, 255, 1)',
    width: 200,
    height: 40,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 20,
    color: '#ffffff',
    fontSize: 16,
    textAlign:"center"
},
    container: {
    flex: 1,
    alignItems: 'center',
    padding:20
  },
  btnEye: {
      paddingLeft:DEVICE_WIDTH/2-100,
      paddingRight:DEVICE_WIDTH/2-100,
        paddingTop:40
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    color: '#000000',
    textAlign:"center"
    },
    inputWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    },
    inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
    },
});