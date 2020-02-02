import * as React from 'react';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';

class BackHandlerAndroid extends React.Component {
  _willFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    if (props.navigation.isFocused()) BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    this._willFocusSubscription = props.navigation.addListener('willFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
    );
  }

  onBackPressed = () => {
    return this.props.onBackPress();
  };

  componentWillUnmount() {
    this._willFocusSubscription && this._willFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  render() {
    return this.props.children || null;
  }
}

export const AndroidBackHandler = withNavigation(BackHandlerAndroid);
