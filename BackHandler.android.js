import * as React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { BackHandler } from 'react-native';

class BackHandlerAndroid extends React.Component {
  _focusSubscription;
  _blurSubscription;

  constructor(props) {
    super(props);
    if (props.navigation.isFocused()) BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    this._focusSubscription = props.navigation.addListener('focus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
    );
  }

  componentDidMount() {
    this._blurSubscription = this.props.navigation.addListener('blur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
    );
  }

  onBackPressed = () => {
    return this.props.onBackPress();
  };

  componentWillUnmount() {
    this._focusSubscription && this._focusSubscription.remove();
    this._blurSubscription && this._blurSubscription.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  render() {
    return this.props.children || null;
  }
}

export const AndroidBackHandler = withNavigation(BackHandlerAndroid);
