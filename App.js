import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import Login from './src/components/views/Login';
import Home from './src/components/views/Home';
import AddPost from './src/components/views/Admin/AddPost';

import configureStore from './src/components/store/config';

const store = configureStore();

Navigation.registerComponent('sellit.Login', () => Login, store, Provider);
Navigation.registerComponent('sellit.Home', () => Home, store, Provider);
Navigation.registerComponent('sellit.AddPost', () => AddPost, store, Provider);

export default () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'sellit.Login',
      title: 'Login',
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
