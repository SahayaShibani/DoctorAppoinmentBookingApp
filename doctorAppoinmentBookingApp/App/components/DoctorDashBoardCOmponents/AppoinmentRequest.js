import { View, Text ,Image, Alert} from 'react-native'
import React from 'react';
import myImage from '../../../assets/images/myImage.jpeg';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import Color from '../../../assets/Shared/Color';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HorizontalLine from '../Shared/HorizontalLine';
import url from '../../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppoinmentRequest({data ,fetchRecentAppoinments}) {

  // const { data } = route.params;
  
  const handleStatusChange=async(status)=>{
    try{
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(`${url}/appoinment/changeStatus` , {
        method:"post",
        headers:{
          'authorization' : `Bearer ${token}`,
          'content-type':"application/json"
        },
        body:JSON.stringify({id:data._id , status})
      }).then(async(res)=>await res.json())

      fetchRecentAppoinments();
      Alert.alert(response.message);
      
    }
    catch(err){
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
    }
    

  return (
    <View style={{ elevation:3 , borderRadius:10 , backgroundColor:"white" ,marginBottom:10  ,padding:10 , gap:10}}>
      <View style={{  display:"flex" , flexDirection:"row" , gap:10 , alignItems:"center"}}>
      <View style={{ borderRadius:50 ,overflow:'hidden',width: 80, height:80}}>
        <Image source={myImage} style={{width:'100%' , height:"100%" , resizeMode:"cover"}}/>
        </View>
        <View style={{display:"flex" , gap:10}}>
          <Text style={{fontFamily:"appfont-semi" , fontSize:20 , color:Color.PRIMARY}}>{data.patientId.userName}</Text>
          <HorizontalLine/>
          <View style={{display:"flex" , flexDirection:"row" , gap:10}}>
         <FontAwesome name="stethoscope" size={15} color={Color.PRIMARY} />
         <Text style={{color:Color.PRIMARY ,fontFamily:'appfont'}}>Consultation</Text>
          </View>

          <View style={{display:"flex" , flexDirection:"row" , gap:10}}>
         <FontAwesome name="clock-o" size={15} color={Color.PRIMARY} />
         <Text style={{color:Color.PRIMARY,fontFamily:'appfont'}}>{moment(data.appointmentDate).format("DD MMM")} | {data.appointmentTime}</Text>
          </View>
          {
            data?.notes&&<View style={{display:"flex" , flexDirection:"row" , gap:10}}>
            <Ionicons name="document" size={15} color={Color.PRIMARY} />
            <Text style={{color:Color.PRIMARY ,fontFamily:'appfont'}}>{data.notes}</Text>
            </View>
          }
          
        </View>
    </View>
    
    <HorizontalLine/>
    <View style={{display:"flex" , flexDirection:"row" ,justifyContent:"space-around"}}>

      <TouchableOpacity style={{ display:"flex" , flexDirection:"row" , gap:10 , alignItems:"center" , backgroundColor:"orange" , padding:10 , borderRadius:10}} onPress={()=>handleStatusChange("approved")}>
      <FontAwesome name="clock-o" size={15} color={Color.white} />
      <Text style={{color:Color.white , fontFamily:'appfont-semi'}}>Confirm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ display:"flex" , flexDirection:"row" , gap:10 , alignItems:"center" , padding:10 , borderRadius:10 , borderWidth:1 , borderColor:"red"}} onPress={()=>handleStatusChange("cancelled")}>
      <MaterialIcons name="cancel" size={15} color="red" />
      <Text style={{color:"red", fontFamily:'appfont-semi'}}>Cancel</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}
