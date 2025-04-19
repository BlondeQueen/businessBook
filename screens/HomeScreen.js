// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import { COLORS, SIZES } from '../styles/theme';

// Données fictives pour simuler une API
import { getCompanies, getCategories } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulation d'appel API
        const companiesData = await getCompanies();
        const categoriesData = await getCategories();
        
        setCompanies(companiesData);
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryPress = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const filteredCompanies = selectedCategory
    ? companies.filter(company => company.categoryId === selectedCategory)
    : companies;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.greeting}>Bonjour,</Text>
        <Text style={styles.title}>Business Book</Text>
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search" size={20} color={COLORS.text} />
        <Text style={styles.searchText}>Rechercher une entreprise...</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>Catégories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.selectedCategoryItem
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text 
              style={[
                styles.categoryName,
                selectedCategory === category.id && styles.selectedCategoryName
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    }

    return (
      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card 
            company={item}
            onPress={() => navigation.navigate('Details', { id: item.id, name: item.name })}
          />
        )}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderCategories()}
            <Text style={styles.sectionTitle}>
              {selectedCategory 
                ? `${filteredCompanies.length} entreprise(s) trouvée(s)` 
                : 'Entreprises populaires'
              }
            </Text>
          </>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
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
    padding: SIZES.medium,
    paddingTop: SIZES.large,
  },
  titleContainer: {
    marginBottom: SIZES.medium,
  },
  greeting: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.medium,
    marginVertical: SIZES.small,
  },
  searchText: {
    marginLeft: SIZES.small,
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
  },
  categoriesContainer: {
    paddingHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  sectionTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
    paddingHorizontal: SIZES.medium,
  },
  categoriesList: {
    paddingVertical: SIZES.small,
  },
  categoryItem: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    marginRight: SIZES.small,
    backgroundColor: COLORS.card,
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
  listContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;