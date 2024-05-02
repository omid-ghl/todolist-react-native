import {AppScreen, Input} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {colors, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import {ItemsCard} from '../components';
import {useAppSelector} from '@Hooks';
import {todo} from '@Models';

const Home: React.FC<StackScreenProps<StackParamList, 'home'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const todos = useAppSelector(state => state.todos.todosList);
  const [searchValue, setSearchValue] = useState('');

  const gotoCreateNewPost = useCallback(() => {
    return navigation.navigate('create');
  }, [navigation]);

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessage}>No cards available</Text>
      </View>
    );
  };

  const keyExtractor = ({title, creationDate}: todo, index: number) =>
    JSON.stringify(title + JSON.stringify(creationDate) + index);

  const finalValues = todos?.filter(item => {
    const lowerCaseTitle = item?.title?.toLowerCase();
    const lowerCaseSearchCase = searchValue?.toLowerCase();
    return lowerCaseTitle.includes(lowerCaseSearchCase);
  });

  return (
    <AppScreen style={styles.container}>
      <HomeHeader onNewItemPressed={gotoCreateNewPost} />
      <Input
        wrapperStyle={styles.inputStyle}
        placeholder={t('search')}
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <FlatList
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => (
          <ItemsCard
            title={item?.title}
            creationDate={item?.creationDate}
            index={index}
          />
        )}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={renderEmptyList}
        data={finalValues}
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
  inputStyle: {
    marginTop: 10,
    marginBottom: 5,
  },
});

export default Home;
