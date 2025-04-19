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
import Card from '../components/Card';
import { COLORS, SIZES } from '../styles/theme';

// Import des données mock
import { getCompanies, getCategories } from '../services/api';

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulation d'un appel API
        const companiesData = await getCompanies();
        const categoriesData = await getCategories();
        
        setCompanies(companiesData);
        setFilteredCompanies(companiesData);
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [searchTerm, selectedCategories]);

  const filterCompanies = () => {
    let filtered = companies;
    
    // Filtrer par nom ou description
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        company => 
          company.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          company.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          company.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    // Filtrer par catégories sélectionnées
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(company => 
        selectedCategories.includes(company.categoryId)
      );
    }
    
    setFilteredCompanies(filtered);
  };

  const handleCategoryToggle = (categoryId) => {
    const updatedCategories = [...selectedCategories];
    
    if (updatedCategories.includes(categoryId)) {
      // Retirer la catégorie
      const index = updatedCategories.indexOf(categoryId);
      updatedCategories.splice(index, 1);
    } else {
      // Ajouter la catégorie
      updatedCategories.push(categoryId);
    }
    
    setSelectedCategories(updatedCategories);
  };

  const renderFilters = () => {
    if (!showFilters) return null;
    
    return (
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Filtrer par catégorie</Text>
        <View style={styles.categoriesContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategories.includes(category.id) && styles.selectedCategoryItem
              ]}
              onPress={() => handleCategoryToggle(category.id)}
            >
              <Text 
                style={[
                  styles.categoryName,
                  selectedCategories.includes(category.id) && styles.selectedCategoryName
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
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
      
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {filteredCompanies.length} {filteredCompanies.length === 1 ? 'entreprise trouvée' : 'entreprises trouvées'}
            </Text>
          </View>

          <FlatList
            data={filteredCompanies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card 
                company={item}
                onPress={() => navigation.navigate('Details', { id: item.id, name: item.name })}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aucune entreprise ne correspond à votre recherche</Text>
              </View>
            }
          />
        </>
      )}
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
  searchIcon: {
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    marginRight: SIZES.small,
    marginBottom: SIZES.small,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius,
  },
  selectedCategoryItem: {
    backgroundColor: COLORS.primary,
  },
  categoryName: {
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  selectedCategoryName: {
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
    padding: SIZES.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default SearchScreen;