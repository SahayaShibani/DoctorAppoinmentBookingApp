import { View, Text, StyleSheet, Dimensions, Platform, TextInput, TouchableOpacity, Pressable, Alert, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import Color from '../../assets/Shared/Color';
const { width } = Dimensions.get('window');
import url from '../../assets/root';
import image from '../../assets/images/login.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, AuthContext } from '../../components/authContext';
import AdminNavigation from '../Navigations/AdminNavigation';

export default function Login({ navigation }) {

  const { setIsAuthenticated, setRole, setUserName, setUserId , role } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in both email and password fields');
      return;
    }

    try {
      const response = await fetch(`${url}/user/login`, {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      
      if (data.success) {
        AsyncStorage.setItem("token" , data.token);
        setIsAuthenticated(true);
        setRole(data.data.role);
        setUserName(data.data.userName);
        setUserId(data.data._id);
        Alert.alert(data.message);
      }
      console.log("Login response", data);
    } catch (err) {
      Alert.alert("Network Error", err.message);
      console.log("Login error:", err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={{ flex: 1 }}>
        {/* Top Image */}
        <Image 
          source={image} 
          style={styles.topImage} 
        />

        <View style={styles.innerContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Login</Text>

            {/* <ScrollView contentContainerStyle={{ display: 'flex', gap: 15, marginLeft: -5 }} > */}
              <View style={styles.textInput}>
               
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={form.email}
                  onChangeText={(text) => handleChange('email', text)}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.textInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={form.password}
                  onChangeText={(text) => handleChange('password', text)}
                />
              </View>

              <View>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <Text>Don't have an Account?
                    <Pressable onPress={() => navigation.navigate('Register')}>
                      <Text style={styles.registerlink}> Register</Text>
                    </Pressable>
                  </Text>
                </View>
              </View>
            {/* </ScrollView> */}
          </View>
        </View>

        {/* Bottom Image */}
       
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: width * 0.95,
    elevation: 4,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 30,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop:60
  },
  textInput: {
    width: width * 0.9 - 50,
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft: 20,
    elevation: 4,
    borderRadius: 50,
    marginLeft: 10
  },
  buttonText: {
    paddingHorizontal: 20,
    color: Color.white,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: Color.PRIMARY,
    paddingVertical: 10,
    borderRadius: 50,
    textAlign: 'center',
    width: width * 0.9 - 50,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Color.PRIMARY,
  },
  registerlink: {
    marginTop: 10,
    color: Color.PRIMARY,
    textDecorationLine: 'underline',
  },
  topImage: {
    width:150,
    // width: width,
    height: 150,
    resizeMode: 'cover',
    marginVertical:50,
    marginLeft:80
  },
  bottomImage: {
    width: width,
    height: 100,
    resizeMode: 'contain',
  },
});
