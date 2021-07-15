import React, { Component } from 'react';
import { Text, View,BackHandler, StyleSheet, FlatList, ListViewBase,Image,Button,TouchableOpacity, PermissionsAndroid, Modal, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { ListItem, Avatar,con } from 'react-native-elements'
const profilePic  =require('../images/profile-user.png')

import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';



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
        this.goToSearchContacts=this.goToSearchContacts.bind(this);
        this.getList=this.getList.bind(this);
        this.onRefresh=this.onRefresh.bind(this);
        this.renderItem=this.renderItem.bind(this);
        this.loadMoreResult=this.loadMoreResult.bind(this);
    }

    async componentDidMount() {
      
      let myUserId = await getUserId();
      this.setState({ myuserId: myUserId})
      
      if(this.props.isFocused)
      {
        this.setState({isFetching:true});
        let res1 = await fetch(`https://nociw.herokuapp.com/chatList?id=${this.state.myuserId}`);  
        let jsonResponse=await res1.json();
        if(jsonResponse.statusCode===200)
        {
          if(jsonResponse.chat.length<10)
          {
            this.setState({noMoreData:true});
          }
          if(jsonResponse.length>0)
          this.setState({lastpostfetchDate:jsonResponse.chat[jsonResponse.chat.length-1].LastUpdate});
          
          let chat=jsonResponse.chat;
          for(let i=0;i<chat.length;i++)
          { 
            if(chat[i].userId2)
            {
              let imageName = `${chat[i].userId2}dp.jpg`;
              let imageRef =storage().ref(imageName);
              await imageRef
              .getDownloadURL()
              .then((url) => {
                chat[i].imageUrl=url   
              })
              .catch((e) =>{
              });  
              let userName =await GetUserName2(chat[i].number);
              chat[i].userName=userName;
              this.setState({chatList:[...this.state.chatList,chat[i]]});
            }      
          }
          this.setState({stopFetching:false,isFetching:false});
        }
      }
    }
    async loadMoreResult(distanceFromEnd)
    {
      if(this.state.noMoreData===false && this.state.stopFetching===false)
      {
        this.setState({stopFetching:true,isFetching:true});
        let res1 = await fetch(`https://nociw.herokuapp.com/chatListFetchMore?id=${this.state.myuserId}`);  
        let jsonResponse=await res1.json();
        if(jsonResponse.statusCode===200)
        {
          if(jsonResponse.chat.length<10)
          {
            this.setState({noMoreData:true});
          }
          if(jsonResponse.length>0)
          this.setState({lastpostfetchDate:jsonResponse.chat[jsonResponse.chat.length-1].LastUpdate});
          
          let chat=jsonResponse.chat;
          for(let i=0;i<chat.length;i++)
          { 
            if(chat[i].userId2)
            {
              let imageName = `${chat[i].userId2}dp.jpg`;
              let imageRef =storage().ref(imageName);
              await imageRef
              .getDownloadURL()
              .then((url) => {
                chat[i].imageUrl=url   
              })
              .catch((e) =>{
              });  
              let userName =await GetUserName2(chat[i].number);
              chat[i].userName=userName;
              this.setState({chatList:[...this.state.chatList,chat[i]]});
            }      
          }
          this.setState({stopFetching:false,isFetching:false});
        }
      }
    }

    async onRefresh()
    {
      this.setState({refreshing:true});
      let res1 = await fetch(`https://nociw.herokuapp.com/chatList?id=${this.state.myuserId}`);  
      let jsonResponse=await res1.json();
      if(jsonResponse.statusCode===200)
      {
        let chat=jsonResponse.chat;
        await GetlistOfChatsfromServer(chat).then(async(chatList)=>{
          this.setState({chatList:chatList});
        })
      }
      this.setState({refreshing:false});
    }
    async goToChat(item)
    {   
      const {navigation} =this.props;
      navigation.navigate("ChatBox",{
        userId: item.userId2,
        userName:item.userName,
        number:item.number,
        chatId:item.chatId
      })
    }
    keyExtractor = (item, index) => index.toString()
    renderItem({item}){

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

    goToSearchContacts()
    {
      const {navigation} =this.props;
      navigation.navigate("SearchContacts")
    }
    render()
    {
        return(
        <View style={{flex:1}}>
        <FlatList 
        onEndReachedThreshold={0.01}
        onEndReached={({ distanceFromEnd })=>{this.loadMoreResult(distanceFromEnd)}}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
        keyExtractor={this.keyExtractor}
        data={this.state.chatList}
        renderItem={this.renderItem}
        />
        <TouchableOpacity 
            onPress={this.goToSearchContacts}
            style={styles.buttonStyle}>
            <Icon2 name={"add-circle"} size={50} />
        </TouchableOpacity>      
        
        {this.state.goToSearchContacts
        &&
            <Modal
            visible={this.state.goToSearchContacts}
            onRequestClose={() => { this.setState({goToSearchContacts:false})  } }
            animationType="slide">
            <SearchContacts/>
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