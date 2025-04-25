// components/EnterpriseCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const EnterpriseCard = ({ 
  enterprise, 
  onPress,
  onFavoritePress,
  isFavorite = false,
  style
}) => {
  const defaultImage = 'https://via.placeholder.com/100x100?text=Business';
  
  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <Image 
          source={{ uri: enterprise.logoUrl || defaultImage }} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>{enterprise.longName}</Text>
            <TouchableOpacity 
              style={styles.favoriteButton} 
              onPress={() => onFavoritePress && onFavoritePress(enterprise)}
            >
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color={isFavorite ? COLORS.error : COLORS.textSecondary} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="business-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>
              {enterprise.type}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{enterprise.orgContact}</Text>
          </View>
          
          <View style={styles.footer}>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: enterprise.isActive ? COLORS.success : COLORS.error }
            ]}>
              <Text style={styles.statusText}>{enterprise.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.medium,
    ...SHADOWS.small
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: SIZES.borderRadius,
    marginRight: SIZES.medium,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  title: {
    flex: 1,
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  infoText: {
    marginLeft: SIZES.small,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: SIZES.small,
  },
  statusBadge: {
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: SIZES.caption,
    fontWeight: 'bold',
    color: COLORS.card,
  },
});

export default EnterpriseCard;