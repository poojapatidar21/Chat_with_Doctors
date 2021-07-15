import React ,{Component} from "react";
import { Platform, StatusBar,Image, Text, View, StyleSheet ,TouchableOpacity} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import { iconColour } from "../Colours";




export class SearchIcon extends Component{
    constructor(props){
      super(props)
    }
    render(){
      return(
      <Icon
      style={styles.Button}
      name={'search'} 
      color={iconColour} 
      size={24}                                           
      />);
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