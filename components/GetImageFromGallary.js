import React, { Component } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase/firebase';
import uuid from 'react-native-uuid';
export default class GetImageFromDevice {
  constructor() {
    this.Permission();
  }
  Permission = async () => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  getImageFromGallary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result.uri;
    } else {
      return null;
    }
  };

  getImageFromDevice = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result.uri;
    } else {
      return null;
    }
  };

  async uploadImageAsync(uri, path) {
    if (uri == null) return;

    const ref = firebase
      .storage()
      .ref()
      .child(path + '/' + uuid.v4());

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    var mimeString = uri.split(',')[0].split(':')[1].split(';')[0];

    const snapshot = await ref.put(blob, { contentType: mimeString });

    let url = await snapshot.ref.getDownloadURL();

    return url;
  }
}
