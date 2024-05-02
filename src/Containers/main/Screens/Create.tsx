import {AppScreen, Button, Input} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {CreateHeader} from '../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorageService from '@Services/storageService';
import {STORAGE_KEYS} from '@constants/storageKeys';
import {useAppDispatch} from '@Hooks';
import {setNewTodo} from '@Store/todos';

const ItemInjectioner: React.FC<StackScreenProps<StackParamList, 'create'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const {bottom} = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const inputRef = useRef();

  const [inputValue, setInputValue] = useState('');
  const [saveLoader, setSaveLoader] = useState(false);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

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

  return (
    <AppScreen style={styles.container}>
      <CreateHeader />
      <Input
        ref={inputRef}
        wrapperStyle={styles.inputWrapperStyle}
        placeholder={t('addNewItem')}
        multiline
        style={styles.inputStyle}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Button
        style={[styles.addBtnStyle, {bottom: bottom / 2 + 7}]}
        title={t('save')}
        icon={<SVG.Plus />}
        onPress={onSaveHandler}
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
