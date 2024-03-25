import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";
import * as SecureStore from "expo-secure-store";

import { publishSession } from "./sessions";

export async function logout() {
  const auth = getAuth();
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("firebase_token");
  await AsyncStorage.removeItem("email");
  await signOut(auth);
  await publishSession();
}
