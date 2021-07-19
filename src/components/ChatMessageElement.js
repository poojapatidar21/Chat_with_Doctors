import React, { useRef, useState, useCallback, useEffect,Component } from 'react'
import {TouchableOpacity,BackHandler, Dimensions, FlatList, StyleSheet, View, Text, Image, KeyboardAvoidingView, TextInput,Keyboard, _Text, Button, Linking, Alert, PermissionsAndroid, Modal  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageViewer } from './ImageView';
import { StoryReplyElement } from './MessageElements/StoryReplyElement';
import { findDate } from './getDates';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;



export class ChatMessage extends Component {
  _isMounted = false;
  constructor(props)
  {
    super(props)
    this.state = {
      goToSeePhotoBoolean:false,
      picImageUrl:"",
    };
  }
  async componentDidMount() 
  {

  }
  render()
  {
    let date=findDate(this.props.item.Date);
    return (
        <View>
          {
          this.props.item.side==="right"? 
          <View style={{flexDirection:"column",color:"#ffffff",backgroundColor:"#888888", borderRadius:5 , marginLeft:"auto", marginVertical:5}}>
            
            { this.props.item.message!==undefined&&
            <Text style={styles.message}>{this.props.item.message}</Text>
            } 
            <View style={styles.messageBottom}>
              <Text style={styles.senderName}> {date} </Text>
            </View>
          </View>
          :
          <View style={{flexDirection:"column",color:"#ffffff",
              backgroundColor:"#888888", borderRadius:5, maxWidth:DEVICE_WIDTH/2,alignSelf:'flex-start',marginVertical:5}}>            
            { this.props.item.message!==undefined &&
            <Text style={styles.message}>{this.props.item.message}</Text>
            }
            <View style={styles.messageBottom}>
              <Text style={styles.senderName}> {date} </Text>
            </View>
          </View>
          }
        </View>
      )
  }
}


const styles = StyleSheet.create({
  menu:{
    right:10
  },
  profileName:{
    paddingTop:5,
    color:"white",
    fontSize:20
  },
  profilePic:{
    borderRadius:200,
    height:50,
    width:50
  },
  header:{
    top:0,
    flexDirection:"row",
    height:60,
    backgroundColor:"#222222",
    justifyContent:"space-between"
  },
  image:{
    width:300,
    height:300,
    padding:0
  },
  senderName:{
    fontSize:10,
    color:"white"
  },
  message:{
    maxWidth:300
  },
  messageElement:{
    flexDirection:"column",
    color:"#ffffff",
    backgroundColor:"#888888",
    borderRadius:5
  },
  messageBottom:{
    alignSelf:"flex-end",
    flexDirection:"row",
    justifyContent:'space-between'
  },
  messageHeader:{
    flexDirection:"row",
    justifyContent:'space-between'
  },
  bottom:{
    flexDirection:"row",
    height:50,
    bottom:1,
  },
  emoji1:{
    paddingTop:10,
    width:50,
    paddingLeft:10,
  },
  emoji2:{
    paddingTop:10,
    width:45,
  },
  emoji3:{
    paddingTop:10,
    paddingLeft:10,
    width:45,
    bottom:1,
  },
  text: {
  width: 300,
  height: 70,
  color: '#000000',
  fontSize: 20,
  textAlign:"center"
  },
  container: {
    flexDirection:"column",
  },
});