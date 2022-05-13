import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.jpg';
import firebase from '../firebase/firebase';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: false,
    };
  }

  _onHandleLoginAccount = (user) => {
    const { email, password } = user;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Màn hình chính', { name: email });
      })
      .catch((error) => {
        alert(error);
        this.setState({ isLogin: !this.state.isLogin });
      });
  };

  render() {
    const { email, password, isLogin } = this.state;
    const calculateStyle = isLogin ? 15 : 0;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.main}>
          <Image style={styles.image} source={logo} />
          <Text style={styles.title}>Đăng nhập</Text>
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

          <Text
            style={styles.register}
            onPress={() => {
              this.props.navigation.navigate('Đăng ký');
            }}>
            Bạn chưa có tài khoản ?
          </Text>

          {isLogin ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ margin: 20, alignSelf: 'center' }}
            />
          ) : (
            []
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ isLogin: !this.state.isLogin });
              let user = {
                email: email,
                password: password,
              };

              this._onHandleLoginAccount(user);
            }}>
            <Text style={[styles.textButton, { marginLeft: calculateStyle }]}>
              Login
            </Text>
          </TouchableOpacity>
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
    width: 140,
    height: 180,
    margin: 10,
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
    flexDirection: 'row',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  register: {
    marginTop: 10,
    color: 'blue',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});
