import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

const Item = ({ book, UpdateBook, ReadMore }) => {
  const readMore = (
    <Text
      style={styles.readMore}
      onPress={() => {
        ReadMore(book.key, book.description.length < 100);
      }}>
      Xem thêm
    </Text>
  );

  const readShrink = (
    <Text
      style={styles.readMore}
      onPress={() => {
        ReadMore(book.key, book.description.length >= 101);
      }}>
      Thu gọn
    </Text>
  );
  return (
    <View style={styles.header}>
      <View style={styles.text}>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.description}>
          {book.description + ' '}
          {book.description.length >= 100
            ? book.description.length < 101
              ? readMore
              : readShrink
            : []}
        </Text>

        <Text style={styles.typeBook}>Thể loại:{book.typeBook.toString()}</Text>
        <Text style={styles.amout}>Số lượng:{book.amout}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          UpdateBook(book.key);
        }}>
        <View style={styles.viewImage}>
          <Image style={styles.image} source={{ uri: book.urlImageBook }} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 20,
    backgroundColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  text: {
    margin: 16,
  },
  title: {
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Monospace',
    fontSize: 20,
  },
  viewImage: {
    borderTopWidth: 3,
    borderColor: 'white',
  },
  description: {
    margin: 5,
    fontFamily: 'Sans-serif',
    color: 'white',
    fontSize: 10,
  },
  typeBook: {
    margin: 5,
    color: 'white',
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  image: {
    width: '100%',
    height: 400,
    flex: 1,
    resizeMode: 'stretch',
  },
  readMore: {
    color: '#18ffff',
    textDecorationLine: 'underline',
  },
  amout: {
    margin: 5,
    fontSize: 12,
    color: 'white',
    alignSelf: 'flex-end',
    fontFamily: 'Monospace',
  },
});

export default Item;
