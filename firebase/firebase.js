import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQR6Rwrmy4IEclwvyDvRAAipPR3GZksYI",
  authDomain: "exe3-28814.firebaseapp.com",
  databaseURL: "https://exe3-28814-default-rtdb.firebaseio.com",
  projectId: "exe3-28814",
  storageBucket: "exe3-28814.appspot.com",
  messagingSenderId: "556016310883",
  appId: "1:556016310883:web:98cd04aae6f59e831b3656",
  measurementId: "G-Y8VG6Y1TZ2"
};

//  var firebaseConfig = {
//     apiKey: "AIzaSyB2gGJJ3V49jhckaMASQqTdbo9Te3TpDps",
//     authDomain: "quanlythuvien-2517d.firebaseapp.com",
//     projectId: "quanlythuvien-2517d",
//     storageBucket: "quanlythuvien-2517d.appspot.com",
//      databaseURL: "https://quanlysach-f234d-default-rtdb.firebaseio.com/",
//     messagingSenderId: "124945598602",
//     appId: "1:124945598602:web:979de43a9a8afd396dc573",
//     measurementId: "G-8VVBCGXWEP"
//   };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
