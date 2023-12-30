import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {styles} from '../styles/taskListItemStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import checkDate from '../utils/checkDate';
import convertCents from '../utils/convertCents';
import getStoredTasks from '../utils/getStoredTasks';
import {TaskType} from './types';

interface taskProps {
  item: number;
}

export default function Task({item}: taskProps): JSX.Element {
  const isDarkMode = useIsDarkMode();
  const primaryStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.primary
      : themeProvider.colorsLight.primary,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks: TaskType[] = await getStoredTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTasks().catch(error => {
      console.error('Error fetching tasks:', error);
    });
  }, []);

  function getDeadlineDetails(isCompleted: boolean, days: number) {
    let text;
    let style;

    switch (true) {
      case isCompleted && days < 0:
        text = 'Completed';
        break;
      case days < 0:
        text = 'Overdue';
        break;
      case days === 0:
        text = 'Due Today';
        break;
      case days === 1:
        text = 'Due Tomorrow';
        break;
      default:
        text = 'Due in ' + days + ' days';
        break;
    }

    switch (true) {
      case isCompleted:
        style = styles.textGreen;
        break;
      case days < 0:
        style = styles.textRed;
        break;
      case days <= 1:
        style = styles.textYellow;
        break;
      default:
        style = styles.textGreen;
        break;
    }

    return {text, style};
  }

  const deadlineDetails = tasks[item]
    ? getDeadlineDetails(tasks[item].complete, checkDate(tasks[item].due))
    : {text: '', style: {}};

  function getFooterStyle(isComplete: boolean, daysToDue: number) {
    switch (true) {
      case isComplete:
        return {style: styles.footerGreen};
      case daysToDue < 0 && !isComplete:
        return {style: styles.footerGrey};
      case daysToDue < 7 && !isComplete:
        return {style: styles.footerRed};
      case daysToDue >= 7 && !isComplete:
        return {style: styles.footerYellow};
      default:
        return {style: styles.footerRed};
    }
  }

  const footerStyle = tasks[item]
    ? getFooterStyle(tasks[item].complete, checkDate(tasks[item].due))
    : {style: {}};

  return (
    <View style={[primaryStyle, styles.taskBlock]}>
      <View style={[styles.row]}>
        <View style={[styles.flexOne]}>
          <Text style={[textColorStyle, styles.taskTitle]} numberOfLines={1}>
            {tasks && tasks.length > 0 ? tasks[item].task : 'Loading...'}
          </Text>
          <Text style={deadlineDetails.style}>{deadlineDetails.text}</Text>
        </View>

        <View style={styles.taskSideRight}>
          <Text style={[textColorStyle, styles.taskStakes]}>
            {tasks && tasks.length > 0
              ? convertCents(tasks[item].cents)
              : 'Loading...'}
          </Text>
        </View>
      </View>
      <View style={[footerStyle.style, styles.statusFooter]} />
    </View>
  );
}
