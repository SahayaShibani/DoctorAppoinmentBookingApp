import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import AssetExample from './components/AssetExample';
import Login from './App/Screens/Login';
import AppNavigator from './components/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import Color from './assets/Shared/Color';
import TabNavigation from './App/Navigations/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { AuthProvider, AuthContext } from './components/authContext';
import AdminNavigation from './App/Navigations/AdminNavigation';
import DoctorNavigations from './App/Navigations/DoctorNavigations';

export default function App() {
  
  const [loaded, error] = useFonts({
    'appfont': require('./assets/fonts/Outfit-Regular.ttf'),
    'appfont-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'appfont-semi': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'appfont': require('./assets/fonts/Outfit-Regular.ttf'),
  });

  if(!loaded){
    return null;
  }

  return (
    <AuthProvider>
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar style="white" translucent={false} backgroundColor={Color.PRIMARY}/>
      <AuthContext.Consumer>
        {({ isAuthenticated ,role}) => (
          !isAuthenticated ? (
            <AppNavigator />
          ) : (
            <NavigationContainer>
              {
                role == 'admin' ? <AdminNavigation/> : role == 'doctor'? <DoctorNavigations/>: <TabNavigation />
              }
            </NavigationContainer>
          )
        )}
      </AuthContext.Consumer>
    </SafeAreaView>
  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
