// screens/FavoritesScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import { COLORS, SIZES } from '../styles/theme';

// Données fictives pour simuler les favoris
const mockFavorites = [1, 3, 5]; // IDs des entreprises favorites

// Import des données mock
import { getCompanies } from '../services/api';

const FavoritesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Simulation d'un appel API
        const allCompanies = await getCompanies();
        
        // Filtrer les entreprises favorites
        const favoriteCompanies = allCompanies.filter(company => 
          mockFavorites.includes(company.id)
        );
        
        setFavorites(favoriteCompanies);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = (id) => {
    // Simuler la suppression d'un favori
    const updatedFavorites = favorites.filter(company => company.id !== id);
    setFavorites(updatedFavorites);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Mes Favoris</Text>
      </View>
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Card 
                company={item}
                onPress={() => navigation.navigate('Details', { id: item.id, name: item.name })}
              />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => handleRemoveFavorite(item.id)}
              >
                <Ionicons name="close-circle" size={24} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptyText}>
            Les entreprises que vous ajoutez à vos favoris apparaîtront ici
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Explorer les entreprises</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
  },
  title: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  listContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large,
  },
  cardContainer: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  emptyTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.large,
    marginBottom: SIZES.small,
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.large,
  },
  browseButton: {
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.large,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
  },
  browseButtonText: {
    color: COLORS.card,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
});

export default FavoritesScreen;