import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity ,
    KeyboardAvoidingView,BackHandler,
    ActivityIndicator,Dimensions} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getNumber, getUserId, onDetailsEnter, onDetailsEntered } from '../auth';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class EnterInfo extends Component{
    constructor(props){
        super(props);
        this.state ={
            userName:null,
            userId:"",
            number:"",
            detailsComplete:false,
            loading:true,
        };
        this.setName = this.setName.bind(this);
        this.setDOB = this.setDOB.bind(this);
        this.addUser = this.addUser.bind(this);
        this.showPicker = this.showPicker.bind(this);
        
    }
    async componentDidMount() 
    {
        await getUserId()
            .then(res => this.setState({ userId: res}))
            .catch(err => alert(err));
            
        console.log(this.state.userId)
        await getNumber()
            .then(res => this.setState({ number: res}))
            .catch(err => alert(err));  
        this.setState({loading:false})
    }
    setName(name){
        this.setState({userName:name})
    }
    async addUser()
    {
        if(!this.state.userName)
        {
            alert("enter name");
            console.log("enter name")
        }
        else if(!this.state.DOB)
        {
            alert("enter dob");
            console.log("enter dob")
        }
        else
        {
            let option = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId:this.state.userId,
                    userName:this.state.userName,
                    dob:this.state.DOB,
                    number:this.state.number
                })
            }
            console.log(option.body);
            fetch(`https://nociw.herokuapp.com/addUser`, option)
            .then((response) => response.json())
            .then(async(response) => 
            {
                console.log(response);
                console.log('Data set.')
                if(response.statusCode===200)
                {
                    this.setState({detailsComplete:true})
                    onDetailsEntered().then(() =>{});
                   await onDetailsEnter(this.state.userName);
                }
            });
            this.setState({loading:false})
        }
    }
    render()
    {
        if(this.state.loading)
        {
            return(
            <View style={{flex:1,alignSelf:"center",top:DEVICE_HEIGHT/2-10}}>
            <ActivityIndicator animating={true} color={'#000000'} >
            </ActivityIndicator>
            <Text> Fecthing Details</Text>
            </View>
            )}
        else
        {
            if(this.state.detailsComplete)
            {
                const {navigation} =this.props;        
                navigation.navigate("SignedIn",{value:"Chat"})
            }
        return(
            <KeyboardAvoidingView behavior="padding" style={[styles.container,{
                flexDirection: "column",
              }]}>
                <View style={styles.inputwrapper}>
                <TextInput style={styles.input}
                placeholder="enter your name"
                placeholderTextColor="black"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setName(text)}
                />
                </View>
                <View style={styles.inputwrapper}>
                    
                </View>

                <TouchableOpacity
                activeOpacity={1}
                onPress={this.addUser}>
                <Text style={styles.text}
                >
                   Continue
                </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView> 
            );
        }
    }

}

export default function({}) {
    const navigation = useNavigation();
    return <EnterInfo navigation={navigation} />;
  }

const styles = StyleSheet.create({
    inputwrapper:{
        
        padding:20
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
    input:{
        textAlign:"center",
        borderColor: "rgba(0, 0, 0, 1)",
        borderRadius:40,
        borderWidth:1,
        height:50,
        width:200,
    },
    container: {
    flex: 1,
    alignItems: 'center',
    padding:40,
    justifyContent:"flex-start"
  },
});