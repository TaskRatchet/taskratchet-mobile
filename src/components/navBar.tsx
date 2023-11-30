import {StyleSheet, View, Image} from 'react-native';
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../components/providers/themeProvider';
import {c} from 'vitest/dist/reporters-5f784f42';
import {create} from 'domain';

export default function NavBar(): JSX.Element {
  const secondaryStyle = {
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.secondary
      : themeProvider.colorsLight.secondary,
  };

  return (
    <View style={[secondaryStyle, styles.navBar]}>
      <View style={styles.barElement}></View>
      <View style={styles.barElement}>
        <Image
          style={styles.navIcon}
          source={require('../../assets/images/nav_check_black.png')}
        />
      </View>
      <View style={styles.barElement}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  navIcon: {
    width: 50,
    height: 50,
  },
  barElement: {
    padding: 10,
    alignItems: 'center',
    height: '100%',
    width: '33.3333%',
    borderWidth: 1,
    borderRadius: 3,
  },
  navBar: {
    height: 80,
    flexDirection: 'row',
  },
});
