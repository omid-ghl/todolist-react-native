import {SVG, colors, typography} from '@Theme';

import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IItemsCard} from './ItemsCard';
import {dimensions} from '@Theme/Variables';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '@Hooks';
import {hardSetTodos} from '@Store/todos';
import AsyncStorageService from '@Services/storageService';
import {STORAGE_KEYS} from '@constants/storageKeys';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '@Navigators/Stacks';
import {StackNavigationProp} from '@react-navigation/stack';
import {Todo} from '@Models';

const _ItemsCard = (todo: IItemsCard.IProps) => {
  const {title, creationDate, index} = todo;
  const navigation =
    useNavigation<StackNavigationProp<StackParamList, 'home'>>();

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todosList);

  const [showActions, setShowActions] = useState(false);

  const date = new Date(creationDate);

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  const hardSaveValues = useCallback(
    async (values: Array<Todo>) => {
      dispatch(hardSetTodos(values));

      await AsyncStorageService.set(STORAGE_KEYS.todoList, values);
    },
    [dispatch],
  );

  const handleActionToggle = useCallback(() => {
    setShowActions(pre => !pre);
  }, []);

  const onDelete = useCallback(async () => {
    handleActionToggle();
    const remainTodos = todos.filter(
      item => item.title !== title && item.creationDate !== creationDate,
    );

    hardSaveValues(remainTodos);
  }, [creationDate, handleActionToggle, hardSaveValues, title, todos]);

  const onEdit = useCallback(() => {
    handleActionToggle();
    navigation.navigate('create', {...todo, editing: true});
  }, [handleActionToggle, navigation, todo]);

  const onDoneHandler = useCallback(async () => {
    // it can be minimized but this structure is more readable

    const modifiedTodos = todos?.map((item: Todo) => {
      if (item?.title === title && item?.creationDate === creationDate) {
        return {
          title: item?.title,
          creationDate: item?.creationDate,
          isDone: !item?.isDone,
        };
      }
      return {
        title: item?.title,
        creationDate: item?.creationDate,
        isDone: item?.isDone ?? false,
      };
    });

    await hardSaveValues(modifiedTodos);
  }, [creationDate, hardSaveValues, title, todos]);

  return (
    <Animated.View
      entering={FadeInRight.duration(500).delay(250 * index)}
      exiting={FadeOutLeft.duration(500)}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.itemWrapper}
        onPress={handleActionToggle}>
        <TouchableOpacity
          onPress={onDoneHandler}
          hitSlop={{top: 10, bottom: 10, right: 5, left: 5}}
          style={styles.checkBoxWrapper}>
          {todo?.isDone && <SVG.BareTick width={12} height={12} />}
        </TouchableOpacity>
        <View style={styles.dtaWrappStyle}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.deesStyle}>{formattedDate}</Text>
        </View>
        {showActions && (
          <Animated.View
            entering={SlideInRight.duration(500)}
            exiting={SlideOutRight.duration(500)}
            style={styles.drawerWrapper}>
            <TouchableOpacity style={styles.delBtn} onPress={onDelete}>
              <SVG.Trash />
              <Text style={styles.actionTit}>{t('delete')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.edtBtn} onPress={onEdit}>
              <SVG.Edit width={10} height={10} />
              <Text style={styles.actionTit}>{t('edit')}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: dimensions.width * 0.95,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.neutral['800'],
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    minHeight: 68,
    overflow: 'hidden',
  },
  checkBoxWrapper: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    marginLeft: 10,
    flexWrap: 'wrap', // Allow text to wrap
    ...typography.content,
    color: colors.neutral['100'],
  },
  deesStyle: {
    marginLeft: 10,
    ...typography.content,
    color: colors.neutral['400'],
    marginTop: 5,
  },
  drawerWrapper: {
    right: 0,
    flex: 1,
    position: 'absolute',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row-reverse',
    backgroundColor: colors.neutral['800'],
  },
  delBtn: {
    flexDirection: 'row',
    backgroundColor: colors.error,
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  actionTit: {
    marginLeft: 5,
    ...typography.minimal,
    color: colors.white,
  },
  edtBtn: {
    flexDirection: 'row',
    backgroundColor: colors.hint,
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dtaWrappStyle: {
    flex: 1,
    padding: 12,
  },
});

export const ItemsCard = React.memo(_ItemsCard);
