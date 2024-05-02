import {AppScreen, Button} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import ItemsCard from '../components/ItemsCard';

const Home: React.FC<StackScreenProps<StackParamList, 'home'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const gotoCreateNewPost = useCallback(() => {
    navigation.navigate('create');
  }, [navigation]);

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessage}>No cards available</Text>
      </View>
    );
  };

  return (
    <AppScreen style={styles.container}>
      <HomeHeader onNewItemPressed={gotoCreateNewPost} />

      <FlatList
        // keyExtractor={item => JSON.stringify(item?.id)}
        renderItem={({item}) => <ItemsCard title={JSON.stringify(item)} />}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={renderEmptyList}
        data={new Array(20).fill({data: 'lamsdk', id: 1})}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgContent,
  },
  buttonContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    marginTop: 20,
    marginBottom: 25,
  },
  newPostButton: {
    width: 180,
    height: 36,
  },
  plusIcon: {
    marginRight: 5,
  },
  flatListContainer: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
  },
  loadingContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  errorContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  errorMessage: {
    color: colors.error,
    fontSize: typography.body,
  },
  emptyContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  emptyMessage: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
});

export default Home;
