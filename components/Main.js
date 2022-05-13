import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import WatchBook from './WatchBook';
import Member from './WatchMember';
import Setting from './Setting';
import Borrowed from './WatchBorrowed';
const Tab = createBottomTabNavigator();
export default class navigation extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Book"
        activeColor="#f0edf6"
        inactiveColor="black  "
        barStyle={{ backgroundColor: '#694fad' }}>
        <Tab.Screen
          name="Book"
          component={WatchBook}
          options={{
            tabBarLabel: 'Sách',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="book-open" size={20} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Member"
          component={Member}
          options={{
            tabBarLabel: 'Thành viên',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={20} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Borrowed"
          component={Borrowed}
          options={{
            tabBarLabel: 'Mượn sách',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="book-reader" size={20} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Cài đặt',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="cog" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
