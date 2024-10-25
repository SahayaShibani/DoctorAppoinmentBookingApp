import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import PageHeader from '../components/Shared/PageHeader';
import HospitalInfo from '../components/hospitalDetails/HospitalInfo';
import Color from '../../assets/Shared/Color';

export default function HospitalDetails() {
  const params = useRoute().params;
  const navigation = useNavigation();
  const [hospital, setHospital] = useState();

  useEffect(() => {
    setHospital(params.hospital);
  }, [params]);

  // Content array for dynamic rendering
  const content = [
    { id: 'image', type: 'image', url: hospital?.url },
    { id: 'info', type: 'info', details: hospital },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'image':
        return (
          <Image source={item.url} style={{ width: '100%', height: 200 }} />
        );
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
            <HospitalInfo hospital={item.details} />
          </View>
        );
      default:
        return null;
    }
  };

  return hospital && (
    <View style={{ backgroundColor: Color.white, flex: 1 }}>
      {/* PageHeader for the back arrow and title */}
      <View style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
        <PageHeader title={'Hospital Details'} />
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
        onPress={() => navigation.navigate('book-appointment', { hospital })}
      >
        <Text style={{ color: Color.white, textAlign: 'center', fontFamily: 'appfont-semi', fontSize: 14 }}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
}
