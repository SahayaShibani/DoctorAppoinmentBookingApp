import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../../../assets/Shared/Color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import ActionButton from './ActionButton';
import HorizontalLine from '../Shared/HorizontalLine';

export default function HospitalInfo({hospital}) {
  
  return hospital&&(
    <View>
      <Text style={{fontSize:20 , fontFamily:'appfont-semi' }}>{hospital?.name}</Text>
      <FlatList

                    data={hospital.data}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Text style={styles.categoryText}>{item}</Text>
                    )}
                />
                <HorizontalLine/>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                            <Ionicons name="location" size={22} color={Color.PRIMARY} />
                            <Text style={{fontSize:14,fontFamily:'appfont' , color:Color.GRAY}}>
                                {hospital.address}
                            </Text>
                        </View>  

                        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' , marginTop:6}}>
                            <Ionicons name="time" size={22} color={Color.PRIMARY} />
                            <Text style={{fontSize:14,fontFamily:'appfont' , color:Color.GRAY}}>
                                Mon Sun | 11 AM - 8 PM
                            </Text>
                        </View> 
                        {/* <View style={{...styles.addressContainer , marginBottom:15 , marginTop:10}}>
                    
                    </View> */}
                    <ActionButton/>

                    <View style={{...styles.addressContainer , marginTop:15}}>
                    
                    </View>

                    <View style={styles.subContainer}>
        <Text style={styles.categoryHeading}>About</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <Text>{hospital.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    categoryText: {
        marginRight: 7,
        color: Color.GRAY
    },
    addressContainer: {
        borderBottomWidth: 1,
        borderColor: Color.LIGHT_GRAY,
        margin: 5,
        marginBottom: 10
    },
    subContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
    },
    categoryHeading:{
        fontSize:18,
        fontFamily:'appfont-semi', 
    }
})