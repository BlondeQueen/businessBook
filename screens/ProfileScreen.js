// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const ProfileScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // Données fictives pour simuler un utilisateur connecté
  const user = {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isBusinessOwner: true,
    companies: [
      {
        id: 2,
        name: 'Tech Solutions',
        logo: 'https://via.placeholder.com/100',
      }
    ]
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: () => {
            // Logique de déconnexion ici
            console.log('User logged out');
          },
        },
      ]
    );
  };

  const profileOptions = [
    {
      icon: 'person-outline',
      title: 'Modifier le profil',
      onPress: () => console.log('Edit profile'),
    },
    {
      icon: 'briefcase-outline',
      title: 'Mes entreprises',
      onPress: () => console.log('My companies'),
    },
    {
      icon: 'heart-outline',
      title: 'Favoris',
      onPress: () => navigation.navigate('Favorites'),
    },
    {
      icon: 'star-outline',
      title: 'Mes avis',
      onPress: () => console.log('My reviews'),
    },
    {
      icon: 'settings-outline',
      title: 'Paramètres',
      onPress: () => console.log('Settings'),
    },
    {
      icon: 'help-circle-outline',
      title: 'Aide & Support',
      onPress: () => console.log('Help & Support'),
    },
    {
      icon: 'information-circle-outline',
      title: 'À propos',
      onPress: () => console.log('About'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
        </View>
        
        <View style={styles.profileCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            {user.isBusinessOwner && (
              <View style={styles.businessBadge}>
                <Ionicons name="briefcase" size={14} color={COLORS.card} />
                <Text style={styles.businessBadgeText}>Propriétaire</Text>
              </View>
            )}
          </View>
        </View>
        
        {user.isBusinessOwner && user.companies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mes entreprises</Text>
            {user.companies.map(company => (
              <TouchableOpacity 
                key={company.id}
                style={styles.companyItem}
                onPress={() => navigation.navigate('Details', { id: company.id, name: company.name })}
              >
                <Image source={{ uri: company.logo }} style={styles.companyLogo} />
                <Text style={styles.companyName}>{company.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))}
            <Button 
              title="Ajouter une entreprise" 
              type="outline"
              icon="add"
              onPress={() => console.log('Add company')}
              style={styles.addButton}
            />
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>Mode sombre</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.card}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.card}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          
          {profileOptions.map((option, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.optionItem}
              onPress={option.onPress}
            >
              <View style={styles.optionInfo}>
                <Ionicons name={option.icon} size={22} color={COLORS.text} />
                <Text style={styles.optionText}>{option.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
        
        <Button 
          title="Déconnexion" 
          type="error"
          icon="log-out-outline"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
        
        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.medium,
    padding: SIZES.large,
    borderRadius: SIZES.cardRadius,
    ...SHADOWS.small,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SIZES.large,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  businessBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  businessBadgeText: {
    fontSize: SIZES.caption,
    color: COLORS.card,
    marginLeft: 4,
  },
  section: {
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: SIZES.cardRadius,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  companyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.medium,
  },
  companyName: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  addButton: {
    marginTop: SIZES.medium,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SIZES.medium,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SIZES.medium,
  },
  logoutButton: {
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.medium,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SIZES.medium,
  },
  version: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
});

export default ProfileScreen;