import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import React, {useRef} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {navigationRef} from './NavigationService';
import {Stack} from './NavigationStack';
import {StackParamList} from './Stacks';
import {mainNavigation} from '@Containers/main';
import {startUpNavigation} from '@Containers/startup';
import {Host} from 'react-native-portalize';
import {colors} from '@Theme';

export const ApplicationNavigator = () => {
  const routeNameRef = useRef<string>();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.bgContent, // Change this to your desired background color
    },
  };

  return (
    <NavigationContainer
      theme={MyTheme}
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
        backgroundColor={colors.bgContent}
        barStyle={'light-content'}
      />
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: styles.headerLeftContainer,
            cardStyle: {backgroundColor: colors.bgContent}, // This sets the background for transitions
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
