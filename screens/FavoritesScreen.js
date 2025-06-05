import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBusinessContext } from '../contexts/BusinessContext';
import EnterpriseCard from '../components/EnterpriseCard';
import { COLORS, SIZES } from '../styles/theme';
import { getEnterpriseById } from '../services/api';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite, isInFavorites } = useBusinessContext();
  const [favoriteEnterprises, setFavoriteEnterprises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteEnterprises = async () => {
      try {
        setIsLoading(true);
        
        const enterprises = await Promise.all(
          favorites.map(async (id) => {
            try {
              const data = await getEnterpriseById(id);
              return data;
            } catch (error) {
              console.error(`Error fetching enterprise with id ${id}:`, error);
              return null;
            }
          })
        );
        
        // Filtrer les entreprises nulles (en cas d'erreur)
        setFavoriteEnterprises(enterprises.filter(enterprise => enterprise !== null));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching favorite enterprises:', error);
        setIsLoading(false);
      }
    };

    fetchFavoriteEnterprises();
  }, [favorites]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (favoriteEnterprises.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.header}>
          <Text style={styles.title}>Mes favoris</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart" size={80} color={COLORS.border} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptyText}>
            Ajoutez des entreprises à vos favoris pour les retrouver facilement ici.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Mes favoris</Text>
      </View>
      
      <FlatList
        data={favoriteEnterprises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EnterpriseCard
            enterprise={item}
            onPress={() => navigation.navigate('Details', { id: item.id, name: item.longName })}
            onFavoritePress={() => toggleFavorite(item.id)}
            isFavorite={isInFavorites(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: SIZES.medium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  emptyIcon: {
    marginBottom: SIZES.large,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
});

export default FavoritesScreen;