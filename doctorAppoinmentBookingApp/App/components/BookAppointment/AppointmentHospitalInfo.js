import { View, Text ,Image} from 'react-native'
import React from 'react'
import PageHeader from '../Shared/PageHeader'
import { Ionicons } from '@expo/vector-icons';
import Color from '../../../assets/Shared/Color';
import HorizontalLine from '../Shared/HorizontalLine';

export default function AppointmentHospitalInfo({hospital}) {
    
  return (
    <View>
     <PageHeader title={"Book Appointment"}/>
<View style={{marginTop:10 , display:'flex', flexDirection:'row' , gap:15 , alignItems:'center'}}>
    <Image source={hospital?.url} style={{width:80 , height:80 , borderRadius:99}}/>

<View>
    <Text
    style={{fontSize:18 , fontFamily:'appfont-semi' , marginBottom:8}}
    >{hospital?.name}</Text>
    
    <View style={{display:'flex' , flexDirection:'row' , gap:5 , alignItems:'center'}}>
        <Ionicons name='location' size={20} color={Color.PRIMARY}/>
        <Text style={{fontSize:14 , fontFamily:'appfont' , color:Color.GRAY , width:'70%'}}>{hospital?.address}</Text>
    </View>
</View>
</View>
<HorizontalLine/>
    </View>
  )
}