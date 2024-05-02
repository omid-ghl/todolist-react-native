import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {navigationRef} from './NavigationService';
import {Stack} from './NavigationStack';
import {StackParamList} from './Stacks';
import {mainNavigation} from '@Containers/main';
import {startUpNavigation} from '@Containers/startup';

export const ApplicationNavigator = () => {
  const routeNameRef = useRef<string>();
  return (
    <NavigationContainer
      ref={navigationRef as NavigationContainerRefWithCurrent<StackParamList>}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (currentRouteName && previousRouteName !== currentRouteName) {
        }
        routeNameRef.current = currentRouteName;
      }}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerLeftContainerStyle: styles.headerLeftContainer,
        }}
        initialRouteName="splash">
        {startUpNavigation()}
        {mainNavigation()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingLeft: 12,
  },
});
