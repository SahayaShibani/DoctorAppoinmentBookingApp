import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Color from '../../../assets/Shared/Color'

export default function ActionButton() {

    const actionButtonList = [
        {
            id:1 , 
            name: "Website",
            icon:'earth'
        },
        {
            id:2 , 
            name: "Email",
            icon:'chatbubble-ellipses'
        },
        {
            id:3, 
            name: "Phone",
            icon:'call'
        },
        {
            id:4 , 
            name: "Direction",
            icon:'map'
        },
        {
            id:5 , 
            name: "Share",
            icon:'share'
        },
    ]

  return (
    <View style={{marginTop:15}}>
      <FlatList data={actionButtonList}
      columnWrapperStyle={{
        flex:1,
        justifyContent:'space-between'
      }}
    //   horizontal={true}
      numColumns={5}
      renderItem={({item})=>(
        
        <TouchableOpacity style={{alignItems:'center'}}>
            <View style={{backgroundColor:Color.SECONDARY , padding:13 , borderRadius:100 , alignItems:'center' , width:55}}>
                <Ionicons name={item.icon} size={23} color={Color.PRIMARY}/>
            </View>
            <Text style={{
                fontFamily:'appfont-semi',
                marginTop:5 
            }}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}