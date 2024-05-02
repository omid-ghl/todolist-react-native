import {SVG} from '@Theme';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {IBack} from './Back';

const HITSLOP_ZONE = {
  left: 20, // To increase press area on the left side
  right: 20, // To increase press area on the right side
  bottom: 20,
  top: 20,
};

const Back: React.FC<IBack.IProps> = ({crossIcon}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      hitSlop={HITSLOP_ZONE}
      onPress={() => navigation.goBack()}
      style={styles.backContainer}>
      {crossIcon ? (
        <SVG.Close width={18} height={18} />
      ) : (
        <SVG.Back width={12} height={12} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    padding: 3,
  },
});

export default Back;
