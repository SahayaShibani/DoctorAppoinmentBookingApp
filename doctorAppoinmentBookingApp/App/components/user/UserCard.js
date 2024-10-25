import { View, Text, Image } from 'react-native'
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Color from '../../../assets/Shared/Color';
import HorizontalLine from '../Shared/HorizontalLine';


export default function userCard({data}) {
  return (
    <View style={{ display:"flex" , flexDirection:"row" , gap:10 , alignItems:"center"}}>
        <View style={{ borderWidth:1 , borderRadius:50   , width:80 , height:80 , display:"flex" , alignItems:"center" , justifyContent:"center" , borderColor:Color.GRAY}}>
        {
            data?.image ? <Image 
            source={{ uri: data?.image }} 
            style={{ width: "100%", height: 80 , borderRadius:50 }} // Adjust height as needed
            resizeMode="cover" 
          /> : <FontAwesome name="user" size={50} color={Color.GRAY} style={{borderRadius:50}}/>
        }
        </View>
        <View>
        <View >
          <Text style={{fontFamily:"appfont-semi" , fontSize:20 }}>{data.userName}</Text>
          <Text style={{fontFamily:"appfont-semi" , fontSize:13 , color:Color.GRAY}}>{data.role}</Text>
          <HorizontalLine/> 
        </View>
        <View style={{display:"flex" , gap:10}}>
            <View style={{display:"flex" , flexDirection:"row" , gap:19}}>
            <FontAwesome name="phone" size={24} color="black" />
            <View style={{borderWidth:1 , borderColor:Color.LIGHT_GRAY}}></View>
                <Text style={{fontFamily:"appfont-semi"}}>{data.phoneNumber}</Text>
            </View>
            <View style={{display:"flex" , flexDirection:"row" , gap:14}}>
            <FontAwesome name="envelope-o" size={24} color="black" />
            <View style={{borderWidth:1 , borderColor:Color.LIGHT_GRAY}}></View>
                <Text style={{fontFamily:"appfont-semi"}}>{data.email}</Text>
            </View>
        </View>
        </View>
        
        
      
    </View>
  )
}