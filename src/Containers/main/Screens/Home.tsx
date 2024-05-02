import {AppScreen, Button} from '@Commons';
import {StackParamList} from '@Navigators/Stacks';
import {SVG, colors, typography} from '@Theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

const Home: React.FC<StackScreenProps<StackParamList, 'home'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const gotoCreateNewPost = useCallback(() => {
    navigation.navigate('createPost');
  }, [navigation]);

  return (
    <AppScreen style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={gotoCreateNewPost}
          title={t('new_post')}
          icon={<SVG.Plus style={styles.plusIcon} />}
          style={styles.newPostButton}
          textStyle={typography.content}
        />
      </View>

      {/* <FlatList
        keyExtractor={item => JSON.stringify(item?.id)}
        renderItem={renderPostCard}
        contentContainerStyle={styles.flatListContainer}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        onRefresh={refetchPosts}
        refreshing={fetchingPosts}
        data={posts}
      /> */}
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
