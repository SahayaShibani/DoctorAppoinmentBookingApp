import { View, Text ,StyleSheet , Image, Dimensions} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import image1 from '../../../assets/images/image1.jpeg';
import image2 from '../../../assets/images/image2.jpeg';

const Slider = () => {

   const sliderList = [
    {
        id:1,
        name :"Slider-1",
        imageUrl :image1
    },
    {
        id:2,
        name :"Slider-2",
        imageUrl :image2
    }]   

  return (
    <View style={styles.container}>
     <FlatList 
     data={sliderList}
     horizontal={true}
     showsHorizontalScrollIndicator={false}
     renderItem={({item,index})=>(<Image source={item.imageUrl} style={styles.flatList}/>)}/>
    </View>
  )
}

const styles = StyleSheet.create({

    container:{
        marginTop:10,
    },

    flatList:{
         width:Dimensions.get('screen').width*0.88,
         height:170,
         borderRadius: 10,
         margin:2
    }

})

export default Slider