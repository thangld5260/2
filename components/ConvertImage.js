import * as firebase from '../firebase/firebase'

async function uploadImageAsync(uri) {
  const ref = firebase
    .storage()
    .ref()
    .child("hehehe");

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  var mimeString = uri
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  const snapshot = await ref.put(blob, { contentType: mimeString });

  let url = await snapshot.ref.getDownloadURL();

  return url;
}