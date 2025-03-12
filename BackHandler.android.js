import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useAndroidBackHandler = (onBackPress) => (
  useFocusEffect((
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [onBackPress])
  ))
);

export const AndroidBackHandler = ({ onBackPress, children = null }) => {
  useAndroidBackHandler(onBackPress);

  return children;
};
