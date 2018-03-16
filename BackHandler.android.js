import * as React from 'react';
import { withNavigation } from 'react-navigation';

class BackHandlerAndroid extends React.Component {
  _willBlurSubscription;
  _didFocusSubscription;

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.props.onBackButtonPress)
    );
    this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.props.onBackButtonPress)
    );
  }

  componentWillUnmount() {
    this._willBlurSubscription && this._willBlurSubscription.remove();
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  render() {
    return this.props.children;
  }
}

export const BackHandler = withNavigation(BackHandlerAndroid);
