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
import {Host} from 'react-native-portalize';

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
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: styles.headerLeftContainer,
          }}
          initialRouteName="splash">
          {/* stacks must be add here */}

          {startUpNavigation()}
          {mainNavigation()}
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingLeft: 12,
  },
});
