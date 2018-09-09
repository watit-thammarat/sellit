import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { navigatorDrawer } from '../../../utils/misc';

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(e => {
      navigatorDrawer.bind(this)(e);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>AddPost</Text>
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

export default AddPost;
