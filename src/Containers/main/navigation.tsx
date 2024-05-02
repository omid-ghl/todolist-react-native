import React from 'react';
import {Stack} from '../../Navigators/NavigationStack';
import {Home} from './Screens';

export const mainNavigation = () => (
  <>
    <Stack.Screen name="home" component={Home} />
  </>
);
