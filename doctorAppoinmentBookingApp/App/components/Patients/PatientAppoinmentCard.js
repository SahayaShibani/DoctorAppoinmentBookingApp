import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Color from '../../../assets/Shared/Color'
import image1 from '../../../assets/images/d2.png'
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export default function PatientAppoinmentCard({ data, onCancel }) {
    return (
        <View style={{ marginTop: 20 }}>
            <View style={styles.container}>
                <View style={{ backgroundColor: data.status == 'completed' ? '#79B791' : data.status == 'cancelled' ? '#E32636' : '#FF8C00', padding: 2, width: 100, borderRadius: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, paddingLeft: 5 }}>
                    <FontAwesome name={data.status == 'completed' ? 'check-square-o' : data.status == 'cancelled' ? "ban" : 'clock-o'} size={14} color={'white'} style={{ textAlign: "center" }} />
                    <Text style={{ color: 'white', fontFamily: 'appfont' }}>{data.status}</Text>
                </View>
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
                            <Ionicons name="heart" size={24} color={Color.PRIMARY} />
                        </View>
                        <View>
                            <Text style={styles.nameText}>{data.doctorId.userName}</Text>
                            {
                                data?.doctorId?.specialties?.map((item, index) => (<View>
                                    <Text key={index} style={styles.professionText}>{item}</Text>
                                    {
                                        index + 1 != data.doctorId.specialties.length && (<View></View>)
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
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        data.status == 'approved' || data.status == 'pending' ? (<><TouchableOpacity style={{ ...styles.button, borderWidth: 1, borderColor: 'red', backgroundColor: 'white' }} onPress={() => onCancel()}>
                            <Text style={{ color: 'red' }}>Cancel</Text>
                        </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Reschedule</Text>
                            </TouchableOpacity> */}
                            </>) 
                            : (<TouchableOpacity style={{ width: '100%', backgroundColor: Color.SECONDARY, padding: 10, borderRadius: 10 }}><Text style={{ textAlign: 'center', color: Color.PRIMARY, fontFamily: 'appfont-semi' }}>Give feedback</Text></TouchableOpacity>)
                    }
                </View>
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
        width: '45%',
        backgroundColor: Color.SECONDARY,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: Color.PRIMARY,
        fontFamily: 'appfont-semi',
    },
})
