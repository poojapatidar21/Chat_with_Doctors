import React ,{Component} from "react";


import {Platform, StatusBar, View, StyleSheet ,TouchableOpacity,TextInput,Dimensions, Modal,} from "react-native";

import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/Entypo';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

import {
  MenuProvider,
} from 'react-native-popup-menu';
import { MenuIcon } from "../components/Icons/MenuIcon";
import { SearchIcon } from "../components/Icons/SearchIcon";
import { LogoTitle } from "../components/Icons/logoTitle";
import { Chat } from "../components/Chats";
import { HeaderbackgroundColor, iconColour } from "./Colours";
import { Categories } from "./Categories";
import { ListOfDoctors } from "./ListOfDoctors";
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


class SignedIn extends Component {
    constructor(props)
    {
      super(props);
      this.state={
        isSearchOpen:false,
        showChats:false,
        selectedItemName:"",
      }
      this.showSearch=this.showSearch.bind(this);
      this.hideSearch=this.hideSearch.bind(this);
      this.setCategory=this.setCategory.bind(this);
      this.showChatModal=this.showChatModal.bind(this);
    }
    backAction = () => {   
        return true;
    };
    async componentDidMount() 
    {

    }

    showSearch()
    {
        this.setState({isSearchOpen:true});
        console.log(this.state.isSearchOpen);
    }
    hideSearch()
    {
      this.setState({isSearchOpen:false,searchedList:[]});
    }

    setCategory(name)
    {
      this.setState({selectedItemName:name});
    }
    showChatModal()
    {
      this.setState({showChats:true});
    }
    render()
    {
      return (
        <View style={{flex:1}}>
          <View style={{flexDirection:"row", width:DEVICE_WIDTH, justifyContent:"space-between", backgroundColor:HeaderbackgroundColor}}>
            {
            this.state.isSearchOpen
            &&
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={this.hideSearch}>
                <Icon2 style={{marginTop:10}} name={'md-arrow-back-outline'}  color={'white'} size={24}/>
              </TouchableOpacity>
              <TextInput style={{color:"white",
                                width:DEVICE_WIDTH/2,
                                borderBottomWidth:1,
                                borderBottomColor:"white",
                                fontSize:20,
                                }}
              autoFocus={true}
              onChangeText={text => this.setState({matchString: text})}
              />
            </View>
            }
            {!this.state.isSearchOpen 
              &&
              <LogoTitle/>
            }
            <View style={{alignSelf:"center", flexDirection:"row", justifyContent:"space-evenly" }}>
              <TouchableOpacity
                onPress={this.showSearch}  
              >
                <SearchIcon/>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={this.showChatModal}
              style={styles.menu}>
              <Icon name='message'color={iconColour} size={24}/>  
              </TouchableOpacity>
            </View>    
          </View>
          {this.state.showChats
          &&
            <Modal
            visible={this.state.showChats}
            onRequestClose={() => { this.setState({showChats:false})  } }
            animationType="slide">
            <Chat navigation={this.props.navigation}/>
            </Modal>
          }

          <Categories setCategory={this.setCategory}/>
          <ListOfDoctors selectedItemName={this.state.selectedItemName}/>

        </View>
        
      );
    }
}
export default function({route},props){
  const navigation = useNavigation();
  return <SignedIn navigation={navigation}/>;
}

const styles = StyleSheet.create({
  inputText:{
    color:"white",
    width:DEVICE_WIDTH/2,
    borderBottomWidth:1,
    borderBottomColor:"white",
    fontSize:20
  },
  Button:{
      paddingRight:30
  },
  menu:{
      paddingRight:20
  },
  
  menu:{
      paddingRight:20
  }
})