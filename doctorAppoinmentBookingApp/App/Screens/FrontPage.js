import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, LayoutAnimation, Animated, Image, SafeAreaView } from 'react-native';
import image from '../../assets/images/image.png';
import Color from '../../assets/Shared/Color';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const FrontPage = ({ navigation }) => {
  const [position, setPosition] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(new Animated.Value(width * 0.5));

  useEffect(() => {
    const interval = setInterval(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setPosition((prevPosition) => (prevPosition === 10 ? -10 : 10));

      // Animate the button width as the arrow moves
      Animated.timing(buttonWidth, {
        toValue: position === 10 ? width * 0.55 : width * 0.5,
        duration: 500,
        useNativeDriver: false,
      }).start();

    }, 500);

    return () => clearInterval(interval);
  }, [position, buttonWidth]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>

      {/* Text and Button Container */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Your Ultimate Doctor</Text>
        <Text style={styles.heading}>Appointment Booking App</Text>
        <Text style={styles.subheading}>Book Appointments Effortlessly and manage your health journey</Text>

        <Animated.View>
          <TouchableOpacity
            style={styles.buttonContent}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <View style={{ transform: [{ translateX: position }] }}>
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 300,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Adds shadow on Android
  },
  heading: {
    fontSize: 25,
    fontFamily: 'appfont-semi',
    color: Color.green,
    textAlign: 'center',
    marginBottom: 10, // Added margin for spacing between headings
  },
  subheading: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'appfont-semi',
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 10, // Added padding for better text readability
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Color.PRIMARY,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 17,
    color: Color.white,
    fontFamily: 'appfont-semi',
  },
});

export default FrontPage;
