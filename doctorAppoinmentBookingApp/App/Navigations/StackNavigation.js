import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontPage from '../../App/Screens/FrontPage';
import Color from '../../assets/Shared/Color';
import PatientsList from '../Screens/PatientsList';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="adminDashBoard"
        // screenOptions={{headerShown:false}}
        >
       <Stack.Screen name ="Patients" component={PatientsList} options={{ headerStyle:{
        backgroundColor:Color.PRIMARY,
       },
       headerTintColor : Color.white,
       headerTitleStyle: {
        fontWeight: 'bold',
        
      },
       }}/>

       </Stack.Navigator>
    </NavigationContainer>
  )
}
