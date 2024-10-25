import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Color from '../../../assets/Shared/Color'
import moment from 'moment';
import { AuthContext } from '../../../components/authContext';
import url from '../../../assets/root'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import Modal from '../Modal'

export default function BookAppointment({hospital , doctor }) {
  const navigation = useNavigation();
    const [next7Days , setNext7Days] = useState([]);
    const [selectedDate , setSelecteddate] = useState();
    const [timeList , setTimeList] = useState([]);
    const [selectedTime , setSelectedTime] = useState();
    const[notes , setNotes]=useState();

    const [isVisible , setIsVisible] = useState(false)

    const {userId} = useContext(AuthContext);

    console.log('====================================');
    console.log(doctor);
    console.log('====================================');

  

    useEffect(()=>{
        getDays();
        getTime();
    },[])

    const getDays = ()=>{
        const today=moment(); 
        const nextSevenDay=[];
        for(let i=1;i<8;i++){
     const date= moment().add(i , 'days');
     nextSevenDay.push({
        date,
        day:date.format('ddd'),
        formmattedDate:date.format('DD MMM') 
})
        }
       setNext7Days(nextSevenDay)
    }

    const getTime=()=>{
        const timeList = [];
        
        for(let i=8;i<=12;i++){
           timeList.push({time : i+ " : 00 AM"})
           timeList.push({time : i+ " : 30 AM"})
        }
        for(let i=1;i<=6;i++){
            timeList.push({time : i+ " : 00 PM"})
            timeList.push({time : i+ " : 30 PM"})
         }
         setTimeList(timeList)
    }

    const bookAppointment=async()=>{
      try{
        const token = await AsyncStorage.getItem("token");

        const data={
          doctorId:doctor?._id,
          appointmentDate:selectedDate,
          appointmentTime:selectedTime,
          email:doctor.email,
          doctor:doctor.id,
          notes
      }

    const response = await fetch(`${url}/appoinment/bookAppoinment`,{
     method:"post",
     headers:{
      "authorization":`Bearer ${token}`,
      "Content-type":'application/json'
     },
     body:JSON.stringify(data)
    })

    const newData = await response.json();
console.log('====================================');
console.log("New Data ",newData);
console.log('====================================');
    if(newData.success){      
     navigation.navigate("appoinmentsRequests")
     Alert.alert("Appoinment request send successsfully");
     
    }

    console.log("fetch end");
      }
        catch(err){
          console.log(err);
        }
        }

  return (
    
    <View>
      <Text style={{fontSize:16, color:Color.GRAY}}>Book Appointment</Text>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        marginTop:0
    }}>
        <Text style={{
        fontSize:20,
        fontFamily:'appfont-semi', 
    }}>Day</Text>
      </View>
      <FlatList 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={next7Days}
      renderItem={({item})=>(
        <TouchableOpacity style={[styles.dayButton ,
            selectedDate == item.formmattedDate ? {backgroundColor:Color.PRIMARY} : null,
        ]} onPress={()=>{setSelecteddate(item.formmattedDate)
          
        }}>
            <Text style={[{fontFamily:'appfont'} , selectedDate == item.formmattedDate ? {color:Color.white} : null,]}>{item.day}</Text>
            <Text style={[{fontFamily:'appfont-semi' , fontSize:14} , selectedDate == item.formmattedDate ? {color:Color.white} : null]}> 
                {item.formmattedDate}
            </Text>
        </TouchableOpacity>
      )}
      />

<View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        marginTop:15
    }}>
        <Text style={{
        fontSize:20,
        fontFamily:'appfont-semi', 
    }}>Time</Text>

      </View>

<FlatList 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={timeList}
      renderItem={({item})=>(
        <TouchableOpacity style={[styles.dayButton ,{paddingVertical:12},
            selectedTime == item.time ? {backgroundColor:Color.PRIMARY} : null,
        ]} onPress={()=>setSelectedTime(item.time)}>
            
            <Text style={[{fontFamily:'appfont-semi' , fontSize:14} , selectedTime == item.time ? {color:Color.white} : null]}> 
                {item.time}
            </Text>
        </TouchableOpacity>
      )}
      />

<View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        marginTop:15
    }}>
        <Text style={{
        fontSize:20,
        fontFamily:'appfont-semi', 
    }}>Note</Text>
      </View>

      <TextInput numberOfLines={3}
      onChangeText={(value)=>setNotes(value)}
      style={{
        textAlignVertical:'top',
        backgroundColor:Color.LIGHT_GRAY,
        padding:10,
        borderRadius:10,
        borderColor:Color.SECONDARY,
        borderWidth:1
      }}
      placeholder='Write note here...'
      />
<TouchableOpacity style={{
      padding:13 ,
      backgroundColor:Color.PRIMARY,
      margin:10 ,
      borderRadius:99,
      left:0,
      right:0,
      marginBottom:10,
      zIndex:20
    }} onPress={()=>bookAppointment()
    }>
      <Text style={{color:Color.white , textAlign:'center' , fontFamily:'appfont-semi' , fontSize:14}}>Make Appointment</Text>
    </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
    dayButton:{
        borderWidth:1,
        borderRadius:99,
        padding:5,
        paddingHorizontal:20,
        alignItems:'center',
        marginRight:10,
        borderColor:Color.GRAY
    }
})