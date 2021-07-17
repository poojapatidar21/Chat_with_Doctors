import React, {useEffect, Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { isDetailsEntered, isSignedIn } from '../auth';

import {RootNavigator} from "../router"

 class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedSignIn:false,
            signedIn:false,
            checkedDetailsEntered:false,
            detailsEntered:false,
        };
    }
    async componentDidMount() {
        await isSignedIn()
        .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
        .catch(err => alert(err));
    
        await isDetailsEntered()
            .then(res => this.setState({ detailsEntered: res, checkedDetailsEntered: true }))
            .catch(err => alert(err));

    }
    render()
    {   
        const {checkedSignIn,signedIn,detailsEntered, checkedDetailsEntered} = this.state;

        if (!(checkedSignIn && checkedDetailsEntered)) {
          return null;
        }
        return <RootNavigator signInStatus={signedIn}  detailsEntered={detailsEntered}/>;
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