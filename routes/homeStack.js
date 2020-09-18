import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Header from "../shared/header";
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';
import {MaterialIcons} from "@expo/vector-icons";
import HeaderReviews from '../shared/headerReviews';

const Stack = createStackNavigator();

export default HomeStack = () => {
  return (
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={({ navigation }) => {
            return {               
                headerTitle: () => <Header navigation={navigation} title="GameZone"/>,
                }
            }} />

        <Stack.Screen
          name="ReviewDetails"
          component={ReviewDetails}
          options={() => 
          {return {
              headerTitle: () => <HeaderReviews title="Review Details"/>
          }}}/>
      </Stack.Navigator>
  );
};