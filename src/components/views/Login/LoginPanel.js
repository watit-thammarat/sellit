import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated,
  Image
} from 'react-native';

import BackImage from '../../../assets/images/loginPanel.jpg';
import { PORTRAIT, LANDSCAPE } from '../../utils/constant';
import LoginForm from './LoginForm';

class LoginPanel extends Component {
  state = {
    backImage: new Animated.Value(0),
    inputForm: new Animated.Value(0)
    // animFinished: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.props.show) {
      Animated.sequence([
        Animated.timing(this.state.backImage, { toValue: 1, duration: 1000 }),
        Animated.timing(this.state.inputForm, { toValue: 1, duration: 1500 })
      ]).start(() => {
        // this.setState({ animFinished: true });
      });
    }
  }

  render() {
    const { orientation } = this.props;
    return (
      <View>
        <Animated.View
          style={{
            opacity: this.state.backImage
          }}
        >
          <Image
            style={
              orientation === PORTRAIT
                ? styles.imageStylePortrait
                : styles.imageStyleLandscape
            }
            source={BackImage}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.inputForm,
            top: this.state.inputForm.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 30]
            })
          }}
        >
          <LoginForm platform={this.props.platform} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStylePortrait: {
    width: 270,
    height: 150
  },
  imageStyleLandscape: {
    width: 270,
    height: 0
  }
});

export default LoginPanel;
