import { View, Text, Image, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import Color from '../../../assets/Shared/Color';
import HorizontalLine from '../Shared/HorizontalLine';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function AdminAppoinmentCard({ data }) {
    // console.log(data);

    const [modalVisible, setModalVisible] = useState(false);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return {
                    icon: <MaterialCommunityIcons name="clock-alert" size={20} color={"#FFC107"} />, // Yellow for pending
                    backgroundColor: "#FFF3CD", // Light yellow background
                };
            case 'approved':
                return {
                    icon: <MaterialCommunityIcons name="check-circle" size={20} color={"#4CAF50"} />, // Green for approved
                    backgroundColor: "#D4EDDA", // Light green background
                };
            case 'canceled':
                return {
                    icon: <MaterialCommunityIcons name="cancel" size={20} color={"#F44336"} />, // Red for canceled
                    backgroundColor: "#F8D7DA", // Light red background
                };
            case 'completed':
                return {
                    icon: <MaterialCommunityIcons name="check" size={20} color={"#2196F3"} />, // Blue for completed
                    backgroundColor: "#D1ECF1", // Light blue background
                };
            default:
                return {
                    icon: null, // No icon for undefined status
                    backgroundColor: "transparent", // Default background
                };
        }
    };


    const statusDetails = getStatusIcon(data?.status);
    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 10, backgroundColor: 'white', margin: 10, borderRadius: 10, elevation: 5 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: Color.GRAY }}>{moment(data?.appointmentDate).format("MMM Do YYYY")} | {data?.appointmentTime}</Text>
                    <View style={{
                        backgroundColor: statusDetails.backgroundColor,
                        padding: 7,
                        borderRadius: 50,
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        {statusDetails.icon}
                        <Text style={{ marginLeft: 5 }}>{data?.status}</Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <HorizontalLine />
                    <View>
                        <View style={{ borderRadius: 50, padding: 5 }}>
                            <Image source={{ uri: data?.doctorId?.image }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        </View>
                        <View style={{ height: 20, width: 2, backgroundColor: Color.LIGHT_GRAY, marginLeft: 30, marginBottom: 5 }}>

                        </View>
                        <View>
                            <Image source={{ uri: data?.patientId?.image }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 17, fontFamily: 'appfont-semi', color: Color.PRIMARY }}>Doctor Name : {data?.doctorId?.userName}</Text>
                        <Text style={{ fontSize: 17, fontFamily: 'appfont-semi', color: Color.PRIMARY }}>Patient Name : {data?.patientId?.userName}</Text>
                        <Text style={{ fontSize: 17, fontFamily: 'appfont-semi', color: Color.PRIMARY }}>Appointment Id: {data?._id?.slice(0, 10)}...</Text>
                        {/* <Text style={{fontSize:17 , fontFamily:'appfont'}}>Status: {data?.status}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Appointment Details</Text>
                        <Text style={styles.modalText}>Id: {data?._id}</Text>
                        <Text style={styles.modalText}>Date: {moment(data?.appointmentDate).format("MMM Do YYYY")}</Text>
                        <Text style={styles.modalText}>Time: {data?.appointmentTime}</Text>
                        <Text style={styles.modalText}>Status: {data?.status}</Text>
                        <Text style={styles.modalText}>Doctor: {data?.doctorId?.userName}</Text>
                        <Text style={styles.modalText}>Patient: {data?.patientId?.userName}</Text>
                        <Text style={styles.modalText}>Address: {data?.patientId?.address || 'N/A'}</Text> 
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>


    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: Color.PRIMARY,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});