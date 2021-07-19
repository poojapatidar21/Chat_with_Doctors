import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,Modal, TextInput, Button, Dimensions, Alert, } from 'react-native';

import firebase from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/Ionicons';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export class SeeProfile extends Component {

    constructor(props)
    {
        super(props);
        this.state ={
            imageUrl:null,
            name:"",
            number:"",
            goToMainProfile:false,
            isOn:true,
        }
    }
    async componentDidMount()
    {
        
    }
    render()
    {
        return(
            <View style={styles.container}>

            </View> 
        );
    }
}
const styles = StyleSheet.create({
    text: {
    paddingTop:10,
    width: 300,
    height: 40,
    fontSize: 16,
    textAlign:"left",
    borderRadius:2
},
    container: {
        flex: 1,
        alignItems: 'center',
        padding:20
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(DEVICE_WIDTH * 0.4) }, 
                    { translateY: -90 }],
        height: 180,
        width: DEVICE_WIDTH * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    },
});