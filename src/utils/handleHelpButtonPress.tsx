import {Linking} from 'react-native';

export function handleHelpButtonPress() {
  Linking.openURL('mailto:support@example.com').catch(err =>
    console.error('An error occurred', err),
  );
}
