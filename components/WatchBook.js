import React, { Component, useState, useEffect } from 'react';
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
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons';
export default class WatchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBook: [],
      dataBookBrief: [],
      showAlert: false,
    };
    this._readMore = this._readMore.bind(this);
    this._updateBook = this._updateBook.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref('Book')
      .on('value', (snapshot) => {
        let items = [];

        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          let value = childSnapshot.val();

          value.book.key = key;
          items.push(value);
        });
        this.setState({ dataBook: items });
        this._assginDescription(JSON.parse(JSON.stringify(items)));
      });
  }

  _showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  _hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  _assginDescription(items) {
    var dataBookBrief = items.map((item) => ({ ...item }));

    dataBookBrief.forEach((item, index) => {
      dataBookBrief[index].book.description = dataBookBrief[
        index
      ].book.description.substring(0, 100);
    });

    this.setState({ dataBookBrief });
  }



  _handleAlert = (key) => {
    this._showAlert();
  };

  _updateBook = (key) => {
    const { dataBook } = this.state;
    dataBook.forEach((item) => {
      if (item.book.key == key)
        this.props.navigation.navigate('Thêm sách', { book: item.book });
    });
  };

  _readMore = (key, isReadMore) => {
    const { dataBook } = this.state;
    let dataBookBrief = [...this.state.dataBookBrief];
    dataBook.forEach((item, index) => {
      if (item.book.key == key) {
        if (!isReadMore)
          dataBookBrief[index].book.description =
            dataBook[index].book.description;
        else
          dataBookBrief[index].book.description = dataBook[
            index
          ].book.description.substring(0, 100);
      }
    });

    this.setState({ dataBookBrief }, () => {
      console.log(this.state.dataBookBrief);
    });
  };

  render() {
    const { dataBook, dataBookBrief, showAlert } = this.state;
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
              this.props.navigation.navigate('Thêm sách', { book: null });
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Thêm sách
            </Text>
          </TouchableHighlight>

          <FlatList
            data={dataBookBrief}
            renderItem={({ item }) => (
              <CustomBook
                UpdateBook={this._updateBook}
                book={item.book}
                ReadMore={this._readMore}
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
