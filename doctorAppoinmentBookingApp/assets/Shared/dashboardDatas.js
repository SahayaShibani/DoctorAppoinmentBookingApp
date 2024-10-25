import url from '../root';
import AsyncStorage from '@react-native-async-storage/async-storage';

const users  = async (role,specialties)=>
{
    try{
        console.log('====================================');
        console.log("role" , role);
        console.log('====================================');
        const token = await AsyncStorage.getItem('token')
    
        const specialtiesQuery = specialties ? `&specialties=${specialties}` : '';
        const response = await fetch(`${url}/users?role=${role}${specialtiesQuery}`, {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${token}`,  
              'Content-Type': 'application/json',  
            },
          }).then(res=>res.json());
       
       return response;
    }
    catch(err){
        console.log(err.message);
        
    }   
}

module.exports = {
    users
}