import {Modal} from '@Commons';
import {SortBy} from '@Hooks/useSortData';
import AsyncStorageService from '@Services/storageService';
import {reset as resetTodos} from '@Store/todos';
import {colors, typography} from '@Theme';
import {dimensions} from '@Theme/Variables';
import {INITIAL_SORT_TYPE} from '@constants/common';
import React, {RefObject, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

const ActionsModal = ({
  ActionsModalRef,
  onSort,
}: {
  ActionsModalRef: RefObject<any>;
  onSort: ({sortParam}: {sortParam: SortBy}) => void;
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [sortParam, setSortParam] = useState<SortBy>(INITIAL_SORT_TYPE);

  const closeModal = useCallback(() => {
    ActionsModalRef.current.close();
  }, [ActionsModalRef]);

  const {bottom: bottomHeight} = useSafeAreaInsets();

  const clearAllHandler = async () => {
    await AsyncStorageService.clear();
    dispatch(resetTodos());

    closeModal();
  };

  const actions = [
    {
      title: 'deleteAll',
      onPress: clearAllHandler,
    },
    {
      title: 'sortBy',
      onPress: () => {
        if (sortParam === 'creationDate') {
          setSortParam('title');
          onSort({sortParam: 'title'});
        } else {
          setSortParam('creationDate');
          onSort({sortParam: 'creationDate'});
        }
      },
    },
  ];

  return (
    <Modal
      wrapperStyle={[styles.wrapperStyle, {paddingBottom: bottomHeight + 10}]}
      customRef={ActionsModalRef}
      contentStyle={[
        Platform.OS === 'ios' ? {maxHeight: dimensions.height * 0.9} : {},
      ]}>
      <Text style={styles.titleStyle}>Actions</Text>

      {actions.map(({title, onPress}, index) => {
        return (
          <TouchableOpacity
            style={styles.rowWrapperStyle}
            onPress={onPress}
            key={index}>
            <Text style={styles.rowStyle}>
              {t(title, {
                parameter:
                  sortParam === 'creationDate' ? 'ASC Title 🔠' : 'Date 📆',
              })}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Text style={styles.subTitle}>" Its now By {sortParam} "</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {backgroundColor: colors.neutral['800']},
  rowStyle: {...typography.title, color: colors.white},
  rowWrapperStyle: {marginTop: 50},
  titleStyle: {
    ...typography.title,
    color: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
  subTitle: {
    ...typography.minimal,
    color: colors.neutral['400'],
    marginTop: 60,
    marginBottom: 40,
    textTransform: 'uppercase',
  },
});

export default ActionsModal;
