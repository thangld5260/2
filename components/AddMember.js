import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';
import firebase from '../firebase/firebase';
import Gallary from './GetImageFromGallary';
import AwesomeAlert from 'react-native-awesome-alerts';
import uuid from 'react-native-uuid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const urlImageBookDefault =
  'https://firebasestorage.googleapis.com/v0/b/quanlysach-f234d.appspot.com/o/books%2Fbook_default.jpg?alt=media&token=9cf5d5f1-8cd0-4247-b115-12ef7615c35f';

const gallary = new Gallary();
export default class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      dateJoin: '',
      avatar: null,
      address: '',
      contact: '',
      showAlert: false,
      updateMember: this.props.route.params.member,
    };
  }

  componentDidMount() {
    if (this.state.updateMember) {
        this.setState({
        fullname: this.state.updateMember.fullname,
        dateJoin: this.state.updateMember.dateJoin,
        contact: this.state.updateMember.contact,
        address: this.state.updateMember.address,
        avatar: this.state.updateMember.urlAvatar,
      });
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  _onHandleGetImage = async (type) => {
    const { avatar } = this.state;
    if (avatar == null) {
      let uri = null;
      if (type == 'Camera') {
        uri = await gallary.getImageFromGallary();
      } else uri = await gallary.getImageFromDevice();

      this.setState({
        avatar: uri,
      });
    } else {
      this.setState({
        avatar: null,
      });
    }
  };

  _uploadImageToFirebase = () => {
    return gallary.uploadImageAsync(this.state.avatar, 'member');
  };

  _clearFiled = () => {
    this.setState({
      fullname: '',
      dateJoin: '',
      avatar: null,
      address: '',
      contact: '',
    });
  };
   _onHandleAddMember = async (member) => {
    member.urlImageBook = await this._uploadImageToFirebase();

    if (!member.urlImageBook) member.urlImageBook = urlImageBookDefault;

  // _onHandleAddMember = async (member) => {
  //   member.urlAvatar = await this._uploadImageToFirebase();
    firebase
      .database()
      .ref('Member')
      .push()
      .set({ member })
      .then(() => {
        alert('Th??m h???i vi??n th??nh c??ng !');
        this._clearFiled();
      })
      .catch((error) => alert(error.getMessage()));
  };

  _deleteMember = () => {
    firebase
      .database()
      .ref('Member/' + this.state.updateMember.key)
      .remove()
      .then(() => {
        alert('X??a h???i vi??n th??nh c??ng !');
        this.props.navigation.navigate('M??n h??nh ch??nh');
        this._clearFiled();
      })
      .catch((error) => alert(error.getMessage()));
  };

  _onHandleUpdateMember = async (member) => {
    //neu chon anh !
    if (this.state.avatar.indexOf('base64') > 0)
      member.urlAvatar = await this._uploadImageToFirebase();
    else member.urlAvatar = this.state.updateMember.urlAvatar;
    firebase
      .database()
      .ref('Member/' + this.state.updateMember.key)
      .update({ member })
      .then(() => {
        alert('S???a h???i vi??n th??nh c??ng !');
        this._clearFiled();
      })
      .catch((error) => alert(error.getMessage()));
  };

  render() {
    const {
      fullname,
      dateJoin,
      avatar,
      address,
      contact,
      updateMember,
      showAlert,
    } = this.state;
    const button = updateMember ? 'S???a' : 'Th??m';
    const chooseImage = avatar ? 'X??a h??nh' : 'Ch???n h??nh';
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Text style={[styles.text, styles.title]}>Th??m H???i Vi??n</Text>

          <View style={styles.viewImage}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                if (avatar) {
                  this._onHandleGetImage('');
                } else {
                  this.showAlert();
                }
              }}>
              <Text style={styles.text}>{chooseImage}</Text>
            </TouchableHighlight>
            {avatar && <Image source={{ uri: avatar }} style={styles.image} />}
          </View>

          <TextInput
            style={styles.input}
            value={fullname}
            placeholder="H??? t??n h???i vi??n"
            onChangeText={(text) => {
              this.setState({ fullname: text });
            }}
          />

          <TextInput
            style={styles.input}
            value={dateJoin}
            placeholder="Ng??y th??m gia"
            onChangeText={(text) => {
              this.setState({ dateJoin: text });
            }}
          />

          <TextInput
            style={styles.input}
            value={address}
            placeholder="?????a ch???"
            onChangeText={(text) => {
              this.setState({ address: text });
            }}
          />

          <TextInput
            style={styles.input}
            value={contact}
            placeholder="Li??n l???c"
            onChangeText={(text) => {
              this.setState({ contact: text });
            }}
          />

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableHighlight
              style={[styles.buttonAddBook, styles.button, { flex: 1 }]}
              onPress={() => {
                const member = { fullname, dateJoin, address, contact };
                button == 'Th??m'
                  ? this._onHandleAddMember(member)
                  : this._onHandleUpdateMember(member);
              }}>
              <Text style={styles.text}>{button}</Text>
            </TouchableHighlight>
            {button == 'S???a' ? (
              <TouchableHighlight
                onPress={() => {
                  this._deleteMember();
                }}
                style={[styles.button, styles.buttonAddBook, { flex: 1 }]}>
                <Text style={styles.text}>X??a</Text>
              </TouchableHighlight>
            ) : (
              []
            )}
          </View>
        </ScrollView>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Ch???n h??nh ???nh"
          message="B???n mu???n l???y ???nh t??? ????u ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Ch???n camera"
          cancelButtonColor="#DD6B55"
          confirmText="Ch???n th?? vi???n"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
            this._onHandleGetImage('Gallary');
          }}
          onConfirmPressed={() => {
            this.hideAlert();
            this._onHandleGetImage('Camera');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  buttonAddBook: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
});
