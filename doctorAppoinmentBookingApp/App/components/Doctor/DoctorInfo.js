import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ActionButton from '../hospitalDetails/ActionButton'
import { Ionicons } from '@expo/vector-icons'
import HorizontalLine from '../Shared/HorizontalLine'
import Color from '../../../assets/Shared/Color'

export default function DoctorInfo({doctor}){
console.log('====================================');
console.log("Doctor info" , doctor);
console.log('====================================');
  return doctor &&(
    <View>
      <Text style={{fontSize:20 , fontFamily:'appfont-semi' ,textAlign:'center'}}>{doctor?.userName}</Text>
     
                        <View style={{display:'flex',flexDirection:'row' , gap:5,justifyContent:'center' , flexWrap:"wrap"}}>{doctor.specialties.map((item,index)=>(<View key={index} style={{display:'flex',flexDirection:'row'}}><Text style={{color:Color.GRAY}}>{item}</Text>{index+1 != doctor.specialties.length&&(<View style={{borderWidth:1 , borderColor:Color.LIGHT_GRAY}}></View>)}</View>))}</View>
                    
                <HorizontalLine/>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                            <Ionicons name="location" size={22} color={Color.PRIMARY} />
                            <Text style={{fontSize:14,fontFamily:'appfont' , color:Color.GRAY}}>
                                {doctor?.address}
                            </Text>
                        </View>  

                        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' , marginTop:10}}>
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
      <Text>{doctor?.description}</Text>
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
    },
    seeAll:{
        color:Color.PRIMARY
    }
})