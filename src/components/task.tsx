import {View, Text, StyleSheet} from 'react-native';

//local imports
import themeProvider from './providers/themeProvider';
import tasks from '../utils/currentTasks';

const tasksArray = Object.values(tasks);

export default function task({item}: {item: number}): JSX.Element {
  return (
    <View style={styles.taskBlock}>
      <View>
        <Text style={styles.taskTitle}>{tasksArray[item].title}</Text>
        <Text style={styles.taskDeadline}>{tasksArray[item].deadline}</Text>
      </View>

      <View style={styles.taskSideRight}>
        <Text style={styles.taskStakes}>{tasksArray[item].stakes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskSideRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  taskStakes: {
    fontSize: 23,
    marginRight: 10,
  },
  taskDeadline: {
    fontSize: 10,
  },
  taskTitle: {
    fontSize: 20,
  },
  taskBlock: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
  },
});
