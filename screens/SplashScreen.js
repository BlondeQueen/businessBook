// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Text, 
  Animated, 
  Dimensions,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Plusieurs animations pour différents éléments
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const titleTranslateY = useRef(new Animated.Value(50)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const bgScale = useRef(new Animated.Value(0)).current;
  
  // Effet pour les cercles décoratifs
  const circle1Opacity = useRef(new Animated.Value(0)).current;
  const circle2Opacity = useRef(new Animated.Value(0)).current;
  const circle3Opacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Séquence d'animations
    Animated.sequence([
      // Fond et cercles d'abord
      Animated.parallel([
        Animated.timing(bgScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(circle1Opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(circle2Opacity, {
          toValue: 0.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(circle3Opacity, {
          toValue: 0.15,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      
      // Puis le logo
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 10,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      
      // Puis le titre et sous-titre
      Animated.parallel([
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Naviguer vers l'écran approprié après un délai
    const timer = setTimeout(async () => {
      try {
        // TEMPORAIRE: Forcer l'affichage de l'onboarding à chaque lancement
        await AsyncStorage.removeItem('hasSeenOnboarding');
        
        // Toujours afficher l'onboarding pour les tests
        navigation.replace('Onboarding');
      } catch (error) {
        console.error('Error navigating to onboarding:', error);
        // En cas d'erreur, aller directement à l'écran principal
        navigation.replace('Main');
      }
    }, 3500); // Légèrement plus long pour apprécier l'animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Cercles décoratifs */}
      <Animated.View style={[
        styles.circle, 
        styles.circle1, 
        {opacity: circle1Opacity, transform: [{scale: bgScale}]}
      ]} />
      <Animated.View style={[
        styles.circle, 
        styles.circle2, 
        {opacity: circle2Opacity, transform: [{scale: bgScale}]}
      ]} />
      <Animated.View style={[
        styles.circle, 
        styles.circle3, 
        {opacity: circle3Opacity, transform: [{scale: bgScale}]}
      ]} />

      <View style={styles.content}>
        {/* Logo avec icône et nom de l'app */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoWrapper}>
            <Ionicons name="business" size={64} color="#FFFFFF" />
          </View>
        </Animated.View>
        
        {/* Titre de l'application */}
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }]
          }}
        >
          <Text style={styles.title}>BusinessBook</Text>
        </Animated.View>
        
        {/* Slogan */}
        <Animated.Text 
          style={[
            styles.subtitle,
            { opacity: subtitleOpacity }
          ]}
        >
          Connectez, explorez, développez
        </Animated.Text>
      </View>
      
      {/* Footer avec la version */}
      <Animated.Text 
        style={[
          styles.version,
          { opacity: subtitleOpacity }
        ]}
      >
        Version 1.0.0
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.extraLarge,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.card,
    marginBottom: SIZES.medium,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: SIZES.subtitle,
    color: COLORS.card,
    opacity: 0.9,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontWeight: '300',
  },
  version: {
    position: 'absolute',
    bottom: 20,
    fontSize: SIZES.small,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  // Cercles décoratifs
  circle: {
    position: 'absolute',
    borderRadius: width,
    backgroundColor: '#FFFFFF',
  },
  circle1: {
    width: width * 1.4,
    height: width * 1.4,
    bottom: -width * 0.8,
    right: -width * 0.4,
  },
  circle2: {
    width: width * 1.2,
    height: width * 1.2,
    top: -width * 0.6,
    left: -width * 0.3,
  },
  circle3: {
    width: width * 0.8,
    height: width * 0.8,
    top: height * 0.2,
    right: -width * 0.2,
  },
});

export default SplashScreen;