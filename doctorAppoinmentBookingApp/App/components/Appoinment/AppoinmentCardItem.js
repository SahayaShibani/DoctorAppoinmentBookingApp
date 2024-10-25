import { View, Text, Image, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import Color from '../../../assets/Shared/Color';
import doctor from '../../../assets/images/d2.png'
import HorizontalLine from '../Shared/HorizontalLine';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import url from '../../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function AppoinmentCardItem({ appoinment }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [isComplete , setIsComplete] = useState(false)

  const handleComplete = async() => {
    Alert.alert(
      "Complete Appointment",
      "Are you sure you want to complete this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => console.log("Appointment Completed!") } 
      ]
      
    );
    setIsComplete(true)
    try{
      const token = await AsyncStorage.getItem('token')
      const response = await fetch(`${url}/appoinment/changeStatus`,{
        method:'post',
        headers:{
          'authorization':`Bearer ${token}`,
          'content-type':'application/json'
        },
        body:JSON.stringify({id:appoinment._id ,status:"completed"})
      }).then(res=>res.json())
      
    if(response.success){
      
      console.log('Appointment completed successfully');
       
      } else {
        console.error('Failed to update appointment status:', data.message);
      }
    }
    catch(err){
      console.error(err);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity style={{
      padding: 10,
      borderWidth: 1,
      borderColor: Color.LIGHT_GRAY,
      borderRadius: 10,
      backgroundColor:Color.white,
      marginTop:15,
    }}
    onPress={openModal}
    >
      <Text style={{ fontSize: 14, fontFamily: 'appfont-semi', marginTop: 10 }}
      >{moment(appoinment.appointmentDate).format("MMM Do YYYY")} - {appoinment.appointmentTime}</Text>
      <HorizontalLine />
      <View style={{display:'flex' , flexDirection:'row' , gap:10 , alignItems:"center"}}>
        <Image source={doctor}
          style={{
            height: 95,
            width: 85,
            borderRadius: 10
          }}
        />
      <View>
        <Text style={{
          fontSize: 16,
          fontFamily: 'appfont-semi'
        }}
        >{appoinment?.patientId?.userName}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' ,  marginTop:5}}>
          <Ionicons name="location" size={22} color={Color.PRIMARY} />
          <Text style={{ fontSize: 14, fontFamily: 'appfont', color: Color.GRAY }}>
          2804 ,Carrington Trace Drive  , Cornellius - 629702
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Ionicons name="document-text" size={22} color={Color.PRIMARY} />
          <Text style={{ fontSize: 14, fontFamily: 'appfont', color: Color.GRAY }}>
          Booking Id - {appoinment._id.substring(0, 8)}....
          </Text>
        </View>{
          appoinment.status == 'approved'&&<TouchableOpacity style={{ padding:10 , marginTop:10 ,marginRight:100,borderRadius:10,borderWidth:2 , borderColor:"green"}} onPress={handleComplete}>
            {
             isComplete ? <View style={{paddingLeft:70}}><AntDesign name="checkcircle" size={24} color={Color.PRIMARY} /></View> :  <Text style={{color:'green' , textAlign:'center' , fontFamily:'appfont-semi'}}>Completed</Text>
            }
         
        </TouchableOpacity>
        }
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Appointment Details</Text>
            <Text style={styles.modalDetail}>
              Appointment Date: {moment(appoinment.appointmentDate).format("MMM Do YYYY")}
            </Text>
            <Text style={styles.modalDetail}>
              Appointment Time: {appoinment.appointmentTime}
            </Text>
            <Text style={styles.modalDetail}>
              Patient Name: {appoinment?.patientId?.userName}
            </Text>
            <Text style={styles.modalDetail}>
              Location: 2804, Carrington Trace Drive, Cornellius - 629702
            </Text>
            <Text style={styles.modalDetail}>
              Booking ID: {appoinment._id}
            </Text>

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  appointmentCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.LIGHT_GRAY,
    borderRadius: 10,
    backgroundColor: Color.white,
    marginTop: 15,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'appfont-semi',
    marginTop: 10,
  },
  appointmentDetails: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: "center",
  },
  doctorImage: {
    height: 95,
    width: 85,
    borderRadius: 10,
  },
  patientName: {
    fontSize: 16,
    fontFamily: 'appfont-semi',
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'appfont',
    color: Color.GRAY,
  },
  completeButton: {
    padding: 10,
    marginTop: 10,
    marginRight: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
  },
  completeButtonText: {
    color: 'green',
    textAlign: 'center',
    fontFamily: 'appfont-semi',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: Color.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'appfont-semi',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 14,
    fontFamily: 'appfont',
    color: Color.GRAY,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Color.PRIMARY,
    borderRadius: 5,
  },
  closeButtonText: {
    color: Color.white,
    textAlign: 'center',
    fontFamily: 'appfont-semi',
  },
});