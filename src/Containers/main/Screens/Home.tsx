import {AppScreen, Button} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import ItemsCard from '../components/ItemsCard';
import {useAppSelector} from '@Hooks';
import AsyncStorageService from '@Services/storageService';
import {todo} from '@Models';

const Home: React.FC<StackScreenProps<StackParamList, 'home'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const todos = useAppSelector(state => state.todos.todosList);

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

  const keyExtractor = ({title, creationDate}: todo) =>
    JSON.stringify(title + creationDate);

  return (
    <AppScreen style={styles.container}>
      <HomeHeader onNewItemPressed={gotoCreateNewPost} />

      <FlatList
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <ItemsCard title={item?.title} creationDate={item?.creationDate} />
        )}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={renderEmptyList}
        data={todos}
      />
      <Button
        title="clear all"
        onPress={async () => {
          await AsyncStorageService.clear();
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
  },
  emptyContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  emptyMessage: {
    ...typography.title,
    color: colors.neutral['500'],
  },
});

export default Home;
