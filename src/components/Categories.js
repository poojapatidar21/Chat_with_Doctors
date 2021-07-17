import React,{ Component } from "react";
import { Image, View,TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";

const profilePic  =require("../images/profile-user.png");
const pediatric =require("../images/pediatric.png");
const dermatologist =require("../images/dermatologist.jpg");
const diet_advice =require("../images/diet_advice.png");
const gastronterology =require("../images/gastronterology.png");
const gynocology =require("../images/gynocology.png");
const homeopathy =require("../images/homeopathy.jpg");
const medical =require("../images/medical.jpg");
const nerological =require("../images/nerological.png");
const psychiatry =require("../images/psychiatry.png");
const sexology =require("../images/sexology.jpg");

let list=[
    {
        imageUrl:pediatric,
        name:"pediatric",
    },
    {
        imageUrl:dermatologist,
        name:"dermatologist",
    },
    {
        imageUrl:diet_advice,
        name:"diet_advice",
    },
    {
        imageUrl:gastronterology,
        name:"gastronterology",
    },
    {
        imageUrl:gynocology,
        name:"gynocology",
    },
    {
        imageUrl:homeopathy,
        name:"homeopathy",
    },{
        imageUrl:medical,
        name:"medical",
    },{
        imageUrl:nerological,
        name:"nerological",
    },{
        imageUrl:psychiatry,
        name:"psychiatry",
    },{
        imageUrl:sexology,
        name:"sexology",
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
            this.props.setCategory("");
        }
        else
        {
            this.setState({selectedItemName:name});
            this.props.setCategory(name);
        }
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({item}) => {
        if(this.state.selectedItemName===item.name)
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
        else
        {
            return(
                <ListItem onPress={() =>this.onSelect(item.name)}>
                    <View style={{flexDirection:"column"}} opacity={0.5}>
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