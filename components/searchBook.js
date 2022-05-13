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
      dataSearch: [],
      dataSearchBrief: [],
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
    const { dataSearch } = this.state;
    let dataSearchBrief = [...this.state.dataSearchBrief];
    dataSearch.forEach((item, index) => {
      if (item.book.key == key) {
        if (!isReadMore)
          dataSearchBrief[index].book.description =
            dataSearch[index].book.description;
        else
          dataSearchBrief[index].book.description = dataSearch[
            index
          ].book.description.substring(0, 100);
      }
    });

    this.setState({ dataSearchBrief }, () => {});
  };

  render() {
    const { dataBook, dataBookBrief, showAlert } = this.state;
    return (
      <View style={styles.container, {marginTop: 15}}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <TextInput
            placeholder="Tim Kiem"
            onChangeText={(text) => {
              var listBook = [];

              var listBookBrief = [];
              this.state.dataBook.forEach((snapshot, index) => {
                if (snapshot.book.name.search(text) != -1) {
                  listBook.push(snapshot);
                  listBookBrief.push(this.state.dataBookBrief[index]);
                }
              });
              console.log(listBookBrief);
              this.setState({
                dataSearch: listBook,
                dataSearchBrief: listBookBrief,
              });
            }}
            style={{ borderWidth: 1, borderColor: 'black', padding: 6 }}
          />

          <FlatList
            data={this.state.dataSearchBrief.length == 0 ? this.state.dataBookBrief : this.state.dataSearchBrief}
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
