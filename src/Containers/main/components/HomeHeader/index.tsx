import {SVG, colors, typography} from '@Theme';

import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IHomeHeader} from './HomeHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {dimensions} from '@Theme/Variables';

const HomeHeader = ({onNewItemPressed}: IHomeHeader.IProps) => {
  const {t} = useTranslation();
  const {top: statusBarHeight} = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.buttonContainer,
        {paddingTop: statusBarHeight ? statusBarHeight + 5 : 20},
      ]}>
      <View style={styles.titleWrapper}>
        <SVG.BareTick width={24} height={24} />
        <SVG.BareTick width={24} height={24} style={styles.secIcon} />
        <Text style={styles.headerText}>{t('lists')}</Text>
      </View>
      <TouchableOpacity onPress={onNewItemPressed} style={styles.buttonStyle}>
        <SVG.Plus />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingBottom: 15,
    backgroundColor: colors.bgContent,
    paddingHorizontal: dimensions.width * 0.025,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral['600'],
  },
  newPostButton: {
    width: 42,
    height: 42,
  },
  plusIcon: {
    marginRight: 5,
  },
  titleWrapper: {flexDirection: 'row', alignItems: 'center'},
  secIcon: {marginLeft: -10},
  headerText: {...typography.mid, marginLeft: 5, color: colors.white},
  buttonStyle: {
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});

export default HomeHeader;
