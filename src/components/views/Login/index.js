import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import loadTabs from '../Tabs';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Button title="Go to home" onPress={() => loadTabs()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Login;
