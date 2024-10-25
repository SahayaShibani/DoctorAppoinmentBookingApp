import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import Color from '../../../assets/Shared/Color'

export default function SubDashBoard({data , count}) {
    
  return (
    <TouchableOpacity style={{padding:20 , display:'flex' , justifyContent:'center' , alignItems:'center' , elevation:5 , backgroundColor:Color.white, margin:10}}>
      <Text style={{fontFamily:'appfont-semi'}}>Patients</Text>
      <Text style={{fontFamily:'appfont-semi'}}>{count}</Text>
    </TouchableOpacity>
  )
}