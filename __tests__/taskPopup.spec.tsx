import {render} from '@testing-library/react-native';
import React from 'react';
import App from '../src/App';

describe('TaskPopup', () => {
  it('does not render at login', () => {
    const {queryByTestId} = render(<App />);

    // Assuming TaskPopup has a testID prop set to 'taskPopup'
    const taskPopup = queryByTestId('taskPopup');

    expect(taskPopup).toBeNull();
  });
});
