import { View, Text ,StyleSheet , TouchableOpacity} from 'react-native'
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PageHeader({title , backButton=true , color}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {
        backButton ? <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={37} color={color ? color :"black"} />
        </TouchableOpacity> : null
      }
      <Text style={[styles.title, { color: color || "black" }]}>{title}</Text>
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center'
  },
  title:{
     fontSize:20,
     fontFamily:'appfont-semi',
     
  }
})