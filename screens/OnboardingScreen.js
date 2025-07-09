import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles/theme';

const { width, height } = Dimensions.get('window');

// Données des écrans d'onboarding
const onboardingData = [
  {
    id: '1',
    title: 'Découvrez des entreprises',
    description: 'Explorez un large éventail d\'entreprises locales dans tous les secteurs d\'activité. Trouvez facilement les informations dont vous avez besoin.',
    image: require('../assets/onboarding1.png'),
    color: COLORS.primary,
  },
  {
    id: '2',
    title: 'Restez informé',
    description: 'Recevez les dernières actualités, offres spéciales et mises à jour de vos entreprises préférées. Ne manquez jamais une opportunité.',
    image: require('../assets/onboarding2.png'),
    color: COLORS.secondary,
  },
  {
    id: '3',
    title: 'Gérez vos favoris',
    description: 'Ajoutez vos entreprises préférées à vos favoris pour un accès rapide et facile. Organisez votre réseau professionnel efficacement.',
    image: require('../assets/onboarding3.png'),
    color: COLORS.accent,
  },
  {
    id: '4',
    title: 'Connectez-vous',
    description: 'Créez un compte pour accéder à toutes les fonctionnalités : ajouter des entreprises, laisser des avis et bien plus encore.',
    image: require('../assets/onboarding1.png'),
    color: COLORS.success,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  // Fonction pour passer à l'écran d'accueil
  const handleDone = async () => {
    try {
      // Enregistrer que l'utilisateur a vu l'onboarding
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      
      // Naviguer vers l'écran principal
      navigation.replace('Main');
    } catch (error) {
      console.error('Error saving onboarding state:', error);
    }
  };

  // Fonction pour passer à l'écran suivant
  const handleNext = () => {
    console.log('handleNext called, currentIndex:', currentIndex, 'onboardingData.length:', onboardingData.length);
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      console.log('Moving to nextIndex:', nextIndex);
      
      // Mettre à jour l'index immédiatement
      setCurrentIndex(nextIndex);
      
      // Utiliser scrollToOffset pour un défilement plus fluide
      if (slidesRef.current) {
        slidesRef.current.scrollToOffset({ 
          offset: nextIndex * width, 
          animated: true 
        });
      }
    } else {
      console.log('Last screen, calling handleDone');
      handleDone();
    }
  };

  // Fonction pour passer l'onboarding
  const handleSkip = () => {
    handleDone();
  };

  // Rendu de chaque slide
  const renderItem = ({ item, index }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.slide, { opacity, transform: [{ scale }] }]}>
        <View style={styles.imageContainer}>
          {item.icon && (
            <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={60} color={item.color} />
            </View>
          )}
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </Animated.View>
    );
  };

  // Indicateurs de pagination
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {onboardingData.map((_, i) => {
            const opacity = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotWidth = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  { opacity, width: dotWidth },
                ]}
              />
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          {currentIndex < onboardingData.length - 1 ? (
            <>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Passer</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Suivant</Text>
                <Ionicons name="arrow-forward" size={20} color={COLORS.card} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.finalButtonContainer}>
              <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Commencer l'aventure</Text>
                <Ionicons name="rocket-outline" size={20} color={COLORS.card} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          console.log('onMomentumScrollEnd - calculated index:', index, 'offset:', event.nativeEvent.contentOffset.x);
          setCurrentIndex(index);
        }}
        ref={slidesRef}
        scrollEventThrottle={32}
      />
      
      {renderPagination()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.large,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.large,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: width * 0.7,
    height: height * 0.25,
    marginTop: SIZES.medium,
  },
  textContainer: {
    flex: 0.3,
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.medium,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: SIZES.body + 2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: SIZES.small,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SIZES.large,
  },
  dot: {
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.large,
    alignItems: 'center',
  },
  skipButton: {
    padding: SIZES.medium,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skipButtonText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.borderRadius,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: SIZES.body,
    color: COLORS.card,
    fontWeight: '600',
    marginRight: SIZES.small,
  },
  finalButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium + 4,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    width: '100%',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  doneButtonText: {
    fontSize: SIZES.subtitle,
    color: COLORS.card,
    fontWeight: '700',
    marginRight: SIZES.small,
  },
});

export default OnboardingScreen;