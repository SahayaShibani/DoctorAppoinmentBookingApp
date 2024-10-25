import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppoinmentRequest from '../components/DoctorDashBoardCOmponents/AppoinmentRequest';
import Color from '../../assets/Shared/Color';
import url from '../../assets/root';
import PageHeader from '../components/Shared/PageHeader';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppoinmentsRequestPage() {

  const [appoinmentRequest, setAppoinmnetRequest] = useState([]);

  const fetchRecentAppoinments = async () => {

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${url}/appoinment/recentAppoinmentRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "pending" })
      })

      const data = await response?.json();
      if (!data?.success) {
        throw new Error(data.message || "Failed to fetch appointments");
      }
      setAppoinmnetRequest(data?.appointments);

    }
    catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
  }

  useEffect(() => {
    fetchRecentAppoinments();
  }, [])

  return (
    <View style={{ padding: 20 }}>
      <PageHeader title=" New Requests" backButton={true} />
      {
        appoinmentRequest.length <= 0 ? (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}><Ionicons name="cloud-done" size={54} color={Color.PRIMARY} /><Text style={{ textAlign: "center", fontFamily: 'appfont-semi', color: Color.PRIMARY }}>No New Requests</Text></View>) : (<FlatList keyExtractor={(item, index) => index.toString()} data={appoinmentRequest} renderItem={({ item }) => (<AppoinmentRequest data={item} fetchRecentAppoinments={fetchRecentAppoinments} />)} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false} />)

      }
    </View>
  )
}