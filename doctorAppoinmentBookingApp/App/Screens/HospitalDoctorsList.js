import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import PageHeader from '../components/Shared/PageHeader';
import HospitalDoctorTaB from '../components/HospitalDoctorsScreen/HospitalDoctorTab';
import HospitalList from '../components/HospitalDoctorsScreen/HospitalList';
import { ActivityIndicator } from 'react-native-paper';
import Color from '../../assets/Shared/Color';
import hospital1 from '../../assets/images/hospital1.jpeg'
import hospital2 from '../../assets/images/hospital2.jpeg'
import DoctorsList from '../components/HospitalDoctorsScreen/DoctorsList';
import { users } from '../../assets/Shared/dashboardDatas';
import doctor1 from '../../assets/images/d1.png';
import doctor2 from '../../assets/images/d2.png'
import doctor3 from '../../assets/images/d3.png'
import url from '../../assets/root';

export default function HospitalDoctorsList() {
  
  const params = useRoute().params;

  const [hospitalList, setHospitalList] = useState([
    { id: 1, name: "One Drive Hospital", url: hospital1, data: ["cardiologist", "dentist"], address: "2804 ,Carrington Trace Drive  , Cornellius - 629702", description: "Some random text goes here..." },
    { id: 2, name: "ABC star Hospital", url: hospital2, data: ["cardiologist", "dentist"], address: "634 N ,Carrington Drive  , Cornellius - 629702", description: "Some random text goes here..." }
  ])

  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const response = await users("doctor",params?.categoryName);
    console.log('====================================');
    console.log("Doctors", response.data);
    console.log('====================================');
    setDoctors(response.data)
  }

  useEffect(() => {
    fetchDoctors();
  }, [])

  const [activeTab, setActiveTab] = useState('Doctor')



  return (
    <View>
      {/* <Text>{params?.categoryName}</Text> */}
      <PageHeader title={params?.categoryName} />
      <HospitalDoctorTaB activeTab={(value) => setActiveTab(value)
      } />
      {
        !hospitalList?.length ? <ActivityIndicator size={'small'} color={Color.PRIMARY} /> :
          activeTab === "Hospital" ? <HospitalList hospitalList={hospitalList} /> : <DoctorsList doctorList={doctors} />
      }


    </View>
  )
}