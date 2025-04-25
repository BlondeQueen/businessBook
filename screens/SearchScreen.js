// screens/SearchScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EnterpriseCard from '../components/EnterpriseCard';
import { COLORS, SIZES } from '../styles/theme';

// Import des fonctions API
import { searchEnterprises, getDomains } from '../services/api';

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enterprises, setEnterprises] = useState([]);
  const [businessDomains, setBusinessDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Simulation d'un objet Visitor selon le diagramme de classe
  const visitor = {
    id: 'visitor-1',
    search: async (query, domainIds) => {
      try {
        return await searchEnterprises(query, domainIds);
      } catch (error) {
        console.error('Error searching enterprises:', error);
        return [];
      }
    },
    subscribe: () => {
      // Implémentation d'abonnement
      console.log('User subscribed');
    },
    contactEnterprise: (contactInfo) => {
      // Implémentation pour contacter l'entreprise
      console.log('Contacting enterprise with:', contactInfo);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const domainsData = await getDomains();
        setBusinessDomains(domainsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching domains:', error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.trim() === '' && selectedDomains.length === 0) {
        setEnterprises([]);
        return;
      }

      setIsLoading(true);
      const results = await visitor.search(searchTerm, selectedDomains);
      setEnterprises(results);
      setIsLoading(false);
    };

    // Utiliser un délai pour éviter trop d'appels à l'API
    const debounceTimer = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedDomains]);

  const handleDomainToggle = (domainId) => {
    const updatedDomains = [...selectedDomains];
    
    if (updatedDomains.includes(domainId)) {
      // Retirer le domaine
      const index = updatedDomains.indexOf(domainId);
      updatedDomains.splice(index, 1);
    } else {
      // Ajouter le domaine
      updatedDomains.push(domainId);
    }
    
    setSelectedDomains(updatedDomains);
  };

  const renderFilters = () => {
    if (!showFilters) return null;
    
    return (
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Filtrer par domaine</Text>
        <View style={styles.domainsContainer}>
          {businessDomains.map(domain => (
            <TouchableOpacity
              key={domain.id}
              style={[
                styles.domainItem,
                selectedDomains.includes(domain.id) && styles.selectedDomainItem
              ]}
              onPress={() => handleDomainToggle(domain.id)}
            >
              <Text 
                style={[
                  styles.domainName,
                  selectedDomains.includes(domain.id) && styles.selectedDomainName
                ]}
              >
                {domain.domainName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading && (searchTerm.trim() !== '' || selectedDomains.length > 0)) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    }

    if (enterprises.length === 0 && (searchTerm.trim() !== '' || selectedDomains.length > 0)) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucune entreprise ne correspond à votre recherche</Text>
        </View>
      );
    }

    if (enterprises.length === 0) {
      return (
        <View style={styles.initialSearchContainer}>
          <Ionicons name="search" size={80} color={COLORS.textSecondary} style={styles.searchIcon} />
          <Text style={styles.searchHint}>Recherchez une entreprise par nom, description ou mot-clé</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={enterprises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EnterpriseCard 
            enterprise={item}
            onPress={() => navigation.navigate('Details', { id: item.id, name: item.longName })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.inputSearchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une entreprise, un service..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchTerm ? (
            <TouchableOpacity onPress={() => setSearchTerm('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons 
            name="options-outline" 
            size={22} 
            color={showFilters ? COLORS.primary : COLORS.text} 
          />
        </TouchableOpacity>
      </View>
      
      {renderFilters()}
      
      {enterprises.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {enterprises.length} {enterprises.length === 1 ? 'entreprise trouvée' : 'entreprises trouvées'}
          </Text>
        </View>
      )}
      
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.medium,
    height: 50,
  },
  inputSearchIcon: {
    marginRight: SIZES.small,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  filterButton: {
    marginLeft: SIZES.medium,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.card,
  },
  filtersContainer: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
    marginHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
    borderRadius: SIZES.borderRadius,
  },
  filterTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  domainsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  domainItem: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    marginRight: SIZES.small,
    marginBottom: SIZES.small,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius,
  },
  selectedDomainItem: {
    backgroundColor: COLORS.primary,
  },
  domainName: {
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  selectedDomainName: {
    color: COLORS.card,
  },
  resultsHeader: {
    paddingHorizontal: SIZES.large,
    marginBottom: SIZES.small,
  },
  resultsCount: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  listContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  initialSearchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  searchIcon: {
    marginBottom: SIZES.large,
    opacity: 0.5,
  },
  searchHint: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
});

export default SearchScreen;