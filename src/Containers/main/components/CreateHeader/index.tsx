import {colors, typography} from '@Theme';

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICreateHeader} from './CreateHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {dimensions} from '@Theme/Variables';
import {Back} from '@Commons';

const CreateHeader = ({title}: ICreateHeader.IProps) => {
  const {top: statusBarHeight} = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.buttonContainer,
        {paddingTop: statusBarHeight ? statusBarHeight + 5 : 20},
      ]}>
      <View style={styles.titleWrapper}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.buttonStyle}>
        <Back crossIcon />
      </View>
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

  titleWrapper: {flexDirection: 'row', alignItems: 'center'},
  headerText: {...typography.mid, color: colors.white},
  buttonStyle: {
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral['600'],
  },
});

export default CreateHeader;
