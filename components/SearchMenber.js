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
      dataSearch: []
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
      <View style={styles.container, {marginTop: 15}}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
           <TextInput
            placeholder="Tim Kiem"
            onChangeText={(text) => {
              var listSearch = [];

              this.state.dataMember.forEach((snapshot) => {
                if (snapshot.member.fullname.search(text) != -1) {
                  listSearch.push(snapshot);
                }
              });
              this.setState({
                dataSearch: listSearch,
              });
            }}
            style={{ borderWidth: 1, borderColor: 'black', padding: 6}}
          />

          <FlatList
            data={this.state.dataSearch.length == 0? this.state.dataMember: this.state.dataSearch}
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
