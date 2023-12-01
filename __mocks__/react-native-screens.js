jest.mock('react-native-screens', () => {
  const RealComponent = jest.requireActual('react-native-screens');
  const React = require('react');
  const {View} = require('react-native');

  class Screen extends React.Component {
    render() {
      return React.createElement(View, this.props, this.props.children);
    }
  }

  if (RealComponent.Screen) {
    Screen.propTypes = RealComponent.Screen.propTypes;
  }

  class ScreenContainer extends React.Component {
    render() {
      return React.createElement(View, this.props, this.props.children);
    }
  }

  if (RealComponent.ScreenContainer) {
    ScreenContainer.propTypes = RealComponent.ScreenContainer.propTypes;
  }

  return {
    ...RealComponent,
    enableScreens: jest.fn(),
    Screen,
    ScreenContainer,
  };
});
