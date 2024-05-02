import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import '@Translations';
import {ApplicationNavigator} from '@Navigators/ApplicationNavigator';
import {Provider} from 'react-redux';
import {store} from './src/Store';
import {AlertWrapper} from '@Commons';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Provider store={store}>
          <ApplicationNavigator />
          <AlertWrapper />
          <Toast />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
