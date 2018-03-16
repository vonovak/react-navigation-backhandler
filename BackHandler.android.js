import * as React from 'react';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';

class BackHandlerAndroid extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;

  componentDidMount() {
    this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
    );
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
    );
  }

  onBackPressed = () => {
    return this.props.onBackPress();
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    return this.props.children;
  }
}

export const AndroidBackHandler = withNavigation(BackHandlerAndroid);
