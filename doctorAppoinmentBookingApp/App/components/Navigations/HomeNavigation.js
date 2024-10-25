import { View, Text } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HospitalDoctorsList from '../../Screens/HospitalDoctorsList';
import Home from '../../Screens/Home';
import HospitalDetails from '../../Screens/HospitalDetails';
import BookAppointment from '../../Screens/BookAppointment'
import DoctorDetails from '../Doctor/DoctorDetails';
import BookDoctorAppoiment from '../../Screens/BookDoctorAppoiment';
import Requests from '../../Screens/Requests';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='hospital-doctor-list-screen' component={HospitalDoctorsList} />
      <Stack.Screen name='doctor-details' component={DoctorDetails} />
      <Stack.Screen name='hospital-details' component={HospitalDetails} />
      <Stack.Screen name='book-doctor-appointment' component={BookDoctorAppoiment} />
      <Stack.Screen name='book-appointment' component={BookAppointment} />
      <Stack.Screen name="appoinmentsRequests" component={Requests} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}