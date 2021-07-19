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
        specialisation:"Diet & Nutrition",
    },
    {
        imageUrl:pooja,
        name:"Dr. Pooja Patidar",
        specialisation:"Dermatologist",
    }
]

export class ListOfDoctors extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedItemName:undefined,
            list:list,
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

    getList(name)
    {
        if(name==="")
        {
            this.setState({list:list});
        }
        else
        {
            console.log(list);
            let list1 = list.filter((item) => {
                return item.specialisation.toLowerCase()===name.toLowerCase()
              })
            this.setState({list:list1});
        }
    }

    render()
    {
        console.log(this.state.selectedItemName,this.props.selectedItemName)
        if(this.state.selectedItemName!==this.props.selectedItemName)
        {
            this.getList(this.props.selectedItemName);
            this.setState({selectedItemName:this.props.selectedItemName});
        }
        return(
            <View style={{backgroundColor:"#ffffff"}}>
                <Text style={{fontSize:20, alignSelf:"center"}}>List of doctors</Text>
                <View>
                    <FlatList
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={this.keyExtractor}
                    data={this.state.list}
                    renderItem={this.renderItem}
                    extraData={this.props.selectedItemName}
                    />
                </View>
            </View>
        )
    }

}