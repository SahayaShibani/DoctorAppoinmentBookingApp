import { View, Text ,StyleSheet , Image} from 'react-native'
import React from 'react'
import Color from '../../../assets/Shared/Color';

export default function HospitalItem({hospital}) {
 
  console.log(hospital);
  
  return (
    <View style={styles.container}>
      <Image source = {hospital.url} style={styles.image}/>
      <View style={{padding:7}}>
        <Text style={{fontFamily:'appfont-semi' , fontSize:16}}>{hospital.name}</Text>
        <Text style={{color:Color.GRAY}}>{hospital.address}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
     width:200,
     borderRadius:10,
     borderWidth:1,
     borderColor:Color.LIGHT_GRAY,
     marginRight:10
  },
    image:{
        width:'100%',
        height:110,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    }
})