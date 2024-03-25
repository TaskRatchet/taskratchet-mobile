import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { ImageSourcePropType } from "react-native";

import logo from "../../app_assets/images/logo_taskratchet_512_bordered.png";
import { styles } from "../styles/splashStyle";

export function WithSplashScreen({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isAppReady && children}

      <Splash isAppReady={isAppReady} />
    </>
  );
}

const LOADING_IMAGE = "Loading image";
const FADE_IN_IMAGE = "Fade in image";
const WAIT_FOR_APP_TO_BE_READY = "Wait for app to be ready";
const FADE_OUT = "Fade out";
const HIDDEN = "Hidden";

export const Splash = ({ isAppReady }: { isAppReady: boolean }) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<
    | typeof LOADING_IMAGE
    | typeof FADE_IN_IMAGE
    | typeof WAIT_FOR_APP_TO_BE_READY
    | typeof FADE_OUT
    | typeof HIDDEN
  >(LOADING_IMAGE);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) {
    return null;
  }

  return (
    <Animated.View
      collapsable={false}
      style={[styles.container, { opacity: containerOpacity }]}
    >
      <Animated.Image
        source={logo as ImageSourcePropType}
        fadeDuration={0}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={[styles.image, { opacity: imageOpacity }]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.title, { opacity: imageOpacity }]}>
        TaskRatchet
      </Animated.Text>
      <Animated.Text style={[styles.text, { opacity: imageOpacity }]}>
        {state === LOADING_IMAGE && "Loading..."}
        {state === WAIT_FOR_APP_TO_BE_READY && "Waiting for app to be ready..."}
        {state === FADE_OUT && "Loading..."}
      </Animated.Text>
    </Animated.View>
  );
};
