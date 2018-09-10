import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import startApp from '../../../../../App';
import { navigatorDrawer } from '../../../utils/misc';

class NotAllow extends Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(e => {
      navigatorDrawer.bind(this)(e);
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon name="frown-o" size={60} color="#f44336" />
        <Text>You need to log in or register to sell !!!</Text>
        <Button title="LOGIN / REGISTER" color="#fd9727" onPress={startApp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default NotAllow;
