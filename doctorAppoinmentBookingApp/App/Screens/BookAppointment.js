import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import AppointmentHospitalInfo from '../components/BookAppointment/AppointmentHospitalInfo';
import ActionButton from '../components/hospitalDetails/ActionButton';
import HorizontalLine from '../components/Shared/HorizontalLine';
import BookingSection from '../components/BookAppointment/BookingSection';

export default function BookAppointment({navigation}) {
  const params = useRoute().params;
  console.log("params",params);
  
console.log("navigation",navigation);

  // Content to be displayed in the FlatList
  const content = [
    { id: 'info', component: <AppointmentHospitalInfo hospital={params.hospital} /> },
    { id: 'actionButton', component: <ActionButton /> },
    { id: 'line', component: <HorizontalLine /> },
    { id: 'bookingSection', component: <BookingSection hospital={params.hospital} navigation={navigation}/> },
  ];

  const renderItem = ({ item }) => (
    <View 
    // style={{ marginBottom: 20 }}
    >
      {item.component}
    </View>
  );

  return (
    <FlatList
      data={content}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    />
  );
}
