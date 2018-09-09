import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Input = props => {
  let content = null;
  switch (props.type) {
    case 'textinput':
      content = (
        <TextInput
          underlineColorAndroid="transparent"
          {...props}
          style={[styles.input, props.style]}
        />
      );
      break;
    default:
      return content;
  }
  return content;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 18,
    padding: 5,
    marginTop: 10
  }
});

export default Input;
