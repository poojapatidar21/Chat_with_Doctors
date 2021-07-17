import React,{ Component } from "react";
import { Image, View,TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";

const profilePic  =require("../images/profile-user.png");
const pooja  =require("../images/poojaPatidar.jpg");
const gourav  =require("../images/gourav.jpg");


let list=[
    {
        imageUrl:gourav,
        name:"Dr. Gourav Goel",
        specialisation:"diet_advice",
    },
    {
        imageUrl:pooja,
        name:"Dr. Pooja Patidar",
        specialisation:"nerological",
    }
]

export class ListOfDoctors extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({item}) => (
        <ListItem>
            <Image source={item.imageUrl} 
                style={{width: 100, height: 100, borderRadius: 400/ 2}} />
            <ListItem.Content>
                <ListItem.Title style={{fontSize:20}}>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{"Specialisation in "+item.specialisation}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )

    render()
    {
        return(
            <View style={{backgroundColor:"#ffffff"}}>
                <Text style={{fontSize:20, alignSelf:"center"}}>List of doctors</Text>
                <View>
                    <FlatList
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={this.keyExtractor}
                    data={list}
                    renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }

}