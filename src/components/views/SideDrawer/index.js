import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class Sidedrawer extends Component {
  state = {
    buttons: [
      {
        value: 'Home',
        iconName: 'home',
        shouldGoTo: 'sellit.Home',
        typeLink: 'tab',
        index: 0,
        privacy: false
      },
      {
        value: 'Sell',
        iconName: 'dollar',
        shouldGoTo: 'sellit.AddPost',
        typeLink: 'tab',
        index: 1,
        privacy: false
      },
      {
        value: 'My posts',
        iconName: 'th-list',
        shouldGoTo: 'sellit.UserPosts',
        typeLink: 'view',
        index: null,
        privacy: true
      }
    ]
  };

  renderButton = ({ value, iconName, shouldGoTo, typeLink, index }, i) => (
    <Icon.Button
      key={i}
      name={iconName}
      backgroundColor="#474143"
      iconStyle={{ width: 15 }}
      color="#fff"
      size={18}
      onPress={() => {
        this.props.navigator.handleDeepLink({
          link: shouldGoTo,
          payload: { typeLink, index }
        });
      }}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </Icon.Button>
  );

  renderPrivacyButton = (button, i) => {
    return this.props.user.userData && this.renderButton(button, i);
  };

  renderButtons = () => {
    return this.state.buttons.map(
      (button, i) =>
        button.privacy
          ? this.renderPrivacyButton(button, i)
          : this.renderButton(button, i)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>{this.renderButtons()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474243'
  },
  buttonContainer: {
    padding: 10,
    marginTop: 20
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#fff'
  }
});

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Sidedrawer);
