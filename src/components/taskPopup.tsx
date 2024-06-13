import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {getTasks} from '../services/taskratchet/getTasks';
import {TaskInput, updateTask} from '../services/taskratchet/updateTask';
import {styles} from '../styles/taskPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import checkDate from '../utils/checkDate';
import PressableLoading from './pressableLoading';
import {TaskPopupProps} from './types';

export default function TaskPopup({
  id,
  modalVisible,
  setModalVisible,
}: TaskPopupProps): JSX.Element {
  const {data: tasks} = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const task = useMemo(() => {
    return tasks?.find(t => t.id === id);
  }, [tasks, id]);

  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.secondary
      : themeProvider.colorsLight.secondary,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (vars: {taskId: string; data: TaskInput}) => {
      return updateTask(vars.taskId, vars.data);
    },
    onError: error => {
      console.error('Error updating task:', error);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({queryKey: ['tasks']});
    },
  });

  function getDeadlineDetails(days: number) {
    if (days === null) {
      return {text: '', style: {}}; // TODO: this is a temporary fix for null data
    }
    switch (true) {
      case days < 0:
        return {text: 'Overdue', style: styles.textRed};
      case days === 0:
        return {text: 'Due Today', style: styles.textYellow};
      case days === 1:
        return {text: 'Due Tomorrow', style: styles.textYellow};
      default:
        return {text: 'Due in ' + days + ' days', style: styles.textGreen};
    }
  }

  const deadlineDetails = task && getDeadlineDetails(checkDate(task.due));
  const [stakesWidth, setStakesWidth] = React.useState(0);

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {task ? (
          <View style={styles.centeredView}>
            <View style={[styles.modalView, backgroundStyle]}>
              <View style={(styles.line, {paddingRight: stakesWidth + 10})}>
                <View>
                  <Text style={[styles.title, textColorStyle]}>
                    {task.task}
                  </Text>
                  <Text style={deadlineDetails?.style}>
                    {deadlineDetails?.text}
                  </Text>
                </View>
                <Text
                  style={[styles.stakes, textColorStyle]}
                  onLayout={event => {
                    const {width} = event.nativeEvent.layout;
                    setStakesWidth(width);
                  }}>
                  ${Number(task.cents / 100).toFixed(2)}
                </Text>
              </View>
              {checkDate(task.due) >= 0 ? (
                <PressableLoading
                  loading={mutation.isPending}
                  loadingTextStyle={styles.textStyle}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? 'rgba(0, 103, 69, 0.5)'
                        : '#006745',
                    },
                    styles.button,
                    styles.buttonComplete,
                  ]}
                  onPress={() => {
                    if (id === undefined) {
                      throw new Error('Task ID is undefined');
                    }
                    mutation.mutate({
                      taskId: id,
                      data: {complete: !task.complete},
                    });
                  }}>
                  <Text style={styles.textStyle}>
                    {task.complete ? 'Mark Incomplete' : 'Mark Complete'}
                  </Text>
                </PressableLoading>
              ) : null}
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? 'rgba(33, 150, 243, 0.5)'
                      : '#2196F3',
                    marginTop: checkDate(task.due) >= 0 ? 5 : 35,
                  },
                  styles.button,
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Text>Failed to find selected item</Text>
        )}
      </Modal>
    </View>
  );
}
