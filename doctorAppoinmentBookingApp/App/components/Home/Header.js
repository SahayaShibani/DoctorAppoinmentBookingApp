import { View, Text ,Image , StyleSheet, Pressable, Modal} from 'react-native'
import React, { useContext, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../../../components/authContext';
import Color from '../../../assets/Shared/Color';

const Header = () => {
    // const {isLoaded , isSignedIn , user} = useUser();

    // if(!isLoaded || !isSignedIn)
// {
// return null;
// }
const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Function to handle the logout action
  const handleLogout = () => {
    setModalVisible(false); // Close the modal first
    setIsAuthenticated(false); // Perform the logout action
  };


const {userName , role ,setIsAuthenticated} = useContext(AuthContext)
  return (
    <View style={styles.container}>
        <View style={styles.firstContainer}>
            <Image source ={require('../../../assets/images/profile.jpg')} style={styles.image}/>
            <View>
                <Text>Hello , 👋</Text>
            <Text style={styles.userName}>{role == 'doctor' ? "Dr. "+userName : userName}</Text>
            </View>
        </View>
        <View style={{display:'flex' , flexDirection:'row' , alignItems:'center' , justifyContent:'center' , }}>
            <Pressable style={{backgroundColor:Color.PRIMARY , padding:10 , borderRadius:40}}><Text style={{color:Color.white}} 
          onPress={() => setModalVisible(true)}
            >LogOut</Text></Pressable>
        <Ionicons name="notifications-outline" size={28} color="black" />
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal when back button is pressed on Android
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.buttonContainer}>
              {/* Cancel button */}
              <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              {/* Confirm button */}
              <Pressable style={[styles.button, styles.buttonConfirm]} onPress={handleLogout}>
                <Text style={styles.textStyle}>Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
       
       
        
    </View>
  )
}

const styles = StyleSheet.create({
     image:{
        width:45 , 
        height:45 ,
        borderRadius:99
     },
     userName:{
        fontSize:18,
        fontWeight:'bold',
        fontFamily:'appfont-bold',
     },
     firstContainer:{
         display:'flex',
         flexDirection:'row',
         gap:4,
         alignItems:'center'
     },
     container:{
         display:'flex',
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between'

     },
     greetings:{
        fontFamily:'appfont'
     },
     modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Shadow effect
        width: '80%', // Adjust width to fit screen
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%', // Adjust button width
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonCancel: {
        backgroundColor: 'gray',
      },
      buttonConfirm: {
        backgroundColor: Color.PRIMARY,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
})

export default Header