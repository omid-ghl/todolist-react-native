import {AppScreen, Button, Input} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {CreateHeader} from '../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorageService from '@Services/storageService';
import {STORAGE_KEYS} from '@constants/storageKeys';
import {useAppDispatch, useAppSelector} from '@Hooks';
import {hardSetTodos, setNewTodo} from '@Store/todos';
import {todo} from '@Models';

const ItemInjectioner: React.FC<StackScreenProps<StackParamList, 'create'>> = ({
  navigation,
  route: {params},
}) => {
  const {t} = useTranslation();
  const {bottom} = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todosList);

  const editingMode = params?.editing ?? false;
  const injectedTitle = params?.title ?? null;
  const injectedCreationDate = params?.creationDate ?? null;

  const [inputValue, setInputValue] = useState<string>(injectedTitle ?? '');
  const [saveLoader, setSaveLoader] = useState<boolean>(false);

  const onSaveHandler = useCallback(async () => {
    setSaveLoader(true);
    dispatch(setNewTodo({title: inputValue, creationDate: new Date()}));

    const prevDatas =
      (await AsyncStorageService.get(STORAGE_KEYS.todoList)) ?? [];

    await AsyncStorageService.set(STORAGE_KEYS.todoList, [
      ...prevDatas,
      {title: inputValue, creationDate: new Date()},
    ]);

    setTimeout(() => {
      setSaveLoader(false);
      navigation.goBack();
    }, 500);
  }, [dispatch, inputValue, navigation]);

  const onUpdateHandler = useCallback(async () => {
    setSaveLoader(true);

    const innerTodos: Array<todo> = todos?.map(
      ({title, creationDate}: todo) => {
        if (title === injectedTitle && creationDate === injectedCreationDate) {
          return {title: inputValue, creationDate};
        }

        return {title, creationDate};
      },
    );

    await AsyncStorageService.set(STORAGE_KEYS.todoList, innerTodos);
    dispatch(hardSetTodos(innerTodos));

    setTimeout(() => {
      setSaveLoader(false);
      navigation.goBack();
    }, 500);
  }, [
    dispatch,
    injectedCreationDate,
    injectedTitle,
    inputValue,
    navigation,
    todos,
  ]);

  return (
    <AppScreen style={styles.container}>
      <CreateHeader title={t(editingMode ? 'updateItem' : 'newItem')} />
      <Input
        wrapperStyle={styles.inputWrapperStyle}
        placeholder={t(editingMode ? 'editItem' : 'addNewItem')}
        multiline
        style={styles.inputStyle}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Button
        style={[styles.addBtnStyle, {bottom: bottom / 2 + 7}]}
        title={t(editingMode ? 'update' : 'save')}
        icon={<SVG.Plus />}
        onPress={editingMode ? onUpdateHandler : onSaveHandler}
        isLoading={saveLoader}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgContent,
  },
  addBtnStyle: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 100,
  },
  inputWrapperStyle: {marginTop: 15},
  inputStyle: {minHeight: 140},
});

export default ItemInjectioner;
