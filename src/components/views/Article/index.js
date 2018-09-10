import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Article = ({ articleData }) => {
  const renderImage = () => {
    const { price } = articleData;
    return (
      <View style={{ position: 'relative' }}>
        <Image
          resizeMode="cover"
          style={styles.articleImage}
          source={{
            uri: 'https://loremflickr.com/400/400/gridTwoColumns,brazil,dog'
          }}
        />
        <Text style={styles.priceTag}>${price}</Text>
      </View>
    );
  };

  const renderText = () => {
    const { title, description } = articleData;
    return (
      <View>
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.articleDescription}>{description}</Text>
      </View>
    );
  };

  const renderOwner = () => {
    const { email } = articleData;
    return (
      <View style={styles.owner}>
        <Text>Contact the owner of this article to the following mail:</Text>
        <Icon.Button
          name="envelope-o"
          color="#00ada9"
          backgroundColor="#fff"
          onPress={openEmail}
        >
          <Text style={{ fontSize: 20 }}>{email}</Text>
        </Icon.Button>
      </View>
    );
  };

  const openEmail = () => {
    const { email, title } = articleData;
    Linking.openURL(`mailto://${email}&subject=Regarding ${title}`);
  };

  return (
    <ScrollView style={styles.articleContainer}>
      {renderImage()}
      {renderText()}
      {renderOwner()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10
  },
  articleImage: {
    width: '100%',
    height: 250
  },
  priceTag: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ff6444',
    padding: 10,
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Black'
  },
  articleTitle: {
    fontSize: 30,
    color: '#474143',
    fontFamily: 'Roboto-Black',
    marginTop: 20
  },
  articleDescription: {
    fontSize: 18,
    marginTop: 20
  },
  owner: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey'
  }
});

export default Article;
