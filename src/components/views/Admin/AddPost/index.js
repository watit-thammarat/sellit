import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { navigatorDrawer } from '../../../utils/misc';
import Input from '../../../utils/forms/Input';
import validationRules from '../../../utils/forms/validationRules';
import { addArticle, resetArticle } from '../../../store/actions/articles';

class AddPost extends Component {
  state = {
    loading: false,
    hasErrors: false,
    modalSuccess: false,
    errors: [],
    form: {
      category: {
        name: 'catetory',
        value: '',
        valid: false,
        type: 'picker',
        options: [
          'Select a category',
          'Sports',
          'Music',
          'Clothing',
          'Electronics'
        ],
        rules: {
          isRequired: true
        },
        error: 'You need to select a category'
      },
      title: {
        name: 'title',
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          maxLength: 50
        },
        error: 'You need to enter a title, max of 50 char'
      },
      description: {
        name: 'description',
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          maxLength: 200
        },
        error: 'You need to enter a description, max of 200 char'
      },
      price: {
        name: 'price',
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          maxLength: 6
        },
        error: 'You need to enter a price, max of 6'
      },
      email: {
        name: 'email',
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true
        },
        error: 'You need to enter an email, make it a valid email'
      }
    }
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(e => {
      navigatorDrawer.bind(this)(e);
    });
  }

  updateInput = (name, value) => {
    const form = _.cloneDeep(this.state.form);
    const input = form[name];
    input.value = value;
    validationRules(name, form);
    this.setState({ form });
  };

  validateForm = () => {
    const { title, price, email, category, description } = this.state.form;
    return (
      title.valid &&
      price.valid &&
      email.valid &&
      category.valid &&
      description.valid
    );
  };

  getFormData = () => {
    const { form } = this.state;
    const data = {};
    for (const key in form) {
      data[key] = form[key].value;
    }
    return data;
  };

  getErrors = () => {
    const { form } = this.state;
    const errors = [];
    for (const key in form) {
      if (!form[key].valid) {
        errors.push(form[key].error);
      }
    }
    return errors;
  };

  submitFormHandler = () => {
    this.setState({ hasErrors: false, errors: [], loading: true });
    const isValid = this.validateForm();
    if (isValid) {
      const data = this.getFormData();
      this.props.addArticle(data, err => {
        if (err) {
          this.setState({ hasErrors: true, errors: [err], loading: false });
        } else {
          this.setState({ loading: false, modalSuccess: true });
        }
      });
    } else {
      this.setState({
        hasErrors: true,
        errors: this.getErrors(),
        loading: false
      });
    }
  };

  renderErrors = () =>
    this.state.errors.map((e, i) => (
      <Text key={i} style={styles.error}>
        {' '}
        - {e}
      </Text>
    ));

  clearErrors = () => {
    this.setState({ hasErrors: false, errors: [] });
  };

  resetSellitScreen = () => {
    const form = _.cloneDeep(this.state.form);
    for (const key in form) {
      form[key].value = '';
      form[key].valid = false;
    }
    this.setState({ form, modalSuccess: false });
    this.props.resetArticle();
  };

  render() {
    const { category, title, description, price, email } = this.state.form;
    return (
      <ScrollView>
        <View style={styles.formInputContainer}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.mainTitle}>Sell your things</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text>Select a category</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select a category"
                type={category.type}
                value={category.value}
                onValueChange={value => this.updateInput('category', value)}
                options={category.options}
              />
            </View>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.secondTitle}>
              Describe what you are selling
            </Text>
          </View>

          <View>
            <Text>Please add the title, be descriptive</Text>
            <Input
              placeholder="Enter a title"
              type={title.type}
              value={title.value}
              onChangeText={value => this.updateInput('title', value)}
              autoCapitalize="none"
              style={styles.inputText}
            />
          </View>

          <View>
            <Input
              placeholder="Enter the description"
              type={description.type}
              value={description.value}
              onChangeText={value => this.updateInput('description', value)}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={4}
              style={styles.inputTextMultiline}
            />
          </View>

          <View>
            <Text style={{ marginTop: 20, marginBottom: 20 }}>
              Add here how much your want for the item
            </Text>
            <Input
              placeholder="Enter the price"
              type={price.type}
              value={price.value}
              onChangeText={value => this.updateInput('price', value)}
              autoCapitalize="none"
              style={styles.inputText}
              keyboardType="numeric"
            />
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.secondTitle}>Add your contact data</Text>
          </View>

          <View>
            <Text>Please enter the emal where users can contact you</Text>
            <Input
              placeholder="Enter your email"
              type={email.type}
              value={email.value}
              onChangeText={value => this.updateInput('email', value)}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.inputText}
            />
          </View>
          {this.state.loading ? (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <Button
              title="Sell it"
              color="lightgrey"
              onPress={this.submitFormHandler}
            />
          )}
          <Modal
            animationType="slide"
            visible={this.state.hasErrors}
            onRequestClose={() => {}}
          >
            <View style={{ padding: 20 }}>
              {this.renderErrors()}>
              <Button title="Got it !!!" onPress={this.clearErrors} />
            </View>
          </Modal>

          <Modal
            animationType="slide"
            visible={this.state.modalSuccess}
            onRequestClose={() => {}}
          >
            <View style={{ padding: 20 }}>
              <Text>Good job !!!</Text>
              <Button
                title="Go back home"
                onPress={() => {
                  this.resetSellitScreen();
                  this.props.navigator.switchToTab({ tabIndex: 0 });
                }}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    flex: 1,
    padding: 20
  },
  mainTitle: {
    fontSize: 30,
    fontFamily: 'Roboto-Black',
    color: '#00ada9'
  },
  secondTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Black',
    color: '#00ada9',
    marginTop: 30,
    marginBottom: 30
  },
  inputText: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0,
    padding: 10
  },
  inputTextMultiline: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0,
    padding: 10,
    minHeight: 100
  },
  error: {
    fontFamily: 'Roboto-Black',
    fontSize: 16,
    color: 'red',
    marginBottom: 10
  }
});

const mapStateToProps = ({ user, article }) => ({ user, article });

export default connect(
  mapStateToProps,
  { addArticle, resetArticle }
)(AddPost);
