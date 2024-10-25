import { View, Text ,Modal , StyleSheet , TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '../components/Shared/PageHeader';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import UserCard from '../components/user/UserCard';
import Color from '../../assets/Shared/Color';
import Entypo from '@expo/vector-icons/Entypo';
import AddDoctorModal from '../components/AddDoctorModal';
 
export default function AdminViewPage({route , navigation}) {

        const {data} = route.params || {};
       
        const [modalVisible, setModalVisible] = useState(false); 
        const [mydata , setMyData] = useState(data.data);
        console.log('====================================');
        console.log("Mydata" , mydata);
        console.log('====================================');

        useEffect(()=>{
           
        },[mydata])

  return (
  <View>
    <PageHeader title={data.title}/>
    <View style={{padding:20}}>
        {
           data.route == "doctors"&&(
           <TouchableOpacity style={styles.addButton}
           onPress={() => setModalVisible(true)}>
               <View><Text style={{fontFamily:"appfont-semi", fontSize:20}}>+ Add Doctor</Text></View>
           </TouchableOpacity>
           )
        }
    <FlatList data={mydata} renderItem={({item})=>(
        <View  style={{marginBottom:20 , elevation:5 , backgroundColor:Color.white , padding:10 , borderRadius:10}}>
            <TouchableOpacity>
            <UserCard data={item}/>
        </TouchableOpacity>
            </View>
  )} contentContainerStyle={{paddingBottom:170}} showsVerticalScrollIndicator={false}/>
    </View>
    <AddDoctorModal modalVisible={modalVisible}  setModalVisible = {setModalVisible} navigation={navigation} setMyData={setMyData}/>
  </View>
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
  });