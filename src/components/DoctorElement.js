import React,{ Component } from "react";
import { Image, View,TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { SeeProfile } from "./SeeProfile";



export class DoctorElement extends Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.openDoctorProfile=this.openDoctorProfile.bind(this);
    }
    openDoctorProfile()
    {
        console.log("ss")
        this.setState({openDoctorProfileModal:true})
    }
    render()
    {
        return(
            <View style={{backgroundColor:"#ffffff", flexDirection:"row"}}>
                <TouchableOpacity
                style={{ flexDirection:"row"}}
                    onPress={this.openDoctorProfile}
                >
                    <Image source={this.props.imageUrl} 
                        style={{width: 100, height: 100, borderRadius: 400/ 2}} />
                    <ListItem.Content>
                        <ListItem.Title style={{fontSize:20}}>{this.props.name}</ListItem.Title>
                        <ListItem.Subtitle>{"Specialisation in "+this.props.specialisation}</ListItem.Subtitle>
                    </ListItem.Content>
                </TouchableOpacity>
                {this.state.openDoctorProfileModal
                &&
                    <Modal
                    visible={this.state.openDoctorProfileModal}
                    onRequestClose={() => { this.setState({openDoctorProfileModal:false})  } }
                    animationType="slide">
                    <SeeProfile />
                    </Modal>
                }
            </View>
        )
    }

}