import { View, Text ,StyleSheet , Pressable} from 'react-native'
import React from 'react'
import Color from '../../assets/Shared/Color';

export default function Modal({isVisible , setIsVisible}) {

  return (
    <Modal animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!isVisible);
        }}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure ?</Text>
            <View style={{display:'flex' , flexDirection:'row' , gap:10}}>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIsVisible(!isVisible);
              }}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    home:{
       padding:20,
       marginTop : 20,
    },
    centeredView: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 22,
   },
   modalView: {
     margin: 20,
     backgroundColor: 'white',
     borderRadius: 20,
     padding: 35,
     alignItems: 'center',
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5,
   },
   button: {
     borderRadius: 20,
     padding: 10,
     elevation: 2,
   },
   buttonOpen: {
     backgroundColor: Color.PRIMARY,
   },
   buttonClose: {
     backgroundColor: Color.PRIMARY,
   },
   textStyle: {
     color: 'white',
     fontWeight: 'bold',
     textAlign: 'center',
   },
   modalText: {
     marginBottom: 15,
     textAlign: 'center',
   },
 })