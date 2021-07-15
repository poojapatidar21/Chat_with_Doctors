import React,{ Component } from "react";
import { Image, View,TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";

const profilePic  =require("../images/profile-user.png");


let list=[
    {
        imageUrl:profilePic,
        name:"xyz",
    }
]

export class Categories extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedItemName:"",
        }
        this.onSelect=this.onSelect.bind(this);
    }

    onSelect(name)
    {
        if(this.state.selectedItemName===name)
        {
            this.setState({selectedItemName:""});
        }
        else
        {
            this.setState({selectedItemName:name});
        }
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({item}) => {
        console.log(this.state.selectedItemName,item);
        if(this.state.selectedItemName===item.name)
        {
            return(
                <ListItem onPress={() =>this.onSelect(item.name)}>
                    <View style={{flexDirection:"column",backgroundColor:"red"}}>
                        <Image source={item.imageUrl} 
                            style={{width: 60, height: 60, borderRadius: 400/ 2}} />
                        <Text style={{alignSelf:"center"}}>{item.name}</Text>
                    </View>
                </ListItem>
            )
        }
        else
        {
            return(
                <ListItem onPress={() =>this.onSelect(item.name)}>
                    <View style={{flexDirection:"column"}}>
                        <Image source={item.imageUrl} 
                            style={{width: 60, height: 60, borderRadius: 400/ 2}} />
                        <Text style={{alignSelf:"center"}}>{item.name}</Text>
                    </View>
                </ListItem>
            )
        }
    }

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
                    extraData={this.state.selectedItemName}
                    />
                </View>
            </View>
        )
    }

}