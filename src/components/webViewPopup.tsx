import React from 'react';
import {Modal, Pressable, SafeAreaView, Text, View} from 'react-native';
import WebView from 'react-native-webview';

import themeProvider from '../providers/themeProvider';
import {styles} from '../styles/webViewPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import type {WebViewPopupProps} from './types';

export default function WebViewPopup({
  webViewModalVisible,
  setWebViewModalVisible,
}: WebViewPopupProps): JSX.Element {
  const isDarkMode = useIsDarkMode();
  const [isSuccess, setIsSuccess] = React.useState(false); // Add this line

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.secondaryLight
      : themeProvider.colorsLight.secondary,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  return (
    <View>
      <SafeAreaView>
        <Modal
          visible={webViewModalVisible}
          transparent={false}
          animationType="none"
          style={[backgroundStyle]}>
          <View style={[styles.centeredView, backgroundStyle]}>
            {isSuccess ? (
              <>
                <Text style={[styles.message, textColorStyle]}>
                  Account Successfully Created
                </Text>
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? 'rgba(33, 150, 243, 0.5)'
                        : '#2196F3',
                    },
                    styles.button,
                  ]}
                  onPress={() => setWebViewModalVisible(!webViewModalVisible)}>
                  <Text style={styles.textStyle}>Return to Login</Text>
                </Pressable>
              </>
            ) : (
              <>
                <WebView
                  source={{
                    uri: 'https://app.taskratchet.com/register',
                  }}
                  onNavigationStateChange={navState => {
                    const urlPattern =
                      /^https:\/\/app\.taskratchet\.com\/success/;
                    if (urlPattern.test(navState.url)) {
                      setIsSuccess(true);
                    }
                  }}
                />
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? 'rgba(33, 150, 243, 0.5)'
                        : '#2196F3',
                    },
                    styles.button,
                  ]}
                  onPress={() => setWebViewModalVisible(!webViewModalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
