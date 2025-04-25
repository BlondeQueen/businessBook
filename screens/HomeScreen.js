// screens/HomeScreen.js
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
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EnterpriseCard from '../components/EnterpriseCard';
import { COLORS, SIZES } from '../styles/theme';

// Import des données du modèle
import { getEnterprises, getDomains } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [enterprises, setEnterprises] = useState([]);
  const [businessDomains, setBusinessDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appels API
        const enterprisesData = await getEnterprises();
        const domainsData = await getDomains();
        
        setEnterprises(enterprisesData);
        setBusinessDomains(domainsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDomainPress = (domainId) => {
    if (selectedDomain === domainId) {
      setSelectedDomain(null);
    } else {
      setSelectedDomain(domainId);
    }
  };

  const filteredEnterprises = selectedDomain
    ? enterprises.filter(enterprise => 
        enterprise.businessDomains.some(domain => domain.id === selectedDomain)
      )
    : enterprises;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.greeting}>Welcomes,</Text>
        <Text style={styles.title}>Business Book</Text>
      </View>
      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={() => navigation.navigate('Search')}
      >
        <Ionicons name="search" size={20} color={COLORS.text} />
        <Text style={styles.searchText}>Rechercher une entreprise...</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDomains = () => (
    <View style={styles.domainsContainer}>
      <Text style={styles.sectionTitle}>Domaines d'activité</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.domainsList}
      >
        {businessDomains.map(domain => (
          <TouchableOpacity
            key={domain.id}
            style={[
              styles.domainItem,
              selectedDomain === domain.id && styles.selectedDomainItem
            ]}
            onPress={() => handleDomainPress(domain.id)}
          >
            <Text 
              style={[
                styles.domainName,
                selectedDomain === domain.id && styles.selectedDomainName
              ]}
            >
              {domain.domainName}
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
        data={filteredEnterprises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EnterpriseCard 
            enterprise={item}
            onPress={() => navigation.navigate('Details', { id: item.id, name: item.longName })}
          />
        )}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderDomains()}
            <Text style={styles.sectionTitle}>
              {selectedDomain 
                ? `${filteredEnterprises.length} entreprise(s) trouvée(s)` 
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
  domainsContainer: {  // Correction ici (était categoriesContainer)
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
  domainsList: {  // Correction ici (était categoriesList)
    paddingVertical: SIZES.small,
  },
  domainItem: {  // Correction ici (était categoryItem)
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    marginRight: SIZES.small,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
  },
  selectedDomainItem: {  // Correction ici (était selectedCategoryItem)
    backgroundColor: COLORS.primary,
  },
  domainName: {  // Correction ici (était categoryName)
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  selectedDomainName: {  // Correction ici (était selectedCategoryName)
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