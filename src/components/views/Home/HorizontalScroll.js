import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class HorizontalScroll extends Component {
  renderIcon = () => {
    const { categories } = this.props;
    return (
      categories &&
      categories.map((c, i) => (
        <View style={{ marginRight: 15 }} key={i}>
          <Icon.Button
            name={this.categoriesIcons(c)}
            iconStyle={{ marginRight: 10, marginLeft: 3 }}
            backgroundColor={
              this.props.categorySelected === c ? '#ff6444' : '#c1c1c1'
            }
            size={20}
            borderRadius={100}
            onPress={() => this.props.updateCategoryHandler(c)}
          >
            <Text style={{ color: '#fff', marginRight: 5 }}>{c}</Text>
          </Icon.Button>
        </View>
      ))
    );
  };

  categoriesIcons = name => {
    let icon = '';
    switch (name) {
      case 'All':
        return 'circle-o-notch';
      case 'Sports':
        return 'soccer-ball-o';
      case 'Music':
        return 'music';
      case 'Clothing':
        return 'shopping-bag';
      case 'Electronics':
        return 'tv';
      default:
        return icon;
    }
  };

  render() {
    return (
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        snapToInterval={200}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.scrollContainer}>{this.renderIcon()}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    width: '100%'
  }
});

export default HorizontalScroll;
