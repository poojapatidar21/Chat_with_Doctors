import React, {useEffect, Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {RootNavigator} from "../router"

 class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    async componentDidMount() {

    }
    render()
    {   
        return <RootNavigator/>;
    }
}   

const styles = StyleSheet.create({  
    text: {
    backgroundColor: 'rgba(200, 155, 255, 1)',
    width: 200,
    height: 40,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 20,
    color: '#ffffff',
    fontSize: 16,
    textAlign:"center"
    },
    container: {
    flex: 1,
    alignItems: 'center',
    padding:20
  },
});

const App = () => {
    return <Main/>;
  };
  
  export default App;