import { View, Text ,FlatList} from 'react-native'

import React from 'react'
import DoctorCardItem from '../Shared/DoctorCardItem'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DoctorsList({doctorList}) {


const navigation = useNavigation();

  return (
    <View>
      <FlatList
      
      data={doctorList} 
      showsVerticalScrollIndicator={false}
      renderItem={({item , index})=>(
        <TouchableOpacity style={{padding:10}} z
        onPress={()=>navigation.navigate("doctor-details" , {doctor:item})}
        >
          <DoctorCardItem key={index}  doctor={item}/>
        </TouchableOpacity>
        
      )}
      contentContainerStyle={{ paddingBottom: 160 }}
      keyExtractor={(item, index) => item._id?.toString() || index.toString()}
      />
    </View>
  )

}