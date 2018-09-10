import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import Logo from './Logo';
import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  getPlatform,
  getTokens
} from '../../utils/misc';
import LoginPanel from './LoginPanel';
import { autoSignIn } from '../../store/actions/users';
import loadTabs from '../Tabs';

class Login extends Component {
  state = {
    loading: true,
    orientation: getOrientation(),
    logoAnimation: false,
    platform: getPlatform()
  };

  constructor(props) {
    super(props);
    setOrientationListener(this.changeOrientation);
  }

  async componentDidMount() {
    const { token, refToken } = await getTokens();
    if (!token) {
      this.setState({ loading: false });
    } else {
      this.props.autoSignIn(refToken, async err => {
        if (err) {
          console.log(err);
          this.setState({ loading: false });
        } else {
          loadTabs(true);
        }
      });
    }
  }

  componentWillUnmount() {
    removeOrientationListener(this.changeOrientation);
  }

  changeOrientation = () => {
    this.setState({ orientation: getOrientation() });
  };

  showLogin = () => {
    this.setState({ logoAnimation: true });
  };

  render() {
    let content = (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
    if (!this.state.loading) {
      content = (
        <ScrollView>
          <View style={styles.container}>
            <Logo
              showLogin={this.showLogin}
              orientation={this.state.orientation}
            />
            <LoginPanel
              show={this.state.logoAnimation}
              orientation={this.state.orientation}
              platform={this.state.platform}
            />
          </View>
        </ScrollView>
      );
    }
    return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  { autoSignIn }
)(Login);
