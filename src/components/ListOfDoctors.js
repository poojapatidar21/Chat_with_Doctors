import React,{ Component } from "react";
import { Image, View,TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";

const profilePic  =require("../images/profile-user.png");


let list=[
    {
        imageUrl:profilePic,
        name:"xyz",
        specialisation:"fghjkjhgfdrtyuil",
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
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.specialisation}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )

    render()
    {
        return(
            <View>
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