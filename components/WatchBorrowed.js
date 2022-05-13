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
import CustomBook from './CustomBook';
import Icon from 'react-native-vector-icons';
import CustomBorrowed from './CustomBorrowed';
export default class WatchBorrowed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBorrowed: [],
    };
    this._updateBorrowed = this._updateBorrowed.bind(this);
    this._getBook = this._getBook.bind(this);
    this._getMember = this._getMember.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref('Borrowed')
      .on('value', (snapshot) => {
        let items = [];

        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          let value = childSnapshot.val();

          value.borrowed.key = key;
          this._getBook(value.borrowed.book, value.borrowed);
          this._getMember(value.borrowed.member, value.borrowed);
          items.push(value);
        });
        this.setState({ dataBorrowed: items }, () => {
          console.log(this.state.dataBorrowed);
        });
      });
  }

  _updateBorrowed = (key) => {
    const { dataBorrowed } = this.state;

    dataBorrowed.forEach((item) => {
      if (item.borrowed.key == key) {
        this.props.navigation.navigate('Thêm mượn sách', {
          borrowed: item.borrowed,
        });
      }
    });
  };

  _getBook = async (key, arr) => {
    await firebase
      .database()
      .ref('Book/' + key)
      .on('value', (snapshot) => {
        arr.infomationBook = snapshot.val();

        this.setState({ dataBorrowed: this.state.dataBorrowed }, () => {
          console.log(this.state.dataBorrowed);
        });
      });
  };

  _getMember = async (key, arr) => {
    await firebase
      .database()
      .ref('Member/' + key)
      .on('value', (snapshot) => {
        arr.infomationMember = snapshot.val();
        this.setState({ dataBorrowed: this.state.dataBorrowed }, () => {
          console.log(this.state.dataBorrowed);
        });
      });
  };
  render() {
    const { dataMember, dataBook, dataBorrowed } = this.state;
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
              this.props.navigation.navigate('Thêm mượn sách', {
                borrowed: null,
              });
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Thêm người mượn
            </Text>
          </TouchableHighlight>

          <FlatList
            data={dataBorrowed}
            renderItem={({ item }) => (
              <CustomBorrowed
                borrowed={item.borrowed}
                UpdateBorrowed={this._updateBorrowed}/>
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
