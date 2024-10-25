import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Color from '../../../assets/Shared/Color'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HospitalCardItem({ hospital }) {

    return (
        <View style={styles.cardContainer}>
            <Image source={hospital.url} style={styles.image} />
            <View>
                <Text style={styles.headText}>{hospital.name}</Text>
                <FlatList
                    data={hospital.data}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Text style={styles.categoryText}>{item}</Text>
                    )}
                />
                <View style={styles.addressContainer}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', padding: 5 }}>
                    <Ionicons name="location" size={20} color={Color.PRIMARY} />
                    <Text>
                        {hospital.address}
                    </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', gap: 5, alignItems: 'center', marginTop: 4 }}>
                    <Ionicons name="eye-sharp" size={20} color={Color.PRIMARY} />
                    <Text>
                        658 views
                    </Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    // container:{
    //     padding:15
    // },
    image: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    textContainer: {
        padding: 10,
        backgroundColor: Color.white
    },
    headText: {
        fontSize: 18,
        fontFamily: 'appfont-semi'
    },
    categoryText: {
        marginRight: 10,
        color: Color.GRAY
    },
    addressContainer: {
        borderBottomWidth: 1,
        borderColor: Color.LIGHT_GRAY,
        margin: 5,
        marginBottom: 10
    },
    cardContainer: {
        backgroundColor: Color.white, // Set the background to white for the card
        borderRadius: 10,
        padding: 10,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 5,
        marginBottom: 4 // Optional margin for spacing
    }
})