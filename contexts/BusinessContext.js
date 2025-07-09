import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Créez le contexte
const BusinessContext = createContext();

// Fournisseur de contexte
export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les favoris depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
      }
    };

    loadFavorites();
  }, []);

  // Sauvegarder les favoris dans AsyncStorage quand ils changent
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des favoris:', error);
      }
    };

    // Sauvegarder même si le tableau est vide pour synchroniser les suppressions
    saveFavorites();
  }, [favorites]);

  // Ajouter une entreprise aux favoris
  const addToFavorites = (enterpriseId) => {
    if (!favorites.includes(enterpriseId)) {
      setFavorites([...favorites, enterpriseId]);
    }
  };

  // Supprimer une entreprise des favoris
  const removeFromFavorites = (enterpriseId) => {
    setFavorites(favorites.filter(id => id !== enterpriseId));
  };

  // Vérifier si une entreprise est dans les favoris
  const isInFavorites = (enterpriseId) => {
    return favorites.includes(enterpriseId);
  };

  // Basculer le statut favori d'une entreprise
  const toggleFavorite = (enterpriseId) => {
    if (isInFavorites(enterpriseId)) {
      removeFromFavorites(enterpriseId);
    } else {
      addToFavorites(enterpriseId);
    }
  };

  return (
    <BusinessContext.Provider 
      value={{ 
        businessData, 
        setBusinessData, 
        favorites,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        toggleFavorite,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useBusinessContext = () => {
  return useContext(BusinessContext);
};