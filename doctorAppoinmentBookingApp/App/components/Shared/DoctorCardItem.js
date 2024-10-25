import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Color from '../../../assets/Shared/Color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import image1 from '../../../assets/images/d2.png'

export default function DoctorCardItem({ doctor }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.imageWrapper}>
                    <Image source={image1} style={styles.image} />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.professionalTag}>
                            <MaterialIcons name="verified" size={18} color={Color.PRIMARY} />
                            <Text style={styles.professionalText}>Professional Doctor</Text>
                        </View>
                        {/* <Ionicons name="heart" size={24} color={Color.PRIMARY} /> */}
                    </View>
                    <View>
                        <Text style={styles.nameText}>{doctor.userName}</Text>
                        {
                          doctor?.specialties?.map((item , index)=>(<View>
                            <Text key={index} style={styles.professionText}>{item}</Text>
                            {
                                index+1 != doctor.specialties.length&&(<View></View>)
                            }
                          </View>))
                        }
                        
                    </View>
                    <View style={styles.ratingContainer}>
                        <View style={styles.starsContainer}>
                            <AntDesign name="star" size={15} color="orange" />
                            <AntDesign name="star" size={15} color="orange" />
                            <AntDesign name="star" size={15} color="orange" />
                            <AntDesign name="star" size={15} color="orange" />
                            <AntDesign name="star" size={15} color="orange" />
                            <Text style={styles.ratingText}>4.8</Text>
                        </View>
                        <View>
                            <Text style={styles.reviewsText}>49 Reviews</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Color.white,
        borderRadius: 10,
        gap: 10
    },
    subContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.LIGHT_GRAY,
        width: '25%',
        height: 100,
        borderRadius: 10
    },
    infoContainer: {
        flex: 1,
        gap: 3,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    professionalTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.SECONDARY,
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 10,
        marginTop: 5,
        alignSelf: 'flex-start',
    },
    professionalText: {
        color: Color.PRIMARY,
        fontFamily: 'appfont-semi',
    },
    nameText: {
        fontFamily: 'appfont-semi',
    },
    professionText: {
        fontSize: 10,
        color: Color.GRAY,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 3,
        borderRightWidth: 1,
        borderRightColor: Color.LIGHT_GRAY,
        width: '60%',
        alignItems: 'center',
    },
    ratingText: {
        fontFamily: 'appfont-semi',
        marginLeft: 5,
    },
    reviewsText: {
        color: Color.GRAY,
    },
    button: {
        width: '100%',
        backgroundColor: Color.SECONDARY,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    buttonText: {
        color: Color.PRIMARY,
        fontFamily: 'appfont-semi',
    },
})
