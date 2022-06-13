import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabNavigator from './navigation/tabNavigator';


const App = () => {

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>

  );
};

export default App;

