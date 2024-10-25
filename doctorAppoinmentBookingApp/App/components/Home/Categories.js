import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Color from '../../../assets/Shared/Color'
import { FlatList } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import url from '../../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Categories() {

  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = useState(false);

  const [categoryList, setCategoryList] = useState([
    { name: 'heartbeat', title: "Cardiologist" },
    { name: 'tooth', title: "Dentist" },
    { name: 'brain', title: "Neurologist" },
    { name: 'baby', title: 'Pediatrician' },
    { name: 'user-md', title: 'Urologist' },
    { name: 'hand-holding-heart', title: 'Oncologist' },
    { name: 'eye', title: "Ophthalmologist" },
    { name: 'bone', title: "Orthologist" },
    { name: 'lungs', title: 'Pulmonologist' },
    { name: 'female', title: 'Gynecologist' },
    { name: 'bone', title: 'Rheumatologist' },
    { name: 'user-md', title: "Dermatologist" },
  ])

  const handleSeeAll = () => {
    setModalVisible(true);
  };

  const handleCategoryPress = async (categoryName) => {
    console.log('Selected category:', categoryName);

      navigation.navigate('hospital-doctor-list-screen', {
        categoryName,
      })
      // Optional: Handle the selection of a category, if needed
      setModalVisible(false); // Close the modal after selecting a category

  };


  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.categoryHeading}>Doctor Speciality</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>

      </View>
      <FlatList numColumns={4} style={styles.flatList}
        columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
        data={categoryList}
        renderItem={({ item, index }) => index < 4 && (
          <TouchableOpacity
            onPress={() => handleCategoryPress(item.title)} style={styles.categoryContainer}>
            <View style={styles.category}>
              <FontAwesome5 name={item.name} size={24} color={Color.PRIMARY} />
            </View>
            <Text style={{ fontSize: 10, fontFamily: 'appfont-semi' }}>{item.title}</Text>
          </TouchableOpacity>
        )} />

      {/* modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>All Specialities</Text>
            <FlatList
              numColumns={3}
              columnWrapperStyle={{ flex: 1, justifyContent: 'space-around',gap:10}}
              data={categoryList}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCategoryPress(item.title)} style={{ alignItems: 'center' }}>
                  <View style={styles.category}>
                    <FontAwesome5 name={item.name} size={24} color={Color.PRIMARY} />
                  </View>
                  <Text style={{ fontFamily: 'appfont-semi',fontSize:10 }} >{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    marginTop: 10,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  categoryHeading: {
    fontSize: 20,
    fontFamily: 'appfont-semi',
  },
  seeAll: {
    fontFamily: 'appfont',
    color: Color.PRIMARY
  },
  category: {
    backgroundColor: Color.SECONDARY,
    padding: 15,
    borderRadius: 50,
  },
  flatList: {
    marginTop: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'appfont-semi',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Color.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'appfont',
  },
  categoryContainer: {
    alignItems: 'center',
    // width: '22%',
  },
})