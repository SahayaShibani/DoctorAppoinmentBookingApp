import { View, Text ,StyleSheet, FlatList} from 'react-native'
import React, { useEffect, useState , useCallback} from 'react'
import SubDashBoard from '../components/DashBoard/SubDashBoard';
import {users} from '../../assets/Shared/dashboardDatas';
import Header from '../components/Home/Header';
import { useFocusEffect } from '@react-navigation/native';
import DoctorDashBoardComponent from '../components/DoctorDashBoardCOmponents/DoctorDashBoardComponent';
import { TouchableOpacity } from 'react-native';
import url from '../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({navigation}) {

  const [componentsData, setComponentsData] = useState([
    { title: "Doctors", Nos: 0, symbol: "user-md", color: "green", route: "doctors" ,data:[] },
    { title: "Patients", Nos: 0, symbol: "user", color: "#2196F3", route: "patients" , data:[] },
    { title: "Total Appointments", Nos: 0, symbol: "calendar", color: "#9C27B0", route: "TotalAppointments",data:[]  },
    { title: "Completed Appointments", Nos: 0, symbol: "check-square-o", color: "#4CAF50", route: "CompletedAppointments",data:[]  },
    { title: "Pending Appointments", Nos: 0, symbol: "exclamation-circle", color: "gold", route: "PendingAppointments" ,data:[] },
    { title: "Cancelled Appointments", Nos: 0, symbol: "ban", color: "#F44336", route: "CancelledAppointments",data:[] },
  ]);

  async function fetchPatients(){
    
    const response = await users("patient");
    setComponentsData((prevData) =>
      prevData.map((component) =>
        component.title === "Patients" ? { ...component, Nos: response.data.length , data:response.data} : component
      )
    );
  }

  async function fetchDoctors(){
   
    const response = await users("doctor");
   
    setComponentsData((prevData) =>
      prevData.map((component) =>
        component.title === "Doctors" ? { ...component, Nos: response.data.length , data:response.data} : component
      )
    );
  }

  const fetchAppoinments = async(status , title) => {
    try{
      const token = await AsyncStorage.getItem("token");

      let fetchUrl = `${url}/appoinment/adminviewappoinments`;
      if (status && status !== 'all') {
        fetchUrl += `?status=${status}`;
      }
      const response = await fetch(fetchUrl ,{
        method:'get',
        headers:{
          "content-type":"application/json",
          "authorization":`Bearer ${token}`
        }
       }).then(res=>res.json())
       
       if (response.success) {
        // Update the respective component's data field based on the title (e.g., Total, Completed, Pending)
        setComponentsData((prevData) =>
          prevData.map((component) =>
            component.route === title
              ? { ...component, Nos: response?.data?.length, data: response?.data }  // Update count and data
              : component
          )
        );
      }
    }
    catch(err){
      console.log(err);
    }
         
  }

useEffect(()=>{
fetchPatients();
fetchDoctors();
fetchAppoinments("all" , "TotalAppointments");
fetchAppoinments("completed" , "CompletedAppointments")
fetchAppoinments("pending" , "PendingAppointments")
fetchAppoinments("cancelled" , "CancelledAppointments")
},[])

useFocusEffect(
  useCallback(() => {
    fetchPatients();
    fetchDoctors();
  }, [])
);

const handleNavigation = (item) => {
  navigation.navigate(item.route , {data:item});
};

  return (
    <View style={styles.home}>
      <Header/>
      <View style={{marginTop:30}}>
     {
      <FlatList keyExtractor={(item, index) => index.toString()} data={componentsData} renderItem={({item})=>(<TouchableOpacity onPress={()=>handleNavigation(item)}><DoctorDashBoardComponent data={item}/></TouchableOpacity>)} numColumns={2} contentContainerStyle={{}}/>
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