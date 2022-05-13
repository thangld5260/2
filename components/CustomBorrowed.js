import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

const Item = ({ borrowed, UpdateBorrowed }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        UpdateBorrowed(borrowed.key);
      }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'space-between',
              flex: 1,
            }}>
            <Text style={styles.name}>
              {borrowed.infomationBook ? borrowed.infomationBook.book.name : ''}
            </Text>
            <Text style={styles.contact}>
              {borrowed.infomationMember
                ? borrowed.infomationMember.member.fullname
                : ''}
            </Text>
            <Text style={styles.address}>{borrowed.startBorrowed}</Text>
            <Text style={styles.dateJoin}>{borrowed.endBorrowed}</Text>
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
  },
});

export default Item;
