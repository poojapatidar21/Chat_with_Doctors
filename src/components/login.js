import  React,{ Component } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

import Form from './Form'
export default class Login extends Component {
    render() {
      return (
        <Form/>
      );
    }
    }
