import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontPage from '../../App/Screens/FrontPage';
import Login from '../../App/Screens/Login';
import Color from '../../assets/Shared/Color';
import Register from '../../App/Screens/Register';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="frontPage"
        // screenOptions={{headerShown:false}}
        >
       <Stack.Screen name ="FrontPage" component={FrontPage} options={{title:"Welcome" , headerStyle:{
        backgroundColor:Color.PRIMARY,
       },
       headerTintColor : Color.white,
       headerTitleStyle: {
        fontWeight: 'bold',
        
      },
       }}/>
       <Stack.Screen name ="Login" component={Login} options={{title:"Welcome Back" , headerStyle:{
        backgroundColor:Color.PRIMARY ,
       }, 
       headerTintColor : Color.white,
       headerTitleStyle: {
        fontWeight: 'bold', 
      },
       }}/>
       <Stack.Screen name ="Register" component={Register} options={{title:"Register", headerStyle:{
        backgroundColor:Color.PRIMARY ,
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
