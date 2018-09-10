import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { iOS } from '../../../utils/constant';
import { getUserPosts } from '../../../store/actions/users';
import { deleteArticle } from '../../../store/actions/articles';

class UserPosts extends Component {
  static navigatorButtons = {
    leftButtons:
      Platform.OS === iOS ? [{ title: 'Go back', id: 'goBack' }] : null
  };

  state = {
    modal: false,
    toDelete: null,
    loading: false
  };

  constructor(props) {
    super(props);
    if (Platform.OS == iOS) {
      this.props.navigator.setOnNavigatorEvent(({ id }) => {
        if (id === 'goBack') {
          this.props.navigator.dismissAllModals({
            animationType: 'slide-down'
          });
        }
      });
    }
  }

  componentDidMount() {
    this.props.getUserPosts(() => {});
  }

  deleteArticle = () => {
    const { toDelete } = this.state;
    this.setState({ loading: true });
    this.props.deleteArticle(toDelete, () => {
      this.props.getUserPosts(() => {
        this.setState({ loading: false, modal: false, toDelete: null });
      });
    });
  };

  renderPosts = () => {
    const userPosts = this.props.user.userPosts || [];
    return userPosts.map(p => (
      <View style={styles.itemWrapper} key={p.id}>
        <View style={styles.itemTitle}>
          <Text style={{ fontFamily: 'Roboto-Black' }}>{p.title}</Text>
        </View>
        <View style={styles.itemDescription}>
          <Text>{p.description}</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.small}>PRICE: $ {p.price}</Text>
            <Text style={styles.small}>CATEGORY: {p.category}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => this.showConfirm(p.id)}>
            <Text
              style={{
                fontFamily: 'Roboto-Black',
                color: '#f44336',
                paddingBottom: 10
              }}
            >
              Delete Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  showConfirm = id => {
    this.setState({ modal: true, toDelete: id });
  };

  render() {
    const userPosts = this.props.user.userPosts || [];
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginBottom: 30 }}>
            <Text>You have ${userPosts.length} posts</Text>
          </View>
          {this.renderPosts()}
        </View>
        <Modal
          visible={this.state.modal}
          onRequestClose={() => {}}
          animationType="slide"
          transparent={false}
        >
          {this.state.loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={{ padding: 50 }}>
              <Text style={{ fontSize: 20 }}>
                Are you sure you want to delete the post?
              </Text>
              <View style={{ marginTop: 50 }}>
                <TouchableOpacity onPress={this.deleteArticle}>
                  <Text style={styles.modalDelete}>Yes, Delete it</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.setState({ modal: false, toDelete: null })
                  }
                >
                  <Text style={styles.modalClose}>Nop, keep it</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  itemWrapper: {
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 2,
    marginBottom: 20
  },
  itemTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  itemDescription: {
    padding: 10
  },
  small: {
    fontSize: 12
  },
  buttons: {
    alignItems: 'center'
  },
  modalDelete: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#f44336'
  },
  modalClose: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#00ada9'
  }
});

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  { getUserPosts, deleteArticle }
)(UserPosts);
