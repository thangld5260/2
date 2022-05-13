import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Register';
import Main from './components/Main';
import Login from './components/Login';
import AddBook from './components/AddBook';
import WatchBook from './components/WatchBook';
import Member from './components/WatchMember';
import AddMember from './components/AddMember';
import Splashscreen from './components/Splashscreen';
import AddBorrowed from './components/AddBorrowed';
import WatchBorrowed from './components/WatchBorrowed';
import SearchBook from './components/searchBook';
import SearchMember from './components/SearchMenber';

import BieuDo from './components/BieuDo';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Màn hình giới thiệu" component={Splashscreen} />
        <Stack.Screen name="Thêm mượn sách" component={AddBorrowed} />
        <Stack.Screen
          name="Màn hình chính"
          component={Main}
          options={{ headerLeft: () => null }}
        />

        <Stack.Screen name="Thêm hội viên" component={AddMember} />

        <Stack.Screen name="Đăng nhập" component={Login} />
        <Stack.Screen name="thong ke" component={BieuDo} />
        <Stack.Screen name="Đăng ký" component={Register} />
        <Stack.Screen name="Hội Viên" component={Member} />
        <Stack.Screen name="Thêm sách" component={AddBook} />
        <Stack.Screen name="Xem sách" component={WatchBook} />
        <Stack.Screen name="Tìm kiếm sách" component={SearchBook} />
        <Stack.Screen name="Tìm kiếm member" component={SearchMember} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
