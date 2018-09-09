import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';

import { PORTRAIT, LANDSCAPE } from '../../utils/constant';

class Logo extends Component {
  state = {
    sellAnim: new Animated.Value(0),
    itAnim: new Animated.Value(0)
  };

  componentWillMount() {
    Animated.sequence([
      Animated.timing(this.state.sellAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.easeOutCubic
      }),
      Animated.timing(this.state.itAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.easeOutCubic
      })
    ]).start(() => {
      this.props.showLogin();
    });
  }

  render() {
    const { orientation } = this.props;
    return (
      <View>
        <View
          style={
            orientation === PORTRAIT
              ? styles.logoStylesPortrait
              : styles.logoStylesLandscape
          }
        >
          <Animated.View
            style={{
              opacity: this.state.sellAnim,
              top: this.state.sellAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
              })
            }}
          >
            <Text style={styles.sell}>Sell</Text>
          </Animated.View>
          <Animated.View
            style={{
              opacity: this.state.itAnim,
              top: this.state.itAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
              })
            }}
          >
            <Text style={styles.it}>It</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoStylesPortrait: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    maxHeight: 100
  },
  logoStylesLandscape: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    maxHeight: 50
  },
  sell: {
    fontSize: 40,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#555555'
  },
  it: {
    fontSize: 40,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#00ada9'
  }
});

export default Logo;
