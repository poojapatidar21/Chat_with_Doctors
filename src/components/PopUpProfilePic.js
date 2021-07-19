import React,{ Component } from "react";
import { Image, Modal, View ,TouchableOpacity, Text} from "react-native";

const profilePic  =require('../images/profile-user.png')
export class PopProfilePic extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            showProfilePic:false
        }
        this.showProfilePic=this.showProfilePic.bind(this);

    }
    showProfilePic()
    {
      this.setState({showProfilePic:true})
    }
    render()
    {
        return(
            <View>
                {this.props.profilePicUrl ?
                <TouchableOpacity 
                onPress={this.showProfilePic}
                >
                <Image source={this.props.profilePicUrl}
                style={{width: 60, height: 60, borderRadius: 400/ 2}} 
                />
                </TouchableOpacity>
                :
                <Image source={profilePic}
                style={{width: 60, height: 60, borderRadius: 400/ 2}} 
                />
                }
                {this.state.showProfilePic
                &&
                <Modal
                    visible={this.state.showProfilePic}
                    onRequestClose={() => { this.setState({showProfilePic:false})  } }
                    animationType="slide">
                    <View style={{flex:1, flexDirection:"column"}}>
                        <View style={{backgroundColor:"#222222"}}>
                            <Text style={{alignSelf:"center", color:"#ffffff", marginVertical:5}}>{this.props.userName}</Text>
                        </View>
                        <Image style={{flex:1}} source={this.props.profilePicUrl}/>
                    </View>
                </Modal>
                }
            </View>
        )
    }
}