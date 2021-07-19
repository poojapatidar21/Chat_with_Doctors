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
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../images/poojaPatidar.jpg")}
                        style={styles.image} resizeMode="cover"
                    />
                </View>
                <View>
                    <Text style={styles.headerText}>Pooja Patidar</Text>
                </View>
                <View>
                    <Text style={styles.textStyle}>Specialisation in Dermatology</Text>
                </View>
                <View style={{paddingTop:20}}>
                    <Text style={styles.details}>MBBS,MD,PHD</Text>
                    <Text style={styles.details}>Experience: 5 Yrs</Text>
                </View>
                <View style={{paddingTop:20}}>
                <Button title="Schedule Consultation" onPress={() => Alert.alert('Schedule')} />
                </View>
                
                <View>
                    <Text style={styles.abouts}>About</Text>
                    <Text style={styles.about}>Mentored by: Dr. Anil K. Sao and Dr. Viswanath Balakrishnan
                            Tools: Python | MySQL | Tkinter | Opencv | OS | Python Libraries
                            • It’s difficult to count the numbers of layer in microscopic image and
                            might have some error. Aim is to make it easier and precised to
                            count total number layers, width of layers, gap between them.
                            • Code will check the layers count across the drawn line by the user
                            using opencv. Developed GUI to get Interact with images.
                            • Use histogram and detect the lines as no. of peaks in the graph.</Text>
                </View>
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
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 200,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical:5,
    },
    image: {
        width: '100%' ,
        height:'100%',
        
    },
    headerText: {
        fontSize: 30,
        marginVertical: 5,
    },
    textStyle: {
        fontSize:20,
        marginVertical: 0,
        textAlign: 'center',
        opacity:0.7
    },
    details: {
        fontSize:15,
        marginVertical: 0,
        textAlign: 'center',
        opacity:0.5,
    },
    about: {
        fontSize:15,
        marginVertical: 0,
    },
    abouts: {
        fontSize: 20,
        marginVertical:10,
    },
    
});