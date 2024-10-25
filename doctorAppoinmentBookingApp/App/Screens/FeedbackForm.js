import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../assets/root'; // Adjust your URL accordingly
import PageHeader from '../components/Shared/PageHeader';

const FeedbackForm = ({ doctorId }) => {
  const [feedback, setFeedback] = useState('');

  const submitFeedback = async () => {
    const patientId = await AsyncStorage.getItem('patientId'); // Get patient ID from storage
    const token = await AsyncStorage.getItem('token'); // Get token for authentication

    if (!feedback) {
      Alert.alert('Please enter feedback');
      return;
    }

    try {
      const response = await fetch(`${url}/feedback/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId, patientId, feedback }),
      });

      if (response.ok) {
        Alert.alert('Feedback submitted successfully');
        setFeedback('');
      } else {
        Alert.alert('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error submitting feedback');
    }
  };

  return (
    <>
    <PageHeader title={"Feedback"}/>
    <View>
      <TextInput
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={setFeedback}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Submit Feedback" onPress={submitFeedback} />
    </View></>
  );
};

export default FeedbackForm;
