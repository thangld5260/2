import React, { Component } from 'react';

import {
  Button,
  Image,
  View,
  Platform,
  FlatList,
  List,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import firebase from '../firebase/firebase';
import CustomMember from './CustomMember';
import Icon from 'react-native-vector-icons';

export default class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMember: [],
    };
    this._updateMember = this._updateMember.bind(this);
  }

  _updateMember = (key) => {
    const { dataMember } = this.state;

    dataMember.forEach((item) => {
      if (item.member.key == key) {
        this.props.navigation.navigate('Thêm hội viên', {
          member: item.member,
        });
      }
    });
  };

  componentDidMount() {
    firebase
      .database()
      .ref('Member')
      .on('value', (snapshot) => {
        let items = [];

        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          let value = childSnapshot.val();

          value.member.key = key;
          items.push(value);
        });
        this.setState({ dataMember: items }, () => {
          console.log(this.state.dataMember);
        });
      });
  }

  render() {
    const { dataMember } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <TouchableHighlight
            style={{
              width: '100%',
              alignSelf: 'flex-end',
              padding: 10,
              marginTop: 20,
              backgroundColor: 'green',
              borderRadius: 10,
            }}
            onPress={() => {
              this.props.navigation.navigate('Thêm hội viên',{member:null});
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Thêm hội viên
            </Text>
          </TouchableHighlight>

          <FlatList
            data={dataMember}
            renderItem={({ item }) => (
              <CustomMember
                member={item.member}
                UpdateMember={this._updateMember}
              />
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
});
