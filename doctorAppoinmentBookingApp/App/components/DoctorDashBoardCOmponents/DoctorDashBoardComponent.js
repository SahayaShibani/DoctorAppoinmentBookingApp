import { View, Text } from 'react-native'
import React from 'react'
import Color from '../../../assets/Shared/Color';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function DoctorDashBoardComponent({data}){
  

  return (
    
    <View style={{padding:20, elevation:10 , backgroundColor:Color.white , borderRadius:15 , flex:1 , margin:10  , width:140}}>
      <FontAwesome name={data.symbol} size={28} color={data.color} style={{textAlign:"center"}}/>
      <View>
        <Text style={{textAlign:"center" , fontFamily:'appfont-bold', color:data.color , fontSize:15}}>{data.title.split(" ")[0]}</Text>
        <Text style={{textAlign:"center" , fontFamily:'appfont-bold' , color:data.color,fontSize:15}}>{data.title.split(" ")[1]}</Text>
      </View>
      <View style={{display:"flex" , flexDirection:"row" , justifyContent:"center"}}>
      <View style={{ padding:8 , borderRadius:50 , backgroundColor:Color.LIGHT_GRAY}}>
        <Text style={{fontFamily:'appfont'  ,fontSize:15 , fontFamily:'appfont-bold' , color:Color.white , color:data.color}}>{data.Nos}</Text>
      </View>
      </View>
      
    </View>
  )
}