import React ,{Component} from "react";
import {PermissionsAndroid, Platform, StatusBar,Image, Text, View, StyleSheet ,TouchableOpacity,TextInput,Dimensions, ActivityIndicator} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

import {MenuProvider} from 'react-native-popup-menu';
import  SignedIn  from "./components/SignedIn";
import Login from "./components/login";
import enterInfo from "./components/enterInfo";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


export class RootNavigator extends Component
{
    constructor(props){
      super(props);
      this.state={
        isSignedIn:false,
        isDetailsEnter:false,
        loading:false,
        userId:"",
      }
    }
    async componentDidMount () 
    {
         
    }
    render()
    {
      console.log(this.state.loading);
      if(this.state.loading)
      {
          return(
          <View style={{flex:1,alignSelf:"center",top:DEVICE_HEIGHT/2-10}}>
          <ActivityIndicator animating={true} color={'#000000'} >
          </ActivityIndicator>
          <Text> Fecthing Details</Text>
          </View>
          )
      }
      return (
        <MenuProvider>
          <NavigationContainer>
              <Stack.Navigator 
              // initialRouteName={(this.state.isSignedIn===true)?((this.state.isDetailsEnter===true)?"SignedIn":"EnterInfo"):"Login"}
              initialRouteName={"enterInfo"}
              >        
                <Stack.Screen name="SignedIn" options={{headerShown: false}} component= {SignedIn}/>
              <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
              <Stack.Screen name="enterInfo" options={{headerShown: false}} component= {enterInfo}/>
              </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
        )
    }
};
