import React, {useState} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {styles} from '../styles/updateProfilePopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import type {infoPopupProps} from './types';
import {TextInput} from 'react-native-gesture-handler';
import {updateMe} from '../services/taskratchet/updateMe';
import useMe from '../services/taskratchet/useMe';

export default function UpdateProfilePopup({
  modalVisible,
  setModalVisible,
}: infoPopupProps): JSX.Element {
  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.secondaryLight
      : themeProvider.colorsLight.secondary,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const inputBackgroundStyle = {
    backgroundColor: isDarkMode ? '#303845' : '#EFEFF0',
  };

  const {data: user} = useMe();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [timezone, setTimezone] = useState(user.timezone);

  return (
    <View>
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            {/* title */}
            <Text style={[styles.titleStyle, textColorStyle]}>
              Update Profile
            </Text>
            <Text style={[styles.textStyle, textColorStyle]}>
              * Fields left blank will remain unchanged.{'\n'}
            </Text>

            {/* inputs */}
            <View style={styles.label_input_group}>
              <Text style={[styles.label, textColorStyle]}>Name:</Text>
              <TextInput
                style={[styles.input, inputBackgroundStyle, textColorStyle]}
                keyboardType="default"
                placeholder="Enter Name"
                onChange={i => {
                  setName(i.nativeEvent.text);
                  console.log('updating local name');
                }}
              />
            </View>

            <View style={styles.label_input_group}>
              <Text style={[styles.label, textColorStyle]}>Email:</Text>
              <TextInput
                style={[styles.input, inputBackgroundStyle, textColorStyle]}
                keyboardType="email-address"
                placeholder="Enter Email"
                onChange={i => {
                  setEmail(i.nativeEvent.text);
                  console.log('updating local email');
                }}
              />
            </View>

            <View style={styles.label_input_group}>
              <Text style={[styles.label, textColorStyle]}>Timezone:</Text>
              <TextInput
                style={[styles.input, inputBackgroundStyle, textColorStyle]}
                keyboardType="default"
                placeholder="Enter Timezone"
                onChange={i => {
                  setTimezone(i.nativeEvent.text);
                  console.log('updating local timezone');
                }}
              />
            </View>

            {/* buttons */}
            <Pressable
              style={[styles.button, backgroundStyle]}
              onPress={async () => {
                try {
                  // If the fields are empty, use the original user data
                  const updatedName = name !== '' ? name : user.name;
                  const updatedEmail = email !== '' ? email : user.email;
                  const updatedTimezone =
                    timezone !== '' ? timezone : user.timezone;

                  await updateMe({
                    name: updatedName,
                    email: updatedEmail,
                    timezone: updatedTimezone,
                  });
                  setModalVisible(!modalVisible);
                  console.log('updating profile');
                } catch (error) {
                  console.error(`Error updating profile: ${String(error)}`);
                }
              }}>
              <Text style={[styles.textStyle, textColorStyle]}>Update</Text>
            </Pressable>
            <Pressable
              style={[styles.button, backgroundStyle]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, textColorStyle]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
