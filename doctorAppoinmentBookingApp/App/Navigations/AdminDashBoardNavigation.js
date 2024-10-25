import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontPage from '../../App/Screens/FrontPage';
import Color from '../../assets/Shared/Color';
import PatientsList from '../Screens/PatientsList';
import AppoinmentRequest from '../components/DoctorDashBoardCOmponents/AppoinmentRequest';
import AppoinmentsRequestPage from '../Screens/AppoinmentsRequestPage';
import Dashboard from '../Screens/Dashboard';
import AdminViewPage from '../Screens/AdminViewPage';
import TotalAppoinments from '../Screens/TotalAppoinments';

const Stack = createStackNavigator();

export default function AdminDashBoardNavigation() {
  return (
    <Stack.Navigator>
       <Stack.Screen 
          name="/" 
          component={Dashboard} 
          options={{ headerShown: false }}  // Hide header if needed
        />
       <Stack.Screen name="doctors" component={AdminViewPage} options={{ headerShown: false }}/>
       <Stack.Screen name="patients" component={AdminViewPage} options={{ headerShown: false }}/>
  <Stack.Screen name="TotalAppointments" component={TotalAppoinments} options={{ headerShown: false }}/>
  <Stack.Screen name="CompletedAppointments" component={TotalAppoinments} options={{ headerShown: false }}/>
  <Stack.Screen name="PendingAppointments" component={TotalAppoinments} options={{ headerShown: false }}/>
  <Stack.Screen name="CancelledAppointments" component={TotalAppoinments} options={{ headerShown: false }}/>
  <Stack.Screen name="PatientFeedback" component={TotalAppoinments} options={{ headerShown: false }}/> 

       </Stack.Navigator>
  )
}