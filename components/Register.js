import React, { Component } from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';
import logo from '../assets/tdc.png';
import firebase from '../firebase/firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      contact: '',
    };
  }

  _onHandleRegisterAccount(user) {
    const { email, password } = user;

    //account
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        () => this.props.navigation.navigate('Đăng nhập', { email: email }),
        firebase.database().ref('User').push().set({ user })
      )
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    const { email, password, username, contact } = this.state;
    return (
      <ScrollView>
        <View style={styles.main}>
          <Image style={styles.image} source={logo} />
          <Text style={styles.title}>Đăng ký</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => {
              this.setState({ username: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact"
            value={contact}
            onChangeText={(text) => {
              this.setState({ contact: text });
            }}
          />

          <Text
            style={styles.register}
            onPress={() => {
              this.props.navigation.navigate('Đăng nhập');
            }}>
            Bạn đã có tài khoản ?
          </Text>

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              let user = {
                email: email,
                password: password,
                username: username,
                contact: contact,
              };

              this._onHandleRegisterAccount(user);
            }}>
            <Text style={styles.textButton}>Submit</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: 'red',
    margin: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    shadowOpacity: 0.1,
    shadowColor: 'black',
    shadowOffset: {
      height: 4,
      width: 4,
    },
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    borderRadius: 40,
  },
  input: {
    width: '90%',
    marginTop: 20,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  register: {
    marginTop: 10,
    color: 'blue',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});
