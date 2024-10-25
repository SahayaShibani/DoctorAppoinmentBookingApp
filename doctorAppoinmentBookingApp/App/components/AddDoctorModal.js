import { View, Text , Modal , TextInput , TouchableOpacity  , StyleSheet, Alert} from 'react-native'
import React, { useState } from 'react'
import Color from '../../assets/Shared/Color';
import { Entypo } from '@expo/vector-icons';
import url from '../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddDoctorModal({modalVisible , setModalVisible,setMyData}){

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        userName: '',
        specialties: [],
        role:"doctor",
        image:""
      });

      const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async() => {
        try{
            const token = await AsyncStorage.getItem("token");
            setModalVisible(false)
            const response = await fetch(`${url}/users/addDoctor`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(formData)
            });
            const data = await response.json();
            setFormData({
                email: '',
                password: '',
                phoneNumber: '',
                role: 'doctor', // Default role
                userName: '',
                specialties: [],
            });

            const updatedResponse = await fetch(`${url}/users?role=doctor`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const updatedData = await updatedResponse.json();
              
            setMyData(updatedData.data);
           
            if(data.success){
                Alert.alert(data.message);
            }
            console.log('====================================');
            console.log(data);
            console.log('====================================');
        }
        catch(err){
            console.log('====================================');
            console.log(err);
            console.log('====================================');
        }
      }

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)} // Close modal on request
  >
  <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
        <Text style={styles.modalTitle}>Add Doctor</Text>

        <TouchableOpacity
          style={{borderWidth:1 , borderColor:Color.LIGHT_GRAY ,borderRadius:50 , height:30 , width:30 , alignItems:"center"}}
          onPress={() => setModalVisible(false)}>
          <Entypo name="cross" size={24} color={Color.PRIMARY} />
        </TouchableOpacity>
        </View>
       
        <View style={{display:"flex" , gap:10}}>
        <TextInput
          placeholder="Name"
          value={formData.userName}
          onChangeText={(value) => handleInputChange('userName', value)}
          style={styles.input}
        />
        {/* Input fields */}
        
        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(value) => handleInputChange('phoneNumber', value)}
          style={styles.input}
          keyboardType="phone-pad"
        />
        
        <TextInput
          placeholder="Specialties (comma separated)"
          value={formData.specialties.join(', ')} // Join array for input
          onChangeText={(value) => handleInputChange('specialties', value.split(', '))}
          style={styles.input}
        />
        <TextInput
          placeholder="image Url"
          value={formData.image} // Join array for input
          onChangeText={(value) => handleInputChange('image', value)}
          style={styles.input}
        />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Close Button */}
       
      </View>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 20,
    },
    addButton: {
      borderWidth: 1,
      borderStyle: 'dotted',
      width: "100%",
      height: 50,
      marginBottom: 10,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    addButtonText: {
      fontFamily: "appfont-semi",
      fontSize: 20,
    },
    userCardContainer: {
      marginBottom: 20,
      elevation: 5,
      backgroundColor: Color.PRIMARY,
      padding: 10,
      borderRadius: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    
    closeButtonText: {
      color: Color.PRIMARY,
      fontWeight: 'bold',
    },
    input:{
       padding:10,
       borderWidth:1,
       borderColor:Color.LIGHT_GRAY,
       borderRadius:10,
       
    },
    submitButton:{
    marginTop: 20,
      backgroundColor: Color.PRIMARY,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText:{
        color: 'white',
      fontFamily:"appfont-semi"
    }
  })