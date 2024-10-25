import { View, Text ,ScrollView , StyleSheet , FlatList , Modal, Pressable} from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../components/Home/Header'
import Search from '../components/Home/Search'
import Slider from '../components/Home/Slider'
import Categories from '../components/Home/Categories'
import PremiumHospital from '../components/Home/PremiumHospital'
import { AuthContext } from '../../components/authContext';
import Color from '../../assets/Shared/Color'

const Home = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const {userName , role ,setIsAuthenticated} = useContext(AuthContext)

  const data = [{ key: 'categories' }, { key: 'premiumHospital' }];

  return (
    <View style={styles.home}>
      <Header setModalVisible={setModalVisible}/>
      <Search setSearchText={(value)=>console.log(value)}/>
        
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.key === 'categories') return <Categories />;
          if (item.key === 'premiumHospital') return <PremiumHospital />;
          return null;
        }}
        ListHeaderComponent={<Slider />}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      />
        

      {/* <ScrollView  contentContainerStyle={{ paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
          <Slider/> 
          <Categories/>
          <PremiumHospital/>
    </ScrollView> */}
    </View>
    
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

export default Home
