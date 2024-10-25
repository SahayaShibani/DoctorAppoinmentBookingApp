import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontPage from '../../App/Screens/FrontPage';
import Color from '../../assets/Shared/Color';
import PatientsList from '../Screens/PatientsList';
import AppoinmentRequest from '../components/DoctorDashBoardCOmponents/AppoinmentRequest';
import DoctorDashBoard from '../Screens/DoctorDashBoard';
import AppoinmentsRequestPage from '../Screens/AppoinmentsRequestPage';
import Appointment from '../Screens/Appointment';

const Stack = createStackNavigator();

export default function AppoinmentNavigations() {
     
     return (
          <Stack.Navigator>
               <Stack.Screen
                    name="/"
                    component={DoctorDashBoard}
                    options={{ headerShown: false }}  // Hide header if needed
               />
               <Stack.Screen name="AppointmentRequests" component={AppoinmentsRequestPage} options={{ headerShown: false }} />
               <Stack.Screen name="TotalAppointments" component={Appointment} options={{ headerShown: false }} />
               <Stack.Screen name="CompletedAppointments" component={Appointment} options={{ headerShown: false }} />
               <Stack.Screen name="PendingAppointments" component={Appointment} options={{ headerShown: false }} />
               <Stack.Screen name="CancelledAppointments" component={Appointment} options={{ headerShown: false }} />
               <Stack.Screen name="PatientFeedback" component={Appointment} options={{ headerShown: false }} />

          </Stack.Navigator>

     )
}