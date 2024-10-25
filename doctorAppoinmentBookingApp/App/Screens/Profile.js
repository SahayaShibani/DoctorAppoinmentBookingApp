import { View, Text, Modal, TouchableOpacity, TextInput, Button, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import url from '../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageHeader from '../components/Shared/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Color from '../../assets/Shared/Color';
import HorizontalLine from '../components/Shared/HorizontalLine';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [formData, setFormData] = useState({}); // Form data state
  const [imageError, setImageError] = useState(false);

  const user = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${url}/user/`, {
        method: 'get',
        headers: {
          'authorization': `Bearer ${token}`,
          'content-type': 'application/json'
        }
      }).then(res => res.json());
      setData(response.data[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    user();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

  }

  const saveProfile = async () => {

    let updatedData = {};

    // Loop through formData and compare with original data
    Object.keys(formData).forEach(key => {
      if (formData[key] !== data[key]) {
        updatedData[key] = formData[key]; // Add only changed fields to updatedData
      }
    });

    if (Object.keys(updatedData).length === 0) {
      console.log("No changes to save.");
      setModalVisible(false); // Close the modal if no changes
      return;
    }

    try {

      const token = await AsyncStorage.getItem("token");
      console.log("updated ", updatedData);

      const response = await fetch(`${url}/user/update/${data?._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });

      const result = await response.json();
      setData(result.data)
      if (response.ok) {
        console.log("Profile updated successfully:", result);
        user(); // Merge updated data with the original
      } else {
        console.log("Failed to update profile:", result);
      }

      setModalVisible(false); // Close the modal after saving
    } catch (err) {
      console.error("Error updating profile:", err);
    }
    setModalVisible(false); // Close the modal after saving
  }

  return (
    <View>
      <View style={{ backgroundColor: Color.PRIMARY }}>
        <PageHeader title={"My Profile"} color={"white"} />
      </View>

      {
        loading ?
          <ActivityIndicator/> :
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
              backgroundColor: Color.PRIMARY,
              borderBottomRightRadius: 20, borderBottomLeftRadius: 20, paddingBottom: 20, width: "100%", height: 100
            }}>
              <TouchableOpacity
                style={{ marginLeft: 300 }}
                onPress={() => {
                  setFormData(data); // Set initial form data for editing
                  setModalVisible(true);
                }}>
                {/* <FontAwesome name="pencil" size={24} color={"white"} /> */}
                <Feather name="edit" size={24} color={Color.white} />
              </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "white", width: 110, height: 110, borderRadius: 50, marginTop: -50 }}>
             
              <Image source={{ uri: data?.image }} style={{ width: 100, height: 100, borderRadius: 50, resizeMode: "cover" }}
                onError={(error) => <View>
                  <FontAwesome name="user-circle" size={74} color={Color.white} />
                </View>} />
              {/*  */}
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <Text style={{ fontFamily: 'appfont-semi', fontSize: 22 }}>{data.userName}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12 }}>{data.role}</Text>
              </View>
              <View>
                <Text style={{}}>ID : {data?._id}</Text>
              </View>
              {/* </View> */}
            </View>
            <View style={{ padding: 20, display: 'flex', gap: 10, margin: 20, borderRadius: 20, marginHorizontal: 30, width: "95%" }}>
              <Text style={{ fontSize: 20, fontFamily: 'appfont-semi' }}>Personal Details</Text>
              <View style={{ display: 'flex', gap: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 120 }}>
                  <View>
                    <Text style={{ color: Color.GRAY, fontFamily: 'appfont', fontSize: 17 }}>Age</Text>
                    <Text style={{ fontFamily: 'appfont' }}>{data?.age || "32 years"}</Text>
                  </View>
                  <View>
                    <Text style={{ color: Color.GRAY, fontFamily: 'appfont', fontSize: 17 }}>Gender</Text>
                    <Text style={{ fontFamily: 'appfont' }}>{data?.gender || "female"}</Text>
                  </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 55 }}>
                  <View>
                    <Text style={{ color: Color.GRAY, fontFamily: 'appfont', fontSize: 17 }}>Date of birth</Text>
                    <Text style={{ fontFamily: 'appfont' }}>{data?.dob?.split("T")[0] || "15/02/2002"}</Text>
                  </View>
                  <View>
                    <Text style={{ color: Color.GRAY, fontFamily: 'appfont', fontSize: 17 }}>Blood Group</Text>
                    <Text style={{ fontFamily: 'appfont' }}>{data?.bloodgroup || "A+"}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/*<View style={{ width: '100%', paddingHorizontal: 20 }}>
              <HorizontalLine />
            </View>*/}

            <View style={{ paddingHorizontal: 20, display: 'flex', gap: 10, borderRadius: 20, marginHorizontal: 30, width: "95%" }}>
              <Text style={{ fontSize: 20, fontFamily: 'appfont-semi' }}>Contact Information</Text>
              <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: "100%", gap: 10 }}>
                <MaterialIcons name="email" size={24} color={Color.PRIMARY} />
                <Text style={{ fontFamily: 'appfont-semi' }}>{data.email}</Text>
              </View>
              <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: "100%", gap: 10 }}>
                <MaterialIcons name="call" size={24} color={Color.PRIMARY} />
                <Text style={{ fontFamily: 'appfont-semi' }}>{data.phoneNumber}</Text>
              </View>
              <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: "100%", gap: 10 }}>
                <MaterialIcons name="home" size={24} color={Color.PRIMARY} />
                <Text style={{ fontFamily: 'appfont-semi' }}>{data?.address || "15/220 carmel matha street, chinnamuttom"}</Text>
              </View>
            </View>

            {/* Modal for Editing Profile */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ width: 300, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                  <Text style={{ fontSize: 20, fontFamily: 'appfont-semi', marginBottom: 20 }}>Edit Profile</Text>

                  <TextInput
                    placeholder="User Name"
                    value={formData.userName || data.userName}
                    onChangeText={(text) => handleInputChange('userName', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <TextInput
                    placeholder="Email"
                    value={formData.email || data.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <TextInput
                    placeholder="Phone Number"
                    value={formData.phoneNumber || data.phoneNumber}
                    onChangeText={(text) => handleInputChange('phoneNumber', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <TextInput
                    placeholder="Address"
                    value={formData.address || data.address}
                    onChangeText={(text) => handleInputChange('address', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <TextInput
                    placeholder="Age"
                    value={formData.age ? formData.age.toString() : (data.age ? data.age.toString() : '')}
                    onChangeText={(text) => handleInputChange('age', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <TextInput
                    placeholder="Gender"
                    value={formData.gender || data.gender}
                    onChangeText={(text) => handleInputChange('gender', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <TextInput
                    placeholder="Date of Birth"
                    value={formData?.dob?.split("T")[0] || data.dob}
                    onChangeText={(text) => handleInputChange('dob', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <TextInput
                    placeholder="Blood Group"
                    value={formData.bloodgroup || data.bloodgroup}
                    onChangeText={(text) => handleInputChange('bloodgroup', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <TextInput
                    placeholder="Image Url"
                    value={formData?.image|| data?.image}
                    onChangeText={(text) => handleInputChange('image', text)}
                    style={{ borderBottomWidth: 1, marginBottom: 15 }}
                  />

                  <Button title="Save" onPress={saveProfile} />
                  <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
          </View>
      }
    </View>
  );
};

export default Profile;
