import React ,{Component} from "react";
import { Platform, StatusBar,Image, Text, View, StyleSheet ,TouchableOpacity, Modal} from "react-native";
import { HeaderbackgroundColor } from "../Colours";

const profilePic  =require("../../images/profile-user.png");

export class  LogoTitle extends Component {
    constructor(props)
    {
      super(props);
      this.state={
        goToSetProfileBoolean:false
      }
      this.goToSetProfile=this.goToSetProfile.bind(this);
    }
    goToSetProfile()
    {
      this.setState({goToSetProfileBoolean:true})
    }
    render()
    {
      return (
        <View>
          <Image source={profilePic} style={{width:50,height:50, backgroundColor:HeaderbackgroundColor}}/>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    text:{
      color:"#ffffff",
      fontSize:20,
      paddingTop:10,
      paddingLeft:15
    },
    container:{
      flexDirection:"row"
    },
    Button:{
        paddingRight:30
    },
    menu:{
        paddingRight:20
    }
  })