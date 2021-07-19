import React, { useRef, useState, useCallback, useEffect,Component } from 'react'
import {TouchableOpacity,BackHandler, Dimensions, FlatList, StyleSheet, View, Text, Image, KeyboardAvoidingView, TextInput,Keyboard, _Text, Button, Linking, Alert, PermissionsAndroid, Modal, ActivityIndicator  } from 'react-native';
import { ScrollView,} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { ListItem, Avatar} from 'react-native-elements'
import firebase from '@react-native-firebase/app';
const profilePic  =require('../images/profile-user.png');

import { useNavigation } from '@react-navigation/native';

// import ImageResizer from 'react-native-image-resizer';

import { getchats, getUserId, saveChatList } from '../auth';
import { isDetailsEntered, isSignedIn, saveChat } from "../auth";
import { ChatMessage } from './ChatMessageElement';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;



export default class ChatBox extends Component {
  _isMounted = false;
  constructor(props)
  {
    super(props)
    this.state = {
      keyboardOffset: 0,
      imageUrl:null,
      isMessageTyped:false,
      height:60,
      inputMessage:"",
      myUserId:"",
      chatId:"",
      chatExist:"",
      MessageList:[],
      userName:props.userName,
      userId:props.userId,
      number:props.number,
      message:props.message,
      uploading:false,
      url:"",
      goToSeeProfile:false,
      showEmojiKeyboard:false,
      goToSeePhotoBoolean:false,
      picImageUrl:"",
      noMoreData:false,
      lastMessageFetchDate:"",
      shouldFetchNow:false,
      isLoading:false,
    };
    this._keyboardDidShow=this._keyboardDidShow.bind(this);
    this._keyboardDidHide=this._keyboardDidHide.bind(this);
    this.sendMessage=this.sendMessage.bind(this);
    this.goToSeeProfile=this.goToSeeProfile.bind(this);
    this.addMessage=this.addMessage.bind(this);
    this.seenAllMessage=this.seenAllMessage.bind(this);
    this.fetchMore=this.fetchMore.bind(this);
  }
  keyExtractorPost = (item, index) => index.toString()

  componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
      this.props.onRef(undefined);
  }

  _keyboardDidShow(event) {
      this.setState({
          keyboardOffset: event.endCoordinates.height+40,
      })
  }

  _keyboardDidHide() {
      this.setState({
          keyboardOffset: 0,
      })
  }
    backAction = () => {
       
        this.props.navigation.navigate("SignedIn",{value:"Chat"})
    };
  async addMessage(message)
  {
      if(message.chatId===this.state.chatId)
      {
        this.seenAllMessage();
        message.side="left";
        let imgUrl =message.imageUrl;
        if(imgUrl)
        {
            let index1 = imgUrl.lastIndexOf('/');
            let index2 = imgUrl.lastIndexOf('?');
            let imageName = imgUrl.substring(index1,index2);
            let dirs = RNFetchBlob.fs.dirs;
            let path = `${dirs.PictureDir}/nociw${imageName}`;
            
            await RNFS.exists(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((result) => {
              message.imageDownLoaded=path
            })
        }
        this.setState({MessageList:[message,...this.state.MessageList]});
      }
  }

  seenAllMessage()
  {
    let option = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          userId:this.state.myUserId,
          chatId:this.state.chatId,
      })
    }
    fetch(`https://nociw.herokuapp.com/clearNotifications`, option)
    .then((response) => response.json())
    .then(async(response) => 
    {
    });
  }


  async componentDidMount() 
  {
    
    this.props.onRef(this);
    await getUserId()
        .then(res => this.setState({ myUserId: res}))
        .catch(err => alert(err));

    let chatId;
    if(this.state.myUserId<this.state.userId)
    {
      chatId=`${this.state.myUserId}-${this.props.userId}`
    }
    else
    {
      chatId=`${this.props.userId}-${this.state.myUserId}`
    }
    this.setState({chatId:chatId});
    if(this.state.userId)
    {
      this.seenAllMessage();
    }
    this.setState({chatId:chatId});
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    this._isMounted = true;
    this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
    );
    
    if(this.state.userId)
    {
      let imageName = `${this.state.userId}dp.jpg`
      let imageRef = firebase.storage().ref(imageName);
      imageRef
        .getDownloadURL()
        .then((url) => {
          //from url you can fetched the uploaded image easily
          this.setState({imageUrl: url});
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));
    }  
    
    this.setState({isLoading:true});
      let res1 = await fetch(`https://nociw.herokuapp.com/chatMessages?id=${chatId}`);  
      let jsonResponse=await res1.json();
      if(jsonResponse.statusCode===200)
      {
        let chat=jsonResponse.chat;
        let chats=[];
        if(chat.length<20)
        {
          this.setState({noMoreData:true});
        }
        this.setState({lastMessageFetchDate:chat[0].Date});
        console.log(this.state.lastMessageFetchDate);
        for(let i=0;i<chat.length;i++)
        {
          let message=chat[chat.length-1-i];
          if(message.MessageBy===this.state.myUserId)
          {
            message.side="right";
          }
          else
          {
            message.side="left";
          }
          let imgUrl =message.imageUrl;
          if(imgUrl)
          {
              let index1 = imgUrl.lastIndexOf('/');
              let index2 = imgUrl.lastIndexOf('?');
              let imageName = imgUrl.substring(index1,index2);
              let dirs = RNFetchBlob.fs.dirs;
              let path = `${dirs.PictureDir}/nociw${imageName}`;
              
              await RNFS.exists(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
              .then((result) => {
                message.imageDownLoaded=path
              })
          }
          this.setState({MessageList:[...this.state.MessageList,message]});
        }
        
        this.setState({isLoading:false});
        this.setState({shouldFetchNow:true});
      }
      
  }

  fetchMore = async(distanceFromEnd)=>
  {
    this.setState({isLoading:true});
    if(this.state.noMoreData===false && this.state.shouldFetchNow)
    {
      this.setState({shouldFetchNow:false});
      let res1 = await fetch(`https://x.herokuapp.com/chatMessagesfetchMore?id=${this.state.chatId}&date=${this.state.lastMessageFetchDate}`);  
      let jsonResponse=await res1.json();
      if(jsonResponse.statusCode===200)
      {
        let chat=jsonResponse.chat;
        let chats=[];
        if(chat.length<20)
        {
          this.setState({noMoreData:true});
        }
        this.setState({lastMessageFetchDate:chat[chat.length-1].Date});
        console.log(chat);
        console.log(chat.length);
        for(let i=chat.length-1;i>=0;i--)
        {
          let message=chat[i];
          if(message.MessageBy===this.state.myUserId)
          {
            message.side="right";
          }
          else
          {
            message.side="left";
          }
          let imgUrl =message.imageUrl;
          if(imgUrl)
          {
              let index1 = imgUrl.lastIndexOf('/');
              let index2 = imgUrl.lastIndexOf('?');
              let imageName = imgUrl.substring(index1,index2);
              let dirs = RNFetchBlob.fs.dirs;
              let path = `${dirs.PictureDir}/nociw${imageName}`;
              
              await RNFS.exists(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
              .then((result) => {
                message.imageDownLoaded=path
              })
          }
          console.log(message);
          this.setState({MessageList:[...this.state.MessageList,message],isLoading:false});
        }
        this.setState({shouldFetchNow:true});
      }
    }  
    else
    {
      this.setState({isLoading:false});
    }    
  }

  goToSeeProfile()
  {
    this.setState({goToSeeProfile:true});
  }
  
  inputMessageChange(message)
  {
    if(message.length==0)
    {
      this.setState({isMessageTyped:false})
    }
    else
    {
      this.setState({isMessageTyped:true})
    }
    this.setState({inputMessage:message});
  }
  updateSize = (height) => {
    if(height>300)
    {
      height=300
    }
    this.setState({
      height
    });
  }
  async sendMessage()
  { 
    var date = new Date();
    let messageInside={
      "MessageBy":this.state.myUserId,
      "message":this.state.inputMessage,
      "Date": `${date}`,
      "chatId":this.state.chatId,
    }
    this.setState({inputMessage:""});
    // let message={
    //   "message":messageInside,
    //   "senderId":this.state.myUserId,
    // }
    // this.setState({MessageList:[...this.state.MessageList,messageInside]});

    let message=messageInside;
    let message2= JSON.parse(JSON.stringify(messageInside));
    
    // saveChat(this.state.chatId,message2);
    // saveChatList(this.state.chatId,message2);
    if(message.MessageBy===this.state.myUserId)
    {
      message.side="right";
    }
    else
    {
      message.side="left";
    }
    let imgUrl =message.imageUrl;
    if(imgUrl)
    {
        let index1 = imgUrl.lastIndexOf('/');
        let index2 = imgUrl.lastIndexOf('?');
        let imageName = imgUrl.substring(index1,index2);
        let dirs = RNFetchBlob.fs.dirs;
        let path = `${dirs.PictureDir}/nociw${imageName}`;
        
        await RNFS.exists(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
          message.imageDownLoaded=path
        })
    }
    this.setState({MessageList:[message,...this.state.MessageList]});
    let chatMessage = this.state.inputMessage;
    let messageLength=chatMessage.length;
    if(messageLength>30)
      messageLength=30
    chatMessage=chatMessage.substring(0,messageLength);

    let option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId:this.state.userId,
            messageInside:message2,
            myUserId:this.state.myUserId
        })
    }
    // fetch(`https://nociw.herokuapp.com/addMessageToChat`, option)
    // .then((response) => response.json())
    // .then(async(response) => 
    // {
    //     if(response.statusCode===200)
    //     {
    //     }
    // });
  }
  render()
  {
    if (this.state.userId !== this.props.userId) {
        this.setState({userId:this.props.userId}) 
    }
    if(this.state.userId && this.state.imageUrl===null)
    {
      let imageName = `${this.state.userId}dp.jpg`
      let imageRef = firebase.storage().ref(imageName);
      imageRef
        .getDownloadURL()
        .then((url) => {
          //from url you can fetched the uploaded image easily
          this.setState({imageUrl: url});
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));
    }
    
    return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.goToSeeProfile} style={styles.header}>
            {this.state.imageUrl?
              <Image style={styles.profilePic} source={{uri:this.state.imageUrl}}/>:
              <Image style={styles.profilePic} source={profilePic}/>
            }
            <Text style={styles.profileName}> {this.props.userName} </Text>
            <Icon style={styles.menu} name='ellipsis-v' color={'white'} size={24}/>
          </TouchableOpacity>
          <View style={styles.MessageContainer,{
            height:DEVICE_HEIGHT-50-this.state.height-this.state.keyboardOffset}}>  
            {this.state.isLoading &&
                <ActivityIndicator animating={true} width={DEVICE_WIDTH} backgroundColor="#ffffff" color={'#000000'} />
              }        
                <FlatList style={{
                backgroundColor: 'rgba(52, 52, 52, 0)'}}
                ref={ref => this.flatList = ref}
                // onContentSizeChange={(event) => this.flatList.scrollToEnd({animated: true})}
                inverted={true}
                maintainVisibleContentPosition={true}
                onEndReachedThreshold={0.5}
                onEndReached={({ distanceFromEnd })=>{this.fetchMore(distanceFromEnd)}}
                // onLayout={() => this.flatList.scrollToOffset({offset:0,animated: true})}
                keyExtractor={this.keyExtractorPost}
                data={this.state.MessageList}
                // maxToRenderPerBatch={10}
                renderItem={({item})=><ChatMessage item={item}/>}
              />
          </View>
          <View style={{flexDirection:"row", height:50, bottom:1,borderColor:"#000000",borderWidth:1, padding:1}}>
            <View style={{flexDirection:"row", backgroundColor:"#888888", height:50, bottom:1, borderColor:"#000000",
              width:DEVICE_WIDTH-50, alignSelf:'flex-start', paddingLeft:10,height:this.state.height}}>
                <TextInput style={{color:"white", fontSize:18, width:DEVICE_WIDTH-200, 
                  maxHeight:300, height:this.state.height,width:DEVICE_WIDTH-200}}
                  editable={true}
                  multiline={true}
                  onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                  placeholder="write a message" 
                  onChangeText={text => this.inputMessageChange(text)}
                  value={this.state.inputMessage}
                  placeholderTextColor="white"
                  onSubmitEditing={Keyboard.dismiss}
                />    
            </View>
            <TouchableOpacity onPress={this.sendMessage}>
              <Icon style={styles.emoji2} name={'send'}  color={'black'} size={24}/>
            </TouchableOpacity>
          </View>
        
        </View>
        </KeyboardAvoidingView>
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
    flex:1,
    flexDirection:"column",
  },
});