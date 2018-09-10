import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const BlockItem = ({ item, index, goto }, left = true) => {
  const renderBlock = block => {
    const { title, price } = block;
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          goto(block);
        }}
      >
        <View
          style={[
            styles.blockGridStyle,
            left ? styles.blockGridLeftStyle : styles.blockGridRightStyle
          ]}
        >
          <View>
            <Image
              source={{
                uri: 'https://loremflickr.com/400/400/gridTwoColumns,brazil,dog'
              }}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextTitle}>{title}</Text>
            <Text style={styles.itemTextPrice}>${price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.blockRow}>
        {renderBlock(item.blockOne)}
        {renderBlock(item.blockTwo, false)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blockRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between'
  },
  itemImage: {
    width: '100%',
    height: 200
  },
  itemTextContainer: {
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6444'
  },
  itemTextTitle: {
    fontFamily: 'Roboto-Black',
    color: '#4c4c4c',
    marginBottom: 5
  },
  itemTextPrice: {
    fontFamily: 'Roboto-Black',
    color: '#00ada9',
    marginBottom: 5
  },
  blockGridStyle: {
    backgroundColor: '#f1f1f1'
  },
  blockGridLeftStyle: {
    marginRight: 2.5
  },
  blockGridRightStyle: {
    marginLeft: 2.5
  }
});

export default BlockItem;
