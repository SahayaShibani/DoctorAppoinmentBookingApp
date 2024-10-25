import { View, Text, FlatList ,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '../Shared/PageHeader'
import { useNavigation, useRoute } from '@react-navigation/native';
import Color from '../../../assets/Shared/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import image from '../../../assets/images/d2.png'
import DoctorInfo from './DoctorInfo';

export default function DoctorDetails() {

    const params = useRoute().params;
  const navigation = useNavigation();
  const [doctor, setDoctor] = useState();
  

  useEffect(() => {
    setDoctor(params.doctor);
  }, [params]);


  const content = [
    { id: 'image', type: 'image', url: doctor?.image },
    { id: 'info', type: 'info', details: doctor},
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      
      case 'info':
        return (
          <View 
            style={{
              marginTop: -20,
              backgroundColor: Color.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
            <DoctorInfo doctor={item.details} />
          </View>
        );
      default:
        return null;
    }
  };


  return doctor&&(
    <View style={{ backgroundColor: Color.white, flex: 1 }}>
      {/* PageHeader for the back arrow and title */}
      <View style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
        <PageHeader title={'Doctor Details'} />
        
      </View>
      <View style={{width:150 , overflow:'hidden' , height:150 , display:'flex' , borderRadius:100 , borderColor:Color.LIGHT_GRAY , borderWidth:1 , alignSelf:'center' , marginTop:40 }}>
      <Image source={image} style={{ 
      width: '100%', 
      height: '100%', 
      borderRadius: 100 
    }}  resizeMode='cover'/>
      </View>
     
      
      {/* FlatList to render the hospital content */}
      <FlatList
        data={content}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Book Appointment Button */}
      <TouchableOpacity 
        style={{
          padding: 13,
          backgroundColor: Color.PRIMARY,
          margin: 10,
          borderRadius: 99,
          position: 'absolute',
          bottom: 20,
          left: 10,
          right: 10,
          zIndex: 20,
        }} 
        onPress={() => {console.log('====================================');
        console.log("Book Appoinment");
        console.log('====================================');
          navigation.navigate('book-doctor-appointment', { doctor })}}
      >
        <Text style={{ color: Color.white, textAlign: 'center', fontFamily: 'appfont-semi', fontSize: 14 }}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </View>
  )
}