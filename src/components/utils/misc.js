import { Dimensions, Platform, AsyncStorage } from 'react-native';

import { PORTRAIT, LANDSCAPE, iOS, ANDROID } from './constant';

export const getOrientation = () => {
  const { height, width } = Dimensions.get('window');
  return height > width ? PORTRAIT : LANDSCAPE;
};

export const setOrientationListener = cb => {
  Dimensions.addEventListener('change', cb);
};

export const removeOrientationListener = cb => {
  Dimensions.removeEventListener('change', cb);
};

export const getPlatform = () => {
  return Platform.OS === iOS ? iOS : ANDROID;
};

export const getExpiration = () => {
  const now = new Date();
  return now.getTime() + 3600 * 1000;
};

export const setTokens = async ({ uid, token, refToken, expiration }) => {
  await AsyncStorage.multiSet([
    ['token', token],
    ['refToken', refToken],
    ['expiration', expiration.toString()],
    ['uid', uid]
  ]);
};

export const getTokens = async () => {
  const data = await AsyncStorage.multiGet([
    'token',
    'refToken',
    'expiration',
    'uid'
  ]);
  return data.reduce((result, d) => {
    result[d[0]] = d[1];
    return result;
  }, {});
};

export function navigatorDrawer({ type, id }) {
  if (type === 'NavBarButtonPress' && id === 'drawerButton') {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });
  }
}

export function navigatorDeepLink({ type, payload, link }) {
  if (type === 'DeepLink') {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });
    const { typeLink, index } = payload;
    if (typeLink === 'tab') {
      this.props.navigator.switchToTab({
        tabIndex: index
      });
    } else {
      this.props.navigator.showModal({
        screen: link,
        animationType: 'slide-up',
        navigatorStyle: {
          navBarBackgroundColor: '#00ada9',
          screenBackgroundColor: '#fff'
        },
        backButtonHidden: false
      });
    }
  }
}

export const gridTwoColumns = articles => {
  if (!articles) {
    return [];
  }
  let newArticles = [];
  let count = 1;
  let vessel = {};
  for (const a of articles) {
    if (count === 1) {
      vessel['blockOne'] = a;
      count += 1;
    } else {
      vessel['blockTwo'] = a;
      newArticles.push(vessel);
      count = 1;
      vessel = {};
    }
  }
  return newArticles;
};
