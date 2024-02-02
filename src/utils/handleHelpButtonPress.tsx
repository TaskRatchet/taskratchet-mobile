import {Linking} from 'react-native';

export function handleHelpButtonPress() {
  Linking.openURL('mailto:support@taskratchet.com').catch(err =>
    console.error('An error occurred', err),
  );
}
