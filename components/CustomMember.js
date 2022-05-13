import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

const Item = ({ member, UpdateMember }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        UpdateMember(member.key);
      }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.image}
            source={{
              uri: member.urlAvatar,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'space-between',
              flex: 1,
            }}>
            <Text style={styles.name}>{member.fullname}</Text>
            <Text style={styles.contact}>Liên hệ:{member.contact}</Text>
            <Text style={styles.address}>Địa chỉ:{member.address}</Text>
            <Text style={styles.dateJoin}>Ngày tham gia:{member.dateJoin}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  name: {
    fontSize: 21,
    margin: 5,
    marginLeft: -10,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
    letterSpacing: 2,
  },
  contact: {
    fontWeight: '200',
    color: 'white',
    margin: 5,
    letterSpacing: 2,
  },
  address: {
    fontWeight: '300',
    color: 'white',
    margin: 5,
    letterSpacing: 2,
  },
  dateJoin: {
    margin: 5,
    color: 'white',
    letterSpacing: 1,
    marginLeft: -10,

  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 120,
    marginRight: 10,
    alignSelf: 'center',
  },
});

export default Item;
