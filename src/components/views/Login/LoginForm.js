import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';

import { signUp, signIn } from '../../store/actions/users';
import Input from '../../utils/forms/Input';
import { iOS, ANDROID } from '../../utils/constant';
import validationRules from '../../utils/forms/validationRules';
import loadTabs from '../Tabs';
import { setTokens, getTokens } from '../../utils/misc';

class LoginForm extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'Not a user, Register',
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          minLength: 6
        }
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          confirmPass: 'password'
        }
      }
    }
  };

  // async componentDidMount() {
  //   const data = await getTokens();
  //   console.log(data);
  // }

  updateInput = (name, value) => {
    this.setState({ hasErrors: false });
    const form = _.cloneDeep(this.state.form);
    const input = form[name];
    input.value = value;
    validationRules(name, form);
    if (name === 'password') {
      validationRules('confirmPassword', form);
    }
    this.setState({ form });
  };

  changeFormType = () => {
    const type = this.state.type;
    this.setState({
      type: type === 'Login' ? 'Register' : 'Login',
      action: type === 'Login' ? 'Register' : 'Login',
      actionMode:
        type === 'Login' ? 'Not registerd , Login' : 'Not a user, Register'
    });
  };

  confirmPassword = () => {
    const { confirmPassword } = this.state.form;
    return this.state.type === 'Login' ? null : (
      <Input
        placeholder="Confirm your password"
        type={confirmPassword.type}
        value={confirmPassword.value}
        secureTextEntry
        onChangeText={value => this.updateInput('confirmPassword', value)}
        autoCapitalize="none"
      />
    );
  };

  validateLogin = () => {
    const { email, password } = this.state.form;
    return email.valid && password.valid;
  };

  validateRegister = () => {
    const { email, password, confirmPassword } = this.state.form;
    return email.valid && password.valid && confirmPassword.valid;
  };

  validate = () => {
    return this.state.type === 'Login'
      ? this.validateLogin()
      : this.validateRegister();
  };

  submitUser = () => {
    this.setState({ hasErrors: false });
    if (!this.validate()) {
      this.setState({ hasErrors: true });
    } else {
      const { email, password } = this.state.form;
      const data = {
        email: email.value,
        password: password.value
      };
      if (this.state.type === 'Login') {
        this.props.signIn(data, this.handleSaveUserCallback);
      } else {
        this.props.signUp(data, this.handleSaveUserCallback);
      }
    }
  };

  handleSaveUserCallback = async err => {
    const { userData } = this.props.user;
    if (err || !userData) {
      this.setState({ hasErrors: true });
    } else {
      await setTokens(userData);
      loadTabs();
    }
  };

  formHasErrors = () => {
    return (
      this.state.hasErrors && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorLabel}>Opps, check your info</Text>
        </View>
      )
    );
  };

  render() {
    const { email, password } = this.state.form;
    const { platform } = this.props;
    return (
      <View style={styles.formInputContainer}>
        <Input
          placeholder="Enter your email"
          type={email.type}
          value={email.value}
          onChangeText={value => this.updateInput('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Enter your password"
          type={password.type}
          value={password.value}
          secureTextEntry
          onChangeText={value => this.updateInput('password', value)}
          autoCapitalize="none"
        />
        {this.confirmPassword()}
        {this.formHasErrors()}
        <View
          style={
            platform === ANDROID
              ? styles.buttonStyleAndroid
              : styles.buttonStyleiOS
          }
        >
          <Button
            title={this.state.action}
            color="#fd9277"
            onPress={this.submitUser}
          />
        </View>
        <View
          style={
            platform === ANDROID
              ? styles.buttonStyleAndroid
              : styles.buttonStyleiOS
          }
        >
          <Button
            title={this.state.actionMode}
            color="lightgrey"
            onPress={this.changeFormType}
          />
        </View>
        <View>
          <Button
            title="I'll do it later"
            color="lightgrey"
            onPress={() => loadTabs()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    minHeight: 400
  },
  buttonStyleAndroid: {
    marginBottom: 10,
    marginTop: 10
  },
  buttonStyleiOS: {
    marginBottom: 0
  },
  errorContainer: {
    marginBottom: 20,
    marginTop: 10
  },
  errorLabel: {
    color: 'red',
    fontFamily: 'Roboto-Black'
  }
});

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  { signUp, signIn }
)(LoginForm);
