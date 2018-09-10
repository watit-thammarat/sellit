import React from 'react';
import { StyleSheet, Text, TextInput, View, Picker } from 'react-native';

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
    case 'picker':
      content = (
        <Picker selectedValue={props.value} {...props}>
          {props.options.map((o, i) => (
            <Picker.Item key={i} value={o} label={o} />
          ))}
        </Picker>
      );
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
