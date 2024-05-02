import {AppScreen, Button} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {CreateHeader} from '../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ItemInjectioner: React.FC<StackScreenProps<StackParamList, 'create'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const {bottom} = useSafeAreaInsets();

  return (
    <AppScreen style={styles.container}>
      <CreateHeader />
      <Button
        style={{
          position: 'absolute',
          alignSelf: 'center',
          borderRadius: 100,
          bottom: bottom / 2 + 7,
        }}
        title={t('save')}
        icon={<SVG.Plus />}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgContent,
  },
});

export default ItemInjectioner;
