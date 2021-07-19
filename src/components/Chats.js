import React, { Component } from 'react';
import { Text, View,Dimensions,BackHandler, StyleSheet, FlatList, ListViewBase,Image,Button,TouchableOpacity, PermissionsAndroid, Modal, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { ListItem, Avatar,con } from 'react-native-elements'
const profilePic  =require('../images/profile-user.png')
let pooja  =require("../images/poojaPatidar.jpg");
let gourav  =require("../images/gourav.jpg");

import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { findDate } from './getDates';
import { PopProfilePic } from './PopUpProfilePic';
import ChatBox from './ChatBox';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


let list=[
  {
      imageUrl:gourav,
      userName:"Dr. Gourav Goel",
      lastMessage:"kaisi hai",
      totalCount:1
  },
  {
      imageUrl:pooja,
      userName:"Dr. Pooja Patidar",
      lastMessage:"kaisi hai",
      totalCount:2
  }
]

export class Chat extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            goToChatBoolean:false,
            chatid:"",
            searchedList:[],
            OtherUserId:"",
            OtherUserName:"",
            imageUrl:"",
            myuserId:"",
            userState:"",
            OtherUserNumber:"",
            chatList:[],
            reload:false,
            goToSearchContacts:false,
            previousChatListLength:0,
            previousMatchString:"",
            refreshing:false,
            lastpostfetchDate:"",
            noMoreData:false,
            stopFetching:true,
            isFetching:false,
        }
        this.goToChat = this.goToChat.bind(this);
        this.getList=this.getList.bind(this);
        this.onRefresh=this.onRefresh.bind(this);
        this.renderItem=this.renderItem.bind(this);
        this.loadMoreResult=this.loadMoreResult.bind(this);
    }

    async componentDidMount() {
      this.setState({isFetching:true});
      // let res1 = await fetch(`x/chatList?id=${this.state.myuserId}`);  
      // let jsonResponse=await res1.json();
      // if(jsonResponse.statusCode===200)
      // {
      //   if(jsonResponse.chat.length<10)
      //   {
      //     this.setState({noMoreData:true});
      //   }
      //   if(jsonResponse.length>0)
      //   this.setState({lastpostfetchDate:jsonResponse.chat[jsonResponse.chat.length-1].LastUpdate});
        
      //   let chat=jsonResponse.chat;
      //   for(let i=0;i<chat.length;i++)
      //   { 
      //     if(chat[i].userId2)
      //     {
      //       let imageName = `${chat[i].userId2}dp.jpg`;
      //       let imageRef =storage().ref(imageName);
      //       await imageRef
      //       .getDownloadURL()
      //       .then((url) => {
      //         chat[i].imageUrl=url   
      //       })
      //       .catch((e) =>{
      //       });  
      //       let userName =await GetUserName2(chat[i].number);
      //       chat[i].userName=userName;
      //       this.setState({chatList:[...this.state.chatList,chat[i]]});
      //     }      
      //   }
      //   this.setState({stopFetching:false,isFetching:false});
      // }
    }
    async loadMoreResult(distanceFromEnd)
    {
      if(this.state.noMoreData===false && this.state.stopFetching===false)
      {
        this.setState({stopFetching:true,isFetching:true});
        // let res1 = await fetch(`x/chatListFetchMore?id=${this.state.myuserId}`);  
        // let jsonResponse=await res1.json();
        // if(jsonResponse.statusCode===200)
        // {
        //   if(jsonResponse.chat.length<10)
        //   {
        //     this.setState({noMoreData:true});
        //   }
        //   if(jsonResponse.length>0)
        //   this.setState({lastpostfetchDate:jsonResponse.chat[jsonResponse.chat.length-1].LastUpdate});
          
        //   let chat=jsonResponse.chat;
        //   for(let i=0;i<chat.length;i++)
        //   { 
        //     if(chat[i].userId2)
        //     {
        //       let imageName = `${chat[i].userId2}dp.jpg`;
        //       let imageRef =storage().ref(imageName);
        //       await imageRef
        //       .getDownloadURL()
        //       .then((url) => {
        //         chat[i].imageUrl=url   
        //       })
        //       .catch((e) =>{
        //       });  
        //       let userName =await GetUserName2(chat[i].number);
        //       chat[i].userName=userName;
        //       this.setState({chatList:[...this.state.chatList,chat[i]]});
        //     }      
        //   }
        //   this.setState({stopFetching:false,isFetching:false});
        // }
      }
    }

    async getList()
    {
      
    }

    async onRefresh()
    {
      this.setState({refreshing:true});
      // let res1 = await fetch(`x/chatList?id=${this.state.myuserId}`);  
      // let jsonResponse=await res1.json();
      // if(jsonResponse.statusCode===200)
      // {
      //   let chat=jsonResponse.chat;
      //   await GetlistOfChatsfromServer(chat).then(async(chatList)=>{
      //     this.setState({chatList:chatList});
      //   })
      // }
      this.setState({refreshing:false});
    }
    async goToChat(item)
    {   
      // userId: item.userId2,
      //   userName:item.userName,
      //   number:item.number,
      //   chatId:item.chatId
      this.setState({goToChatBoolean:true});
    }
    keyExtractor = (item, index) => index.toString()
    renderItem({item}){
      console.log(item);
      let date=findDate(item.LastUpdate)
      return(
        <ListItem onPress={() =>this.goToChat(item)}>
        <PopProfilePic profilePicUrl= {item.imageUrl} userName={item.userName}/>
        <ListItem.Content>
        <ListItem.Title>{item.userName}</ListItem.Title>
        <ListItem.Subtitle>{item.lastMessage}</ListItem.Subtitle>
        <View style={styles.subtitleView}>
        <Text style={styles.ratingText}>
        {date}  
        </Text>
        </View>
        </ListItem.Content>
        {item.totalCount!==0 &&<Text style={{borderRadius:200, size:30,backgroundColor:"#00ff00"}}> {item.totalCount}</Text>}
        <Icon name="arrow-right" size={24} color="#C8C7CC" />
        </ListItem>
      )
    }

    render()
    {
        return(
        <View style={{flex:1}}>
          <View style={{width:DEVICE_WIDTH, backgroundColor:"#999999"}}>
            <Text style={{fontSize:20,alignSelf:"center"}}>Your ChatList</Text>
          </View>
          <FlatList 
          onEndReachedThreshold={0.01}
          onEndReached={({ distanceFromEnd })=>{this.loadMoreResult(distanceFromEnd)}}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
          />
          {this.state.goToChatBoolean
          &&
            <Modal
            visible={this.state.goToChatBoolean}
            onRequestClose={() => { this.setState({goToChatBoolean:false})  } }
            animationType="slide">
            <ChatBox navigation={this.props.navigation}/>
            </Modal>
          }
        </View>
        )
    }
}

const styles = StyleSheet.create({
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
buttonStyle : {
  position: 'absolute',
  bottom: 20,
  right: 20
},
buttonTextStyle : {
  alignSelf:"center",
  color:'white',
  fontSize: 45,
  marginBottom: 10
},
    container: {
    flex: 1,
    alignItems: 'center',
    padding:20
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }

});