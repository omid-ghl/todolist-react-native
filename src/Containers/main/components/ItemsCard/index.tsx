import {SVG, colors, typography} from '@Theme';

import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IItemsCard} from './ItemsCard';
import {dimensions} from '@Theme/Variables';

const ItemsCard = ({title, creationDate}: IItemsCard.IProps) => {
  const {t} = useTranslation();

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

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.itemWrapper}>
      <View style={styles.checkBoxWrapper}>
        <SVG.BareTick width={12} height={12} />
      </View>
      <View>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.deesStyle}>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
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
    paddingVertical: 12,
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
    ...typography.content,
    color: colors.neutral['100'],
  },
  deesStyle: {
    marginLeft: 10,
    ...typography.content,
    color: colors.neutral['400'],
    marginTop: 5,
  },
});

export default ItemsCard;
