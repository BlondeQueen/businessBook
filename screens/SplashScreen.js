// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Naviguer vers l'écran d'accueil après un délai
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../assets/logo-placeholder.png')} // Remplacer par votre logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Business Book</Text>
        <Text style={styles.subtitle}>Votre annuaire d'entreprises</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SIZES.large,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.card,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.card,
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default SplashScreen;