import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import firebase from '../firebase/firebase';
import moment from 'moment';

export default class Statistical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: [],
      topBook: '',
    };
    this._getData();
  }

  _getData = () => {
    var count = 0;
    var id = 'loi';
    var data = [];
    firebase
      .database()
      .ref('CountBorrowed')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          data.push(snap.val());
          if (parseInt(snap.val().count) > count) {
            count = parseInt(snap.val().count);
            id = snap.val().idBook;
          }
        });
        data.sort();
        var dataset = [];
        var lableset = [];
        for (var i = 0; i < (data.length > 4 ? 4 : data.length); i++) {
          dataset.push(data[i].count);
          firebase
            .database()
            .ref('Book/' + data[i].idBook)
            .once('value')
            .then((snapshot) => {
              lableset.push(snapshot.val().book.name);
            });
        }
        firebase
          .database()
          .ref('Book/' + id)
          .once('value')
          .then((snapshot) => {
            this.setState(
              {
                topBook: snapshot.val().book.name,
                datasets: dataset,
                labels: lableset,
              },
              () => {
                console.log(this.state.labels);
              }
            );
          });
      });
  };

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              color: 'blue',
              marginTop: '5%',
              marginBottom: 25,
            }}>
            Thống kê
          </Text>
          <LineChart
            data={{
              labels:
                this.state.labels.length == 0
                  ? ['January', 'February', 'March', 'April', 'May', 'June']
                  : this.state.labels,
              datasets: [
                {
                  data:
                    this.state.datasets.length == 0
                      ? [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ]
                      : this.state.datasets,
                },
              ],
            }}
            width={300}
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={{ width: '66%', textAlign: 'center' }}>
            Biểu đồ Hien Thi top truen duoc muon
          </Text>

          <View style={{ width: '90%', marginTop: 25, marginBottom: 5 }}>
            <FlatList
              data={this.state.labels}
              renderItem={({ item, index }) => (
                <Text style={{ fontWeight: 'bold', width: '60%' }}>
                  Top{index + 1}:{item}
                </Text>
              )}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
