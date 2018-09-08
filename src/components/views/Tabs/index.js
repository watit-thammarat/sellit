import { Navigation } from 'react-native-navigation';

import FalseIcon from '../../../assets/images/circle.png';

export default () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'sellit.Home',
        label: 'Home',
        title: 'Home',
        icon: FalseIcon
      },
      {
        screen: 'sellit.AddPost',
        label: 'Sell it',
        title: 'Sell it',
        icon: FalseIcon
      }
    ]
  });
};
