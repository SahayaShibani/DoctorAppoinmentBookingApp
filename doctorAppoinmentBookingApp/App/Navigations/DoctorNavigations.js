import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home'
import Appointment from '../Screens/Appointment'
import Profile from '../Screens/Profile';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import color from '../../assets/Shared/Color'
import HomeNavigation from '../components/Navigations/HomeNavigation'
import Explores from '../Screens/Explores'
import Dashboard from '../Screens/Dashboard'
import PatientsList from '../Screens/PatientsList'
import DoctorDashBoard from '../Screens/DoctorDashBoard'
import AppoinmentNavigations from './AppoinmentNavigations'

const Tab = createBottomTabNavigator();

const DoctorNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='DoctorDashBoard' component={AppoinmentNavigations}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <Ionicons name="home" size={size} color={color} />
                }}
            />
            
            {/* <Tab.Screen name='Appointment' component={} 
            options={{
                tabBarIcon: ({ color, size }) =>
                    <Ionicons name="calendar" size={size} color={color} />
            }}
            /> */}
            <Tab.Screen name='Profile' component={Profile} 
            options={{
                tabBarIcon: ({ color, size }) =>
                    <FontAwesome name="user-circle-o" size={size} color={color} />
            }}
            />
        </Tab.Navigator>
    )
}

export default DoctorNavigation