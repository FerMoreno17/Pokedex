import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/tabNavigator';
import SplashScreen from 'react-native-splash-screen';


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>

  );
};

export default App;

