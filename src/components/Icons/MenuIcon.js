import React ,{Component} from "react";
import Icon from 'react-native-vector-icons/Entypo';

import { Platform, StatusBar,Image, Text, View, StyleSheet ,TouchableOpacity, Modal} from "react-native";

import { iconColour } from "../Colours";

export class MenuIcon extends Component{
    constructor(props){
      super(props)
      this.state={
        showSavedPostModal:false,
        showMyPromosModal:false,
      }

      this.showSavedPost=this.showSavedPost.bind(this);
      this.showMyPromos=this.showMyPromos.bind(this);

    }

    showSavedPost()
    {
      this.setState({showSavedPostModal:true})
    }

    showMyPromos()
    {
      this.setState({showMyPromosModal:true})
    }

    render(){
      console.log(this.props.title)
      console.log(this.state.showSavedPostModal)
      return(
        <View style={styles.menu}>
          <Icon name='message'color={iconColour} size={24}/>  
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    Button:{
        paddingRight:30
    },
    menu:{
        paddingRight:20
    }
  })