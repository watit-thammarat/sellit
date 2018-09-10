import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import HorizontalScroll from './HorizontalScroll';
import BlockItem from './BlockItem';

import {
  navigatorDrawer,
  navigatorDeepLink,
  gridTwoColumns
} from '../../utils/misc';
import { getArticles } from '../../store/actions/articles';

class Home extends Component {
  state = {
    categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
    categorySelected: 'All',
    hasErrors: '',
    articles: null,
    isLoading: true
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(e => {
      navigatorDeepLink.bind(this)(e);
      navigatorDrawer.bind(this)(e);
    });
  }

  componentDidMount() {
    this.getArticles();
  }

  updateCategoryHandler = categorySelected => {
    this.setState({ categorySelected }, this.getArticles);
  };

  getArticles = () => {
    this.setState({ isLoading: true });
    this.props.getArticles(this.state.categorySelected, err => {
      if (err) {
        this.setState({ hasErrors: err, isLoading: false });
      } else {
        const articles = gridTwoColumns(this.props.article.list);
        this.setState({ articles, isLoading: false });
      }
    });
  };

  renderLoading = () => (
    <View style={styles.loading}>
      <Icon name="gears" size={30} color="lightgrey" />
      <Text style={{ color: 'lightgrey' }}>Loading ...</Text>
    </View>
  );

  goToArticleHandler = articleData => {
    this.props.navigator.push({
      screen: 'sellit.Article',
      passProps: { articleData },
      animationType: 'slide-horizontal',
      backButtonTitle: 'Back to Home',
      navigatorStyle: {
        navBarTextFontSize: 20,
        navBarTextColor: '#fff',
        navBarTextFontFamily: 'RobotoCondensed-Bold',
        navBarBackgroundColor: '#00ada9',
        screenBackgroundColor: '#fff'
      }
    });
  };

  showArticles = () => {
    return this.state.articles.map((a, i) => (
      <BlockItem key={i} item={a} index={i} goto={this.goToArticleHandler} />
    ));
  };

  renderArticles = () => (
    <View style={styles.articleContainer}>
      <View style={{ flex: 1 }}>{this.showArticles()}</View>
    </View>
  );

  render() {
    const content = this.state.isLoading
      ? this.renderLoading()
      : this.renderArticles();
    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScroll
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />
          {content}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  articleContainer: {
    padding: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = ({ article }) => ({ article });

export default connect(
  mapStateToProps,
  { getArticles }
)(Home);
