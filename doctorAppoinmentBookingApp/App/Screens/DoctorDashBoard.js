import { View, Text ,StyleSheet , Modal, Pressable, FlatList, Alert} from 'react-native'
import React, { useState  , useContext, useEffect, useCallback} from 'react'
import Header from '../components/Home/Header'
import DoctorDashBoardComponent from '../components/DoctorDashBoardCOmponents/DoctorDashBoardComponent';
import AppoinmentRequest from '../components/DoctorDashBoardCOmponents/AppoinmentRequest';
import Color from '../../assets/Shared/Color';
import { AuthContext } from '../../components/authContext';
import url from '../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


export default function DoctorDashBoard({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const{userId}=useContext(AuthContext);

  const [componentsData, setComponentsData] = useState([
    { title: "Appointment Requests", Nos: 0, symbol: "clock-o", color: "#FF9800", route: "AppointmentRequests" ,data:[]},
    { title: "Total Appointments", Nos: 0, symbol: "calendar", color: "#2196F3", route: "TotalAppointments" ,data:[] ,status:"all"},
    { title: "Completed Appointments", Nos: 0, symbol: "check-square-o", color: "#4CAF50", route: "CompletedAppointments" ,data:[] , status:"completed"},
    { title: "Pending Appointments", Nos: 0, symbol:"exclamation-circle", color: "gold", route: "PendingAppointments" ,data:[] , status:'approved'},
    { title: "Cancelled Appointments", Nos: 0, symbol: "ban", color: "#F44336", route: "CancelledAppointments",data:[] ,status:"cancelled"},
    { title: "Patients' Feedback", Nos: 0, symbol: "star", color: "#9C27B0", route: "PatientFeedback" ,data:[]}
  ]);

  const fetchRecentAppoinments = async()=>{

    try{
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
    }

      const response = await fetch(`${url}/appoinment/recentAppoinmentRequest`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body:JSON.stringify({status:'pending'})
      })
      
      const data = await response?.json();
      if (!data?.success) {
        throw new Error(data.message || "Failed to fetch appointments");
    }    
    const appointmentRequests = data.appointments || [];

    setComponentsData(prevState => {
        return prevState.map(item => {
          if (item.route === "AppointmentRequests") {
            return { ...item, data: appointmentRequests, Nos: data.count }; 
          }
          return item;
        });
      });
    }
    catch(err){
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
  }

  const fetchAppoinments  = async(status) =>{
    try
    {
      const token = await AsyncStorage.getItem("token");
      const response =await fetch(`${url}/appoinment/`,{
        method:"post",
        headers:{
          'authorization' : `Bearer ${token}`,
          "content-type":"Application/json"
        },
        body:JSON.stringify({status})
      })
    
    const data = await response.json();
    console.log(status+" ",data);
    
    if (!data.success) {
        throw new Error(data.message || "Failed to fetch appointments");
    }

    const appointments = data.appointments || [];
    const appointmentCount = appointments.length;

    setComponentsData(prevState => {
        return prevState.map(item => {
            if (item.status && item.status === status) {
                return { ...item, data: appointments, Nos: data.count};
            }
            return item;
        });
    });
} catch (err) {
    console.log('Error fetching appointments:', err);
}
   }

   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        fetchRecentAppoinments()
        fetchAppoinments('pending', 0); 
        fetchAppoinments('approved', 1); 
        fetchAppoinments('completed', 2);
        fetchAppoinments('cancelled', 3);
        fetchAppoinments('all', 4);
      };
      fetchData();
    }, [])
);

//   useEffect(() => {
//     console.log('Updated componentsData:', componentsData);
//  }, [componentsData]);

  const handleNavigation = (item) => {
    navigation.navigate(item.route , {data:item});
  };

  return (
    <View style={styles.home}>
     <Header setModalVisible={setModalVisible}/>
     <View style={{marginTop:30}}>
     {
      <FlatList keyExtractor={(item, index) => index.toString()} 
      data={componentsData} renderItem={({item})=>(
      <TouchableOpacity onPress={()=>handleNavigation(item)}>
        <DoctorDashBoardComponent data={item}/></TouchableOpacity>)} 
        numColumns={2} contentContainerStyle={{}}/>
     }
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
    home:{
       padding:20,
       marginTop : 20,
    }
 })