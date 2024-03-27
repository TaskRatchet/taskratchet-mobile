import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';

import navCheckBlack from '../../app_assets/images/nav_check_black.png';
import themeProvider from '../providers/themeProvider';
import useIsDarkMode from '../utils/checkDarkMode';

export default function NavBar(): JSX.Element {
  const isDarkMode = useIsDarkMode();
  const secondaryStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.secondary
      : themeProvider.colorsLight.secondary,
  };

  return (
    <View style={[secondaryStyle, styles.navBar]}>
      <View style={styles.barElement} />
      <View style={styles.barElement}>
        <Image
          style={styles.navIcon}
          source={navCheckBlack as ImageSourcePropType}
        />
      </View>
      <View style={styles.barElement} />
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
