import {AppScreen} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import AsyncStorageService from '@Services/storageService';
import {hardSetTodos} from '@Store/todos';
import {colors, typography} from '@Theme';
import {STORAGE_KEYS} from '@constants/storageKeys';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';

const Splash: React.FC<StackScreenProps<StackParamList, 'splash'>> = ({
  navigation: {reset},
}) => {
  const dispatch = useDispatch();

  const resetNavigationTo = useCallback(
    (name: keyof StackParamList) => {
      reset({
        routes: [
          {
            name,
          },
        ],
      });
      SplashScreen.hide();
    },
    [reset],
  );

  const startUpActions = async () => {
    const localTodos = await AsyncStorageService.get(STORAGE_KEYS.todoList);

    if (localTodos) {
      dispatch(hardSetTodos(localTodos));
    }
  };

  useEffect(() => {
    (async () => {
      await startUpActions();
      setTimeout(() => {
        resetNavigationTo('home');
      }, 1000);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppScreen style={styles.container}>
      <Text style={styles.textStyle}>Splash screen</Text>
      <ActivityIndicator color={colors.primary} style={styles.loadStyle} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral['900'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadStyle: {marginTop: 40},
  textStyle: {...typography.huge, color: colors.primary},
});

export default Splash;
