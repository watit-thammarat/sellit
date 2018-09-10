import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default async allow => {
  const [barsIcon, dollarIcon, searchIcon] = await Promise.all([
    Icon.getImageSource('bars', 20, 'white'),
    Icon.getImageSource('dollar', 20, 'white'),
    Icon.getImageSource('search', 20, 'white')
  ]);

  const navStyle = {
    navBarTextFontSize: 20,
    navBarTextColor: '#fff',
    navBarFontFamily: 'RobotoCondensed-Bold',
    navBarTitleTextCentered: true, //Android only
    navBarBackgroundColor: '#00ada9'
  };

  const navLeftButton = icon => ({
    title: 'Drawer',
    id: 'drawerButton',
    icon,
    disableIconTint: true,
    buttonColor: '#fff'
  });

  const navigatorButtons = {
    leftButtons: [navLeftButton(barsIcon)]
  };

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'sellit.Home',
        label: 'Home',
        title: 'Home',
        icon: searchIcon,
        navigatorStyle: navStyle,
        navigatorButtons
      },
      {
        screen: allow ? 'sellit.AddPost' : 'sellit.NotAllow',
        label: 'Sell it',
        title: 'Sell it',
        icon: dollarIcon,
        navigatorStyle: navStyle,
        navigatorButtons
      }
    ],
    tabsStyle: {
      tabBarButtonColor: 'grey',
      tabBarSelectedButtonColor: '#ffc636',
      tabBarTextFontFamily: 'RobotoCondensed-Bold',
      tabBarBackgroundColor: '#fff',
      tabBarTranslucent: false
    },
    appStyle: {
      tabBarButtonColor: 'grey',
      tabBarSelectedButtonColor: '#ffc636',
      tabBarTextFontFamily: 'RobotoCondensed-Bold',
      tabBarBackgroundColor: '#fff',
      tabBarTranslucent: false,
      navBarButtonColor: '#fff',
      keepStyleAcrossPush: true
    },
    drawer: {
      left: {
        screen: 'sellit.Sidedrawer',
        fixedWidth: 500
      }
    }
  });
};
