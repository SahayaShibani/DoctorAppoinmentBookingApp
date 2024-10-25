import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import AppoinmentDoctorInfo from '../components/BookAppointment/AppoinmentDoctorInfo';
import ActionButton from '../components/hospitalDetails/ActionButton';
import HorizontalLine from '../components/Shared/HorizontalLine';
import BookingSection from '../components/BookAppointment/BookingSection';


export default function BookDoctorAppoiment() {
    const params = useRoute().params;
    

  // Content to be displayed in the FlatList
  const content = [
    { id: 'info', component: <AppoinmentDoctorInfo doctor={params.doctor} /> },
    { id: 'actionButton', component: <ActionButton /> },
    { id: 'line', component: <HorizontalLine /> },
    { id: 'bookingSection', component: <BookingSection doctor={params.doctor} /> },
  ];

  const renderItem = ({ item }) => (
    <View>
      {item.component}
    </View>
  );

  return (
    <View>
 <FlatList
      data={content}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    />
    
    </View>
   
  );
}