import React,{ Component } from "react";
import { Image, View,TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";

const profilePic  =require("../images/profile-user.png");


let list=[
    {
        imageUrl:profilePic,
        name:"xyz"
    }
]

export class Categories extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({item}) => (
        <ListItem>
            <View style={{height:100}}>
                <TouchableOpacity  horizontal={true}>
                    <View style={{flexDirection:"column"}}>
                        <Image source={item.imageUrl} 
                            style={{width: 60, height: 60, borderRadius: 400/ 2}} />
                        <Text>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ListItem>
    )

    render()
    {
        return(
            <View>
                <View>
                    <FlatList
                    keyboardShouldPersistTaps="handled"
                    horizontal={true}
                    keyExtractor={this.keyExtractor}
                    data={list}
                    renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }

}