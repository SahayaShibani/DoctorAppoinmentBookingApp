import { View, Text ,StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Color from '../../../assets/Shared/Color'
import HospitalItem from './HospitalItem';
import hospital1 from '../../../assets/images/hospital1.jpeg'
import hospital2 from '../../../assets/images/hospital2.jpeg'
import { useNavigation } from '@react-navigation/native';

export default function PremiumHospital() {

  const navigation = useNavigation();

  const [hospitalList, setHospitalList] = useState([
    {id:1,name:"One Drive Hospital" , url:hospital1 , data:["cardiologist","dentist"] , address:"2804 ,Carrington Trace Drive  , Cornellius - 629702" , description:"Some random text goes here..."},
    {id:2,name:"ABC star Hospital" , url:hospital2 , data:["cardiologist","dentist"] , address:"634 N ,Carrington Drive  , Cornellius - 629702" , description:"Some random text goes here..."}
  ])

  return hospitalList&& (
    <View style={styles.container}>
     <View style={styles.subContainer}>
        <Text style={styles.categoryHeading}>Our Premium Hospital</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <FlatList data={hospitalList}  renderItem={({item , index})=>(
        <TouchableOpacity onPress={()=> navigation.navigate('hospital-details' , {hospital:item})}>
<HospitalItem hospital = {item} keyExtractor={(item) => item.id}/>
        </TouchableOpacity>
         
      )}horizontal={true} showsHorizontalScrollIndicator={false}/> 
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
    }
    ,
    subContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
    },
    categoryHeading:{
        fontSize:20,
        fontFamily:'appfont-semi', 
    },
    seeAll:{
        fontFamily:'appfont',
        color:Color.PRIMARY
    },
})