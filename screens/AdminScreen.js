// screens/AdminScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles/theme';

// Import des services API
import { getEnterprises, hinderEnterprise, deleteEnterprise, getAllTrafics } from '../services/api';

const AdminScreen = ({ navigation }) => {
  const [enterprises, setEnterprises] = useState([]);
  const [trafics, setTrafics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enterprisesData, traficsData] = await Promise.all([
          getEnterprises(),
          getAllTrafics()
        ]);
        
        setEnterprises(enterprisesData);
        setTrafics(traficsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHinderEnterprise = async (id) => {
    Alert.alert(
      'Suspendre l\'entreprise',
      'Êtes-vous sûr de vouloir suspendre cette entreprise ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Suspendre',
          style: 'destructive',
          onPress: async () => {
            try {
              await hinderEnterprise(id);
              
              // Rafraîchir la liste des entreprises
              const updatedEnterprises = await getEnterprises();
              setEnterprises(updatedEnterprises);
              
              Alert.alert('Succès', 'L\'entreprise a été suspendue avec succès.');
            } catch (error) {
              console.error('Error hindering enterprise:', error);
              Alert.alert('Erreur', 'Une erreur est survenue lors de la suspension de l\'entreprise.');
            }
          },
        },
      ]
    );
  };

  const handleDeleteEnterprise = async (id) => {
    Alert.alert(
      'Supprimer l\'entreprise',
      'Êtes-vous sûr de vouloir supprimer cette entreprise ? Cette action est irréversible.',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEnterprise(id);
              
              // Mettre à jour la liste locale
              setEnterprises(enterprises.filter(enterprise => enterprise.id !== id));
              
              Alert.alert('Succès', 'L\'entreprise a été supprimée avec succès.');
            } catch (error) {
              console.error('Error deleting enterprise:', error);
              Alert.alert('Erreur', 'Une erreur est survenue lors de la suppression de l\'entreprise.');
            }
          },
        },
      ]
    );
  };

  const renderTraficsCard = () => {
    if (!trafics) return null;
    
    return (
      <View style={styles.traficsCard}>
        <Text style={styles.traficsTitle}>Statistiques de trafic</Text>
        
        <View style={styles.traficsRow}>
          <View style={styles.traficItem}>
            <Text style={styles.traficValue}>{trafics.totalVisits}</Text>
            <Text style={styles.traficLabel}>Visites totales</Text>
          </View>
          
          <View style={styles.traficItem}>
            <Text style={styles.traficValue}>{trafics.uniqueVisitors}</Text>
            <Text style={styles.traficLabel}>Visiteurs uniques</Text>
          </View>
        </View>
        
        <View style={styles.traficsRow}>
          <View style={styles.traficItem}>
            <Text style={styles.traficValue}>{trafics.pagesPerVisit}</Text>
            <Text style={styles.traficLabel}>Pages / visite</Text>
          </View>
          
          <View style={styles.traficItem}>
            <Text style={styles.traficValue}>{trafics.searchCount}</Text>
            <Text style={styles.traficLabel}>Recherches</Text>
          </View>
        </View>
      </View>
    );
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
        <Text style={styles.title}>Administration</Text>
      </View>
      
      {renderTraficsCard()}
      
      <View style={styles.enterprisesContainer}>
        <Text style={styles.sectionTitle}>Gestion des entreprises</Text>
        
        <FlatList
          data={enterprises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.enterpriseItem}>
              <View style={styles.enterpriseInfo}>
                <Text style={styles.enterpriseName}>{item.longName}</Text>
                <Text style={styles.enterpriseDomain}>
                  {item.businessDomains.map(d => d.domainName).join(', ')}
                </Text>
                <View style={styles.statusContainer}>
                  <View 
                    style={[
                      styles.statusDot, 
                      { backgroundColor: item.isActive ? COLORS.success : COLORS.error }
                    ]} 
                  />
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              
              <View style={styles.actionsContainer}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('Details', { id: item.id, name: item.longName })}
                >
                  <Ionicons name="eye-outline" size={22} color={COLORS.primary} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleHinderEnterprise(item.id)}
                >
                  <Ionicons name="pause-circle-outline" size={22} color={COLORS.warning} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleDeleteEnterprise(item.id)}
                >
                  <Ionicons name="trash-outline" size={22} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  traficsCard: {
    backgroundColor: COLORS.card,
    margin: SIZES.medium,
    padding: SIZES.large,
    borderRadius: SIZES.cardRadius,
  },
  traficsTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  traficsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.medium,
  },
  traficItem: {
    alignItems: 'center',
    flex: 1,
  },
  traficValue: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  traficLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  enterprisesContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
    paddingHorizontal: SIZES.large,
  },
  listContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large,
  },
  enterpriseItem: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.medium,
    marginVertical: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  enterpriseInfo: {
    flex: 1,
  },
  enterpriseName: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  enterpriseDomain: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: SIZES.small,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminScreen;