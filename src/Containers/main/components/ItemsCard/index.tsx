import {SVG, colors, typography} from '@Theme';

import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IItemsCard} from './ItemsCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {dimensions} from '@Theme/Variables';

const ItemsCard = ({title}: IItemsCard.IProps) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: dimensions.width * 0.95,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.neutral['800'],
        marginTop: 15,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
      }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderWidth: 2,
          borderColor: colors.primary,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SVG.BareTick width={12} height={12} />
      </View>
      <View>
        <Text
          style={{
            marginLeft: 10,
            ...typography.content,
            color: colors.neutral['100'],
          }}>
          {title}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            ...typography.content,
            color: colors.neutral['400'],
            marginTop: 5,
          }}>
          {'desc and date'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ItemsCard;
