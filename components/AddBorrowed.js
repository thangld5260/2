import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Picker,
  StyleSheet,
  TextInput,
} from 'react-native';
import firebase from '../firebase/firebase';
export default class AddBorrowed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBook: [],
      dataMember: [],

      book: '',
      member: '',
      startBorrowed: '',
      endBorrowed: '',

      updateBorrowed: this.props.route.params.borrowed,
    };
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
        this.setState({ dataBook: items, book: items[0].book.key }, () => {
          //console.log(this.state.dataBook);
        });
      });

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
        this.setState(
          { dataMember: items, member: items[0].member.key },
          () => {
            // console.log(this.state.dataMember);
          }
        );
      });

    this._getUpdateBorrowed();
  }

  _getUpdateBorrowed = () => {
    const {
      book,
      member,
      startBorrowed,
      endBorrowed,
      updateBorrowed,
    } = this.state;

    if (updateBorrowed) {
      this.setState({
        book: updateBorrowed.book,
        member: updateBorrowed.member,
        startBorrowed: updateBorrowed.startBorrowed,
        endBorrowed: updateBorrowed.endBorrowed,
      });
      console.log(updateBorrowed);
    }
  };

  _onHandleAddBorrowed = async (borrowed) => {
    firebase
      .database()
      .ref('Borrowed')
      .push()
      .set({ borrowed })
      .then(() => {
        var count = 0;
        alert('Thêm mượn sách thành công !');
        firebase
          .database()
          .ref('CountBorrowed')
          .once('value').then((snapshot) => {
            snapshot.forEach((snap) => {
              console.log(snap.val())
              if (snap.val().idBook == borrowed.book) {
                count = parseInt(snap.val().count);
              }
            });
            firebase
              .database()
              .ref('CountBorrowed/' + borrowed.book)
              .set({ idBook: borrowed.book, count: (count + 1)})
              .then(() => {})
              .catch((error) => alert(error.getMessage()));
          });

        this._clearFiled();
      })
      .catch((error) => alert(error.getMessage()));
  };

  _deleteMember = () => {
    firebase
      .database()
      .ref('Borrowed/' + this.state.updateBorrowed.key)
      .remove()
      .then(() => {
        alert('Xóa mượn sách thành công !');
        this._clearFiled();
        this.props.navigation.navigate('Màn hình chính');
      })
      .catch((error) => alert(error.getMessage()));
  };

  _onHandleUpdateBorrowed = async (borrowed) => {
    firebase
      .database()
      .ref('Borrowed/' + this.state.updateBorrowed.key)
      .update({ borrowed })
      .then(() => {
        alert('Sửa mượn sách thành công !');
        this._clearFiled();
      })
      .catch((error) => alert(error.getMessage()));
  };

  _clearFiled = () => {
    this.setState({
      book: this.state.dataBook[0].book.key,
      member: this.state.dataMember[0].member.key,
      startBorrowed: '',
      endBorrowed: '',
    });
  };

  render() {
    const {
      dataBook,
      dataMember,
      book,
      member,
      startBorrowed,
      endBorrowed,
      updateBorrowed,
    } = this.state;

    const button = updateBorrowed ? 'Sửa' : 'Thêm';
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>Mượn sách</Text>

        <Picker
          selectedValue={this.state.book}
          style={styles.dropdown}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ book: itemValue }, () => {
              //console.log(this.state.book);
            })
          }>
          {dataBook.map((item, index) => {
            return (
              <Picker.Item
                label={item.book.name}
                value={item.book.key}
                key={index}
              />
            );
          })}
        </Picker>

        <Picker
          selectedValue={this.state.member}
          style={styles.dropdown}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ member: itemValue }, () => {
              //console.log(this.state.member);
            })
          }>
          {dataMember.map((item, index) => {
            return (
              <Picker.Item
                label={item.member.fullname}
                value={item.member.key}
                key={index}
              />
            );
          })}
        </Picker>

        <TextInput
          style={styles.input}
          value={startBorrowed}
          placeholder="Ngày bắt đầu mượn sách"
          onChangeText={(text) => {
            this.setState({ startBorrowed: text });
          }}
        />

        <TextInput
          style={styles.input}
          value={endBorrowed}
          placeholder="Ngày trả sách"
          onChangeText={(text) => {
            this.setState({ endBorrowed: text });
          }}
        />

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableHighlight
            style={[styles.buttonAdd, styles.button, { flex: 1 }]}
            onPress={() => {
              const borrowed = { book, member, startBorrowed, endBorrowed };
              button == 'Sửa'
                ? this._onHandleUpdateBorrowed(borrowed)
                : this._onHandleAddBorrowed(borrowed);
            }}>
            <Text style={styles.text}>{button}</Text>
          </TouchableHighlight>
          {button == 'Sửa' ? (
            <TouchableHighlight
              onPress={() => {
                this._deleteBorrowed();
              }}
              style={[styles.button, styles.buttonAddBook, { flex: 1 }]}>
              <Text style={styles.text}>Xóa</Text>
            </TouchableHighlight>
          ) : (
            []
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 32,
    color: '#ff8d00',
    textShadowColor: 'black',
    textShadowOffset: {
      height: 2,
      width: 2,
    },
    textShadowRadius: 3,
  },
  viewImage: {
    flex: 1,
    marginTop: 10,
    resizeMode: 'cover',
  },
  image: {
    width: null,
    height: 200,
    borderRadius: 10,
    flex: 1,
    resizeMode: 'stretch',
  },
  button: {
    backgroundColor: '#841584',
    padding: 10,
    textAlign: 'center',
    alignSelf: 'flex-end',
    borderRadius: 20,
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    marginTop: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  dropdown: {
    margin: 10,
    padding: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative', // It was absolute
    width: '90%',
    alignSelf: 'center',
  },
  buttonAdd: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
});
