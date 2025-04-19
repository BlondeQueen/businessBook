// screens/DetailsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

// Import des données mock
import { getCompanyById } from '../services/api';

const DetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        // Simulation d'un appel API
        const data = await getCompanyById(id);
        setCompany(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching company details:', error);
        setIsLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Logique pour sauvegarder dans les favoris (à implémenter avec AsyncStorage)
  };

  const handleCall = () => {
    if (company?.phone) {
      Linking.openURL(`tel:${company.phone}`);
    }
  };

  const handleEmail = () => {
    if (company?.email) {
      Linking.openURL(`mailto:${company.email}`);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Découvrez ${company?.name} sur Business Book!`,
        url: `https://businessbook.com/company/${company?.id}`,
        title: company?.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!company) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Impossible de charger les détails de l'entreprise
        </Text>
        <Button 
          title="Retour" 
          onPress={() => navigation.goBack()} 
          style={styles.errorButton}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image 
          source={{ uri: company.coverImage || 'https://via.placeholder.com/500x200' }} 
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: company.logo || 'https://via.placeholder.com/100' }} 
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={handleFavoriteToggle}
        >
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isFavorite ? COLORS.error : COLORS.card} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.name}>{company.name}</Text>
        <Text style={styles.category}>{company.category}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text 
                key={star} 
                style={[
                  styles.star, 
                  star <= Math.floor(company.rating) ? styles.filledStar : {}
                ]}
              >
                ★
              </Text>
            ))}
          </View>
          <Text style={styles.ratingText}>{company.rating}</Text>
          <Text style={styles.reviewCount}>({company.reviewCount} avis)</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Ionicons name="call-outline" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Appeler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
            <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Partager</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <Text style={styles.description}>{company.description}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{company.address}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{company.phone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{company.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="globe-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{company.website}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{company.hours}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Avis</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          {company.reviews && company.reviews.length > 0 ? (
            company.reviews.slice(0, 3).map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Text 
                      key={star} 
                      style={[
                        styles.reviewStar, 
                        star <= Math.floor(review.rating) ? styles.filledStar : {}
                      ]}
                    >
                      ★
                    </Text>
                  ))}
                </View>
                <Text style={styles.reviewText}>{review.comment}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReviewsText}>Aucun avis pour le moment</Text>
          )}
        </View>

        <Button 
          title="Écrire un avis" 
          type="primary" 
          style={styles.writeReviewButton} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: SIZES.subtitle,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SIZES.large,
  },
  errorButton: {
    width: 200,
  },
  header: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  logoContainer: {
    position: 'absolute',
    bottom: -40,
    left: SIZES.large,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  favoriteButton: {
    position: 'absolute',
    top: SIZES.medium,
    right: SIZES.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: SIZES.extraLarge + 20,
    paddingHorizontal: SIZES.large,
    paddingBottom: SIZES.extraLarge,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  category: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 16,
    color: COLORS.border,
  },
  filledStar: {
    color: COLORS.warning,
  },
  ratingText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.large,
    marginBottom: SIZES.large,
    paddingVertical: SIZES.medium,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    fontSize: SIZES.body,
    color: COLORS.primary,
  },
  infoSection: {
    marginBottom: SIZES.large,
    paddingTop: SIZES.medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  sectionTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  description: {
    fontSize: SIZES.body,
    lineHeight: 22,
    color: COLORS.text,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  infoText: {
    marginLeft: SIZES.small,
    fontSize: SIZES.body,
    color: COLORS.text,
    flex: 1,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: SIZES.body,
  },
  reviewItem: {
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  reviewDate: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewStar: {
    fontSize: 14,
    color: COLORS.border,
    marginRight: 2,
  },
  reviewText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    lineHeight: 20,
  },
  noReviewsText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: SIZES.small,
  },
  writeReviewButton: {
    marginTop: SIZES.medium,
  },
});

export default DetailsScreen;