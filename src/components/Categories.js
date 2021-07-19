/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, View, FlatList, Text} from 'react-native';
import {ListItem} from 'react-native-elements';

// const profilePic = require("../images/profile-user.png");
const dermatologist = require('../images/dermatologist.jpg');
const diet_advice = require('../images/diet_advice.png');
const gastronterology = require('../images/gastronterology.png');
const gynocology = require('../images/gynocology.png');
const homeopathy = require('../images/homeopathy.jpg');
const medical = require('../images/medical.jpg');
const pediatric = require('../images/pediatric.png');
const psychiatry = require('../images/psychiatry.png');
const sexology = require('../images/sexology.jpg');
const orthopedic = require('../images/orthopedic.jpg');
const opthalmologist = require('../images/opthalmologist.jpg');
const dentist = require('../images/dentist.jpg');
const urologist = require('../images/urology.png');
const ayurveda = require('../images/ayurveda.jpg');
const surgeon = require('../images/surgeon.jpg');

let list = [
  {
    imageUrl: ayurveda,
    name: 'Ayurveda',
  },
  {
    imageUrl: dermatologist,
    name: 'Dermatologist',
  },
  {
    imageUrl: dentist,
    name: 'Dentist',
  },
  {
    imageUrl: diet_advice,
    name: 'Diet & Nutrition ',
  },
  {
    imageUrl: gastronterology,
    name: 'Gastroenterologist',
  },
  {
    imageUrl: gynocology,
    name: 'Gynaecologist',
  },
  {
    imageUrl: homeopathy,
    name: 'Homeopath',
  },
  {
    imageUrl: medical,
    name: 'General Physician',
  },
  {
    imageUrl: orthopedic,
    name: 'Orthopedic',
  },
  {
    imageUrl: opthalmologist,
    name: 'Opthalmologist',
  },
  {
    imageUrl: pediatric,
    name: 'Paediatrician',
  },
  {
    imageUrl: psychiatry,
    name: 'Psychiatrist',
  },
  {
    imageUrl: sexology,
    name: 'Sexologist',
  },
  {
    imageUrl: surgeon,
    name: 'Surgeon',
  },
  {
    imageUrl: urologist,
    name: 'Urologist',
  },
];

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemName: '',
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(name) {
    if (this.state.selectedItemName === name) {
      this.setState({selectedItemName: ''});
      this.props.setCategory('');
    } else {
      this.setState({selectedItemName: name});
      this.props.setCategory(name);
    }
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({item}) => {
    console.log(this.state.selectedItemName, item);
    if (this.state.selectedItemName === item.name) {
      return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <ListItem onPress={() => this.onSelect(item.name)}>
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{flexDirection: 'column'}}>
            <Image
              source={item.imageUrl}
              style={{width: 60, height: 60, borderRadius: 400 / 2}}
            />
            <Text style={{alignSelf: 'center'}}>{item.name}</Text>
          </View>
        </ListItem>
      );
    } else {
      return (
        <ListItem onPress={() => this.onSelect(item.name)}>
          <View style={{flexDirection: 'column'}} opacity={0.5}>
            <Image
              source={item.imageUrl}
              style={{width: 60, height: 60, borderRadius: 400 / 2}}
            />
            <Text style={{alignSelf: 'center'}}>{item.name}</Text>
          </View>
        </ListItem>
      );
    }
  };

  render() {
    return (
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
    );
  }
}
