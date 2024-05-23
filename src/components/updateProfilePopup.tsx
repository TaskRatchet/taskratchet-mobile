import React, {useState} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {styles} from '../styles/updateProfilePopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import type {infoPopupProps} from './types';
import {TextInput} from 'react-native-gesture-handler';
import {updateMe} from '../services/taskratchet/updateMe';
import useMe from '../services/taskratchet/useMe';
import PressableLoading from './pressableLoading';
import {useMutation} from '@tanstack/react-query';
import {SelectList} from 'react-native-dropdown-select-list';
import fetchTimezoneList from '../utils/fetchTimezoneList';
import {useEffect} from 'react';

export default function UpdateProfilePopup({
  modalVisible,
  setModalVisible,
}: infoPopupProps): JSX.Element {
  const {data: user, refetch} = useMe();

  const [errorMessage, setErrorMessage] = useState('');

  const Mutation = useMutation({
    mutationFn: (vars: {name: string; email: string; timezone: string}) => {
      return updateMe(vars);
    },
    onSuccess: async () => {
      await refetch();
      setModalVisible(!modalVisible);
    },
    onError: error => {
      console.error('Error updating profile:', error);
      setErrorMessage('Error updating profile');
    },
  });

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

  const [timezoneListData, setTimezoneListData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTimezoneList();
      setTimezoneListData(data);
    };

    fetchData();
  }, []);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [timezone, setTimezone] = useState(user.timezone);
  // const [selectedTimezone, setSelectedTimezone] = useState('');

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
            {
              // Display error message if there is one
              errorMessage !== '' ? (
                <Text style={styles.errorTextStyle}>{errorMessage}</Text>
              ) : null
            }

            {/* inputs */}
            <View style={styles.label_input_groups}>
              <View style={styles.label_input_group}>
                <Text style={[styles.label, textColorStyle]}>Name:</Text>
                <TextInput
                  style={[styles.input, inputBackgroundStyle, textColorStyle]}
                  keyboardType="default"
                  placeholder="Enter Name"
                  onChange={i => {
                    setName(i.nativeEvent.text);
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
                  }}
                />
              </View>

              <View style={styles.label_input_group}>
                <Text style={[styles.label, textColorStyle]}>Timezone:</Text>

                <SelectList
                  data={timezoneListData}
                  boxStyles={[styles.boxStyles, inputBackgroundStyle]}
                  inputStyles={[styles.boxInput, textColorStyle]}
                  dropdownItemStyles={styles.dropdownItemStyles}
                  dropdownTextStyles={textColorStyle}
                  setSelected={item => {
                    console.log('selected:', timezoneListData[item].value);
                    setTimezone(timezoneListData[item].value);
                  }}
                />
              </View>
            </View>

            {/* buttons */}
            <PressableLoading
              loading={Mutation.isPending}
              loadingTextStyle={styles.textStyle}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgba(0, 103, 69, 0.5)'
                    : '#006745',
                },
                styles.button,
              ]}
              onPress={async () => {
                // If the fields are empty, use the original user data
                const updatedName = name !== '' ? name : user.name;
                const updatedEmail = email !== '' ? email : user.email;
                const updatedTimezone =
                  timezone !== '' ? timezone : user.timezone;

                Mutation.mutate({
                  name: updatedName,
                  email: updatedEmail,
                  timezone: updatedTimezone,
                });

                console.log('timezone:', updatedTimezone);
                console.log('updating profile');
              }}>
              <Text style={[styles.textStyle, textColorStyle]}>Update</Text>
            </PressableLoading>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgba(33, 150, 243, 0.5)'
                    : '#2196F3',
                },
                styles.button,
              ]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, textColorStyle]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
