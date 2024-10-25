import { View, Text, FlatList ,Modal,StyleSheet, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import url from '../../assets/root';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageHeader from '../components/Shared/PageHeader';
import PatientAppoinmentCard from '../components/Patients/PatientAppoinmentCard';
import { TouchableOpacity } from 'react-native';
import Color from '../../assets/Shared/Color';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



export default function PatientAppointmentsScreen() {

  const [myAppointments, setMyAppointments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [filteresAppoinments , setFilteredAppoinmnets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${url}/appoinment`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
          'content-type': 'application/json'
        }
      });

      const data = await response.json();

      setMyAppointments(data.appointments);  
      console.log("My appoinments" , myAppointments);    

           
    } catch (err) {
      console.log(err.message);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    fetchAppointments();
    
  },[])

  useEffect(() => {
    
    // Filter appointments based on the selected tab
    const filterAppointments = async() => {
      let filtered;
      switch (selectedTab) {
        case 'upcoming':
          setLoading(true)
          filtered = await myAppointments.filter(item => item.status === 'approved');
          setLoading(false)
          break;
        case 'completed':
          setLoading(true)
          filtered = await myAppointments.filter(item => item.status === 'completed');
          setLoading(false)
          break;
        case 'cancelled':
          setLoading(true)
          filtered = await myAppointments.filter(item => item.status === 'cancelled');
          setLoading(false)
          break;
        default:
          filtered = myAppointments;
      }
      console.log("Filtered Appointments for tab:", selectedTab, "=>", filtered); 
      setFilteredAppoinmnets(filtered);
    };

    filterAppointments();
  }, [selectedTab, myAppointments]);


  const confirmCancelAppointment = async () => {
    try {
      // Call the API to cancel the appointment here
      // const response = await fetch(`${url}/appointment/cancel/${selectedAppointment._id}`, { method: 'POST' });

      console.log("Appointment canceled:", selectedAppointment);

      // Refresh the appointment list
      fetchAppointments();

      // Close the modal
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error canceling appointment:", error);
    }
  };

  const getTabStyle = (tabName) => {
    return selectedTab === tabName ? styles.selectedTab : styles.unselectedTab;
  };

  function handleCancelAppointment(item){
         setIsModalVisible(true)
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Color.PRIMARY} />
        {/* <Text style={{ color: Color.PRIMARY }}>Loading Appointments...</Text> */}
      </View>
    );
  }

  return (
    <View>
      <PageHeader title="My Appointments" />
      <View style={{display:'flex' , flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
      <TouchableOpacity
          style={getTabStyle('upcoming')}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={selectedTab === 'upcoming' ? styles.selectedText : styles.unselectedText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getTabStyle('completed')}
          onPress={() => setSelectedTab('completed')}
        >
          <Text style={selectedTab === 'completed' ? styles.selectedText : styles.unselectedText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getTabStyle('cancelled')}
          onPress={() => setSelectedTab('cancelled')}
        >
          <Text style={selectedTab === 'cancelled' ? styles.selectedText : styles.unselectedText}>Cancelled</Text>
        </TouchableOpacity>
      </View>
      {
        filteresAppoinments.length == 0 ? <View style={{display:'flex',alignItems:'center',justifyContent:'center',height:"80%"}}><FontAwesome6 name="file-circle-xmark" size={34} color={Color.PRIMARY} /><Text style={{color:Color.PRIMARY , fontFamily:'appfont-semi'}}>No {selectedTab} appoinmnets</Text></View>:<FlatList 
        contentContainerStyle={{paddingBottom:100}}
          data={filteresAppoinments} 
          renderItem={({ item }) =><PatientAppoinmentCard data={item} onCancel={() => handleCancelAppointment(item)}/> } 
          keyExtractor={(item) => item._id}
        />
      }
      
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure you want to cancel this appointment?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmCancelAppointment}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderColor: Color.PRIMARY, // Color for selected tab
    padding: 10,
  },
  unselectedTab: {
    borderBottomWidth: 2,
    borderColor: 'transparent', // No border for unselected tab
    padding: 10,
  },
  selectedText: {
    color: Color.PRIMARY, // Text color for selected tab
    fontSize:15,
    fontFamily:'appfont-semi'
  },
  unselectedText: {
    color: 'black', // Text color for unselected tab
    fontSize:15,
    fontFamily:'appfont-semi'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContainer: {
    width: '80%', // Modal width
    backgroundColor: 'white', // White background for modal
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside modal
    elevation: 5, // Shadow effect on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowOffset: {
      width: 0, // Shadow horizontal offset
      height: 2, // Shadow vertical offset
    },
    shadowRadius: 4, // Shadow radius for iOS
  },
  modalTitle: {
    fontSize: 18, // Font size for title
    fontWeight: 'bold', // Bold title
    marginBottom: 20, // Space below title
    textAlign: 'center', // Center align title
  },
  modalButtons: {
    flexDirection: 'row', // Horizontal layout for buttons
    justifyContent: 'space-between', // Space between buttons
  },
  confirmButton: {
    flex: 1, // Button takes equal space
    backgroundColor: '#0F52BA', // Blue background for confirm button
    borderRadius: 5, // Rounded corners
    padding: 10, // Padding inside button
    marginRight: 10, // Space between buttons
  },
  cancelButton: {
    flex: 1, // Button takes equal space
    backgroundColor: '#FF3D00', // Red background for cancel button
    borderRadius: 5, // Rounded corners
    padding: 10, // Padding inside button
    marginLeft: 10, // Space between buttons
  },
  buttonText: {
    color: 'white', // White text color
    textAlign: 'center', // Center align text
    fontWeight: 'bold', // Bold text
  },
});

