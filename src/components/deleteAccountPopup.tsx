import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

import deleteMe from '../services/taskratchet/deleteMe';
import {styles} from '../styles/deleteAccountPopupStyle';
import PressableLoading from './pressableLoading';
import type {DeleteAccountPopupProps} from './types';

export default function DeleteAccountPopup({
  navigation,
  modalVisible,
  setModalVisible,
}: DeleteAccountPopupProps) {
  const mutation = useMutation({
    mutationFn: deleteMe,
    onError: error => {
      console.log('delete account error ' + String(error));
    },
  });

  return (
    <View>
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Delete Account</Text>
            {mutation.isSuccess ? (
              <>
                <Text style={styles.description}>
                  Your account has been successfully deleted.
                </Text>
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? 'rgba(33, 150, 243, 0.5)'
                        : '#2196F3',
                    },
                    styles.cancelButton,
                  ]}>
                  <Text
                    style={styles.textStyle}
                    onPress={() => {
                      setModalVisible(false);
                      navigation?.navigate('LoginScreen');
                    }}>
                    Logout
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.description}>
                  Are you sure you want to delete your account? This will
                  permanently delete all data associated with your account, and
                  you will no longer be able to access your account in the app
                  or online. This action cannot be undone.
                </Text>
                <PressableLoading
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? 'rgba(255, 0, 0, 0.5)' : 'red',
                    },
                    styles.confirmButton,
                  ]}
                  onPress={() => mutation.mutate()}
                  loading={mutation.isPending}
                  loadingTextStyle={styles.loadingText}>
                  <Text style={styles.textStyle}>Confirm</Text>
                </PressableLoading>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? 'rgba(33, 150, 243, 0.5)'
                        : '#2196F3',
                    },
                    styles.cancelButton,
                  ]}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                {mutation.error ? (
                  <>
                    <Text style={styles.error}>Failed to Delete Account</Text>
                    <Text style={styles.error}>
                      Please email support@taskratchet.com
                    </Text>
                  </>
                ) : null}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
