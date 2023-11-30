import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

export default function ProfileScreen({route}) {
  let dataObj = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        This is the Profile Screen of {dataObj.websiteName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
});
