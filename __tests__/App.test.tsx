import 'react-native';
import {it} from '@jest/globals';
import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

it('renders correctly', async () => {
  const {findByText} = render(<App />);
  const element = await findByText('Username');
  expect(element).toBeVisible();
});
