import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity ,
    KeyboardAvoidingView,BackHandler,
    ActivityIndicator,Dimensions} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getNumber, getUserId, onDetailsEnter, onDetailsEntered } from '../auth';
import { FlatList } from 'react-native-gesture-handler';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class EnterInfo extends Component{
    constructor(props){
        super(props);
        this.state ={
            userName: null,
            Email:null,
            userId:"",
            number: "",
            gender:null,
            genderText: "Gender",
            showGenderModal: false,
            userCategory:null,
            userCategoryText: "You are registering as",
            showuserCategoryModal:false,
            detailsComplete:false,
            loading: false,
            genderList: [{ name: "Male" }, { name: "Female" }, { name: "Other" }],
            userCategoryList:[{name:"Doctor"},{name:"Patient"}],
        };
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.addUser = this.addUser.bind(this);
        this.showGenderModal = this.showGenderModal.bind(this);
        this.onGenderSelect = this.onGenderSelect.bind(this);
        this.showuserCategoryModal = this.showuserCategoryModal.bind(this);
        this.onuserCategorySelect = this.onuserCategorySelect.bind(this);
        
        
    }
    // async componentDidMount() 
    // {
    //     await getUserId()
    //         .then(res => this.setState({ userId: res}))
    //         .catch(err => alert(err));
            
    //     console.log(this.state.userId)
    //     await getNumber()
    //         .then(res => this.setState({ number: res}))
    //         .catch(err => alert(err));  
    //     this.setState({loading:false})
    // }
    setName(name){
        this.setState({userName:name})
    }
    setEmail(email){
        this.setState({Email:email})
    }
    showGenderModal()
    {
        this.setState({showGenderModal:true});
    }
    showuserCategoryModal()
    {
        this.setState({showuserCategoryModal:true});
    }
    onGenderSelect = (item) => {  
        this.setState({showGenderModal:false});
        this.setState({genderText:item.name,genderTextColor:"#000000"});
        this.setState({gender:item.name});
    }
    onuserCategorySelect = (item) => {  
        this.setState({showuserCategoryModal:false});
        this.setState({userCategoryText:item.name,userCategoryTextColor:"#000000"});
        this.setState({userCategory:item.name});
    }
    renderGenderItem = ({item}) => {
        return (
        <TouchableOpacity
            style={{
            flexDirection: "row",
            backgroundColor: "#f3f3f3",
            padding: 15,
            paddingLeft: 5,
            alignItems: "center",
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: "rgba(0,0,0,0.2)",
            zIndex: 2,}}
            onPress={() =>this.onGenderSelect(item)}
        >
            <Text style={{
            fontWeight: "500",
            color: "#000000",
            paddingHorizontal: 20,}}>{item.name}</Text>
        </TouchableOpacity>
        )
    }
    renderuserCategoryItem = ({item}) => {
        return (
        <TouchableOpacity
            style={{
            flexDirection: "row",
            backgroundColor: "#f3f3f3",
            padding: 15,
            paddingLeft: 5,
            alignItems: "center",
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: "rgba(0,0,0,0.2)",
            zIndex: 2,}}
            onPress={() =>this.onuserCategorySelect(item)}
        >
            <Text style={{
            fontWeight: "500",
            color: "#000000",
            paddingHorizontal: 20,}}>{item.name}</Text>
        </TouchableOpacity>
        )
    }
    async addUser()
    {
        console.log(this.state.userName,this.state.Email,this.state.gender,this.state.userCategory)
        // if(!this.state.userName)
        // {
        //     alert("enter name");
        //     console.log("enter name")
        // }
        // else if(!this.state.DOB)
        // {
        //     alert("enter dob");
        //     console.log("enter dob")
        // }
        // else
        // {
        //     let option = {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             userId:this.state.userId,
        //             userName:this.state.userName,
        //             dob:this.state.DOB,
        //             number:this.state.number
        //         })
        //     }
        //     console.log(option.body);
        //     fetch(`xyz`, option)
        //     .then((response) => response.json())
        //     .then(async(response) => 
        //     {
        //         console.log(response);
        //         console.log('Data set.')
        //         if(response.statusCode===200)
        //         {
        //             this.setState({detailsComplete:true})
        //             onDetailsEntered().then(() =>{});
        //            await onDetailsEnter(this.state.userName);
        //         }
        //     });
        //     this.setState({loading:false})
        // }
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
                <TextInput style={styles.input}
                placeholder="enter your email"
                placeholderTextColor="black"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setEmail(text)}
                />
                </View>
                <TouchableOpacity
            onPress={this.showGenderModal}
            style={{ width:"80%",}}
            >
                <Text style={{
                width:"80%",
                marginVertical:10,
                minHeight: 35,
                borderBottomColor: "rgba(0, 0, 0, 0.2)",
                borderBottomWidth: 1,
                color: this.state.genderTextColor}}
                >
                {this.state.genderText}
                </Text>
                </TouchableOpacity>
                {this.state.showGenderModal &&
            <View style={styles.list}>
                <FlatList style={{
                    maxHeight: 220,
                    marginTop: 35 ,
                    width: "100%",
                    backgroundColor: "white",
                    elevation: 5,}}
                    keyExtractor={this.keyExtractor}
                    data={this.state.genderList}
                    renderItem={this.renderGenderItem}
                    >
                </FlatList>
                    </View>}
                    <TouchableOpacity
            onPress={this.showuserCategoryModal}
            style={{ width:"80%",}}
            >
                <Text style={{
                width:"80%",
                marginVertical:10,
                minHeight: 35,
                borderBottomColor: "rgba(0, 0, 0, 0.2)",
                borderBottomWidth: 1,
                color: this.state.userCategoryTextColor}}
                >
                {this.state.userCategoryText}
                </Text>
                </TouchableOpacity>
                {this.state.showuserCategoryModal &&
            <View style={styles.list}>
                <FlatList style={{
                    maxHeight: 220,
                    marginTop: 35 ,
                    width: "100%",
                    backgroundColor: "white",
                    elevation: 5,}}
                    keyExtractor={this.keyExtractor}
                    data={this.state.userCategoryList}
                    renderItem={this.renderuserCategoryItem}
                    >
                </FlatList>
            </View>}

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