import { View, Text,StyleSheet ,TextInput} from 'react-native'
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../../assets/Shared/Color'

const Search = ({setSearchText}) => {

    const [searchInput, setSearchInput] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
      <Ionicons name="search-outline" size={24} color={Colors.PRIMARY} />
        <TextInput 
        placeholder='search...' 
        onChangeText={value=>setSearchInput(value)}
        onSubmitEditing={()=>setSearchText(searchInput)}
        value={searchInput}
        style={styles.inputBox}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        marginTop:15,
        marginBottom:20
    },
    searchBox:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        alignItems:'center',
        borderWidth:0.7,
        borderColor:Colors.GRAY,
        padding:8,
        borderRadius:8
    },
    inputBox:{
        width:'100%',
        fontWeight:'appfont'
    }
})
export default Search