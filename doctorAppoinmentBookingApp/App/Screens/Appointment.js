import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import PageHeader from '../components/Shared/PageHeader'
import AppoinmentCardItem from '../components/Appoinment/AppoinmentCardItem';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../assets/Shared/Color';
import url from '../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Appointment = () => {
  const route = useRoute();
  const {data} = route.params
 
 const [appointmentList , setAppoinmentList] = useState(data);

 const fetchAppoinments  = async(status) =>{
  try
  {
    const token = await AsyncStorage.getItem("token");
    console.log("Request body:", JSON.stringify({ status }));

    const response =await fetch(`${url}/appoinment/`,{
      method:"post",
      headers:{
        'authorization' : `Bearer ${token}`,
        "content-type":"Application/json"
      },
      body:JSON.stringify({status})
    })
  
  const data = await response.json();
  console.log("app" , data);
  
  if (!data.success) {
      throw new Error(data.message || "Failed to fetch appointments");
  }

  const appointments = data.appointments || [];
  const appointmentCount = appointments.length;

  setAppoinmentList((prevState) => ({
    ...prevState, 
    data: appointments, 
    Nos: appointmentCount 
  }));

} catch (err) {
  console.log('Error fetching appointments:', err);
}
 }

  return (
    <View style={{padding:20}}>
      <PageHeader title={appointmentList.title}/> 
      {
        appointmentList.length == 0 ?(<View style={{display:'flex' , justifyContent:'center' , alignItems:'center' , width:"100%" , height:"100%"}}><Ionicons name="cloud-done" size={54} color={Color.PRIMARY} /><Text style={{textAlign:"center" , fontFamily:'appfont-semi' ,color:Color.PRIMARY}}>No New Requests</Text></View>) :(<FlatList data={appointmentList.data}
          showsVerticalScrollIndicator={false}
           contentContainerStyle={{paddingBottom:30}} renderItem={({item})=>(
            <AppoinmentCardItem appoinment={item} />
      )}/>)
      }
    </View>
  )
}

export default Appointment