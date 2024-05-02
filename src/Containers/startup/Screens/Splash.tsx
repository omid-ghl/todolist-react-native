import {AppScreen} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import AsyncStorageService from '@Services/storageService';
import {setNewTodo} from '@Store/todos';
import {colors, typography} from '@Theme';
import {STORAGE_KEYS} from '@constants/storageKeys';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';

const Splash: React.FC<StackScreenProps<StackParamList, 'splash'>> = ({
  navigation: {reset},
}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

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

    console.log('localTodoslocalTodos', localTodos);
    if (localTodos) {
      dispatch(setNewTodo(localTodos));
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
      <ActivityIndicator color={colors.white} style={styles.loadStyle} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadStyle: {marginTop: 40},
  textStyle: {...typography.huge, color: colors.white},
});

export default Splash;
