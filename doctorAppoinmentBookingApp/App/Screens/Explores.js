import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import HospitalDoctorTaB from '../components/HospitalDoctorsScreen/HospitalDoctorTab'
import hospital1 from '../../assets/images/hospital1.jpeg'
import hospital2 from '../../assets/images/hospital2.jpeg'
import doctor2 from '../../assets/images/d2.png'
import doctor3 from '../../assets/images/d3.png'
import HospitalList from '../components/HospitalDoctorsScreen/HospitalList'
import DoctorsList from '../components/HospitalDoctorsScreen/DoctorsList';
import { users } from '../../assets/Shared/dashboardDatas';

export default function Explores() {
    const [hospitalList, setHospitalList] = useState([
        {id:1,name:"One Drive Hospital" , url:hospital1 , data:["cardiologist","dentist"] , address:"2804 ,Carrington Trace Drive  , Cornellius-629702" , description:"Some random text goes here..."},
        {id:2,name:"ABC star Hospital" , url:hospital2 , data:["cardiologist","dentist"] , address:"634 N ,Carrington Drive  , Cornellius-629702" , description:"Some random text goes here..."}
      ])
    
    const [doctors , setDoctors]=useState([]);

    const fetchDoctors = async () => {
      const response = await users("doctor");
      console.log('====================================');
      console.log("Doctors", response.data);
      console.log('====================================');
      setDoctors(response.data)
    }
  
    useEffect(() => {
      fetchDoctors();
    }, [])

    const[activeTab , setActiveTab]=useState('Doctor')
  return (
    <View style={{padding:20}}>
      <Text style={{fontSize:22 , fontFamily:'appfont-semi'}}>Explore</Text>
      <HospitalDoctorTaB activeTab={(value)=>setActiveTab(value)
      }/>
      {
        !hospitalList?.length ? <ActivityIndicator size={'small'} color={Color.PRIMARY} /> : 
          activeTab === "Hospital" ? <HospitalList hospitalList={hospitalList} /> : <DoctorsList doctorList = {doctors}/>
      }
    </View>
  )
}