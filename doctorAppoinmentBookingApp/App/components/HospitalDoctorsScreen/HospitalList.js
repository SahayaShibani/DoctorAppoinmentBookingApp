import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import HospitalCardItem from '../Shared/HospitalCardItem'
import { useNavigation } from '@react-navigation/native'

export default function HospitalList({hospitalList}) {
  
  const navigation = useNavigation();
  return (
    <View style={{marginTop:15  }}>
      <FlatList
      data={hospitalList} 
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>(
        <TouchableOpacity style={{padding:10}} onPress={()=>navigation.navigate("hospital-details" , {
          hospital:item
        }) }>
            <HospitalCardItem hospital={item}/>
        </TouchableOpacity>
        
      )}
      contentContainerStyle={{ paddingBottom: 160 }}
      />
    </View>
  )
}