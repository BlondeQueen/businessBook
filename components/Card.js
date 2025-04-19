// components/Card.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const Card = ({ company, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: company.logo || 'https://via.placeholder.com/100' }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{company.name}</Text>
        <Text style={styles.category} numberOfLines={1}>{company.category}</Text>
        
        <View style={styles.locationContainer}>
          <Text style={styles.location} numberOfLines={1}>{company.location}</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{company.rating}</Text>
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
          <Text style={styles.reviewCount}>({company.reviewCount})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.small
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
    marginRight: SIZES.medium,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  category: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  star: {
    fontSize: SIZES.body,
    color: COLORS.border,
  },
  filledStar: {
    color: COLORS.warning,
  },
  reviewCount: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
});

export default Card;