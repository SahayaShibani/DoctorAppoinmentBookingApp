import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import Color from '../../../assets/Shared/Color'

export default function HospitalDoctorTaB({activeTab}) {
    const [activeIndex, setActiveIndex] = useState(1);

    return ( 
        <View style={styles.container}>
            <View style={styles.headContainer}>
                {/* <TouchableOpacity onPress={()=>{setActiveIndex(0);activeTab('Hospital')}} style={!activeIndex ? styles.activeTab :styles.inActiveTab }>
                    <Text style={!activeIndex ? styles.activeText :styles.inActiveText }>Hospital</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>{setActiveIndex(1);activeTab('Doctor')}} style={activeIndex ? styles.activeTab :styles.inActiveTab }>
                    <Text style={activeIndex ? styles.activeText :styles.inActiveText }>Doctors</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    headContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    activeText: {
        textAlign: 'center',
        fontFamily: 'appfont-semi',
        fontSize: 18,
        color: Color.PRIMARY
    },
    inActiveText: {
        textAlign: 'center',
        fontFamily: 'appfont',
        fontSize: 18,
        color: Color.GRAY
    },
    activeTab:{
        borderBottomWidth:2,
        borderBottomColor:Color.PRIMARY,
        padding:3,
       
    },
    inActiveTab:{
        borderBottomWidth:1,
        borderBottomColor:Color.GRAY,
        padding:3,
       
    }
})