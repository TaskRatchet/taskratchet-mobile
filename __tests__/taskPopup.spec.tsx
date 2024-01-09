import {render} from '@testing-library/react-native';
import React from 'react';

import App from '../src/App';

describe('TaskPopup', () => {
  it('does not render at login', () => {
    const {queryByTestId} = render(<App />);

    const taskPopup = queryByTestId('taskPopup');

    expect(taskPopup).toBeNull();
  });
});
