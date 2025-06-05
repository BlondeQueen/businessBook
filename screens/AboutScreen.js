import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const AboutScreen = ({ navigation }) => {
  // Informations sur l'application
  const appInfo = {
    name: 'BusinessBook',
    version: '1.0.0',
    description: 'BusinessBook est une plateforme qui permet aux entreprises de se faire connaître et aux utilisateurs de découvrir des services locaux. Notre mission est de faciliter la connexion entre les entreprises et leurs clients potentiels.',
    features: [
      'Recherche d\'entreprises par catégorie et localisation',
      'Profils détaillés des entreprises avec informations de contact',
      'Système d\'avis et de notation',
      'Ajout d\'entreprises aux favoris',
      'Gestion de profil entreprise pour les propriétaires',
    ],
  };
  
  // Informations sur l'équipe
  const teamInfo = [
    {
      name: 'Marie Dupont',
      role: 'Fondatrice & CEO',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Thomas Martin',
      role: 'CTO',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Sophie Bernard',
      role: 'Responsable Design',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Lucas Petit',
      role: 'Développeur Principal',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
  ];
  
  // Liens externes
  const externalLinks = [
    {
      title: 'Site web',
      icon: 'globe-outline',
      url: 'https://businessbook-app.com',
    },
    {
      title: 'Facebook',
      icon: 'logo-facebook',
      url: 'https://facebook.com/businessbook',
    },
    {
      title: 'Twitter',
      icon: 'logo-twitter',
      url: 'https://twitter.com/businessbook',
    },
    {
      title: 'Instagram',
      icon: 'logo-instagram',
      url: 'https://instagram.com/businessbook',
    },
  ];
  
  // Ouvrir un lien externe
  const openLink = (url) => {
    Linking.openURL(url).catch(err => 
      console.error('Une erreur s\'est produite lors de l\'ouverture du lien:', err)
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>À propos</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo et nom de l'application */}
        <View style={styles.appHeader}>
          <Image 
            source={require('../assets/icon.png')} 
            style={styles.appLogo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>{appInfo.name}</Text>
          <Text style={styles.appVersion}>Version {appInfo.version}</Text>
        </View>
        
        {/* Description de l'application */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre mission</Text>
          <Text style={styles.descriptionText}>{appInfo.description}</Text>
        </View>
        
        {/* Fonctionnalités */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fonctionnalités</Text>
          {appInfo.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        {/* Notre équipe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre équipe</Text>
          <View style={styles.teamContainer}>
            {teamInfo.map((member, index) => (
              <View key={index} style={styles.teamMember}>
                <Image 
                  source={{ uri: member.photo }} 
                  style={styles.memberPhoto}
                />
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Nous suivre */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nous suivre</Text>
          {externalLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.linkItem}
              onPress={() => openLink(link.url)}
            >
              <Ionicons name={link.icon} size={24} color={COLORS.primary} />
              <Text style={styles.linkText}>{link.title}</Text>
              <Ionicons name="open-outline" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Informations légales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations légales</Text>
          
          <TouchableOpacity 
            style={styles.legalItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Text style={styles.legalText}>Politique de confidentialité</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.legalItem}
            onPress={() => navigation.navigate('TermsOfService')}
          >
            <Text style={styles.legalText}>Conditions d'utilisation</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.legalItem}
            onPress={() => navigation.navigate('Licenses')}
          >
            <Text style={styles.legalText}>Licences</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
        
        {/* Copyright */}
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>
            © 2025 BusinessBook. Tous droits réservés.
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  backButton: {
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    paddingBottom: SIZES.extraLarge,
  },
  appHeader: {
    alignItems: 'center',
    marginVertical: SIZES.large,
  },
  appLogo: {
    width: 100,
    height: 100,
    marginBottom: SIZES.medium,
  },
  appName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  appVersion: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: {
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.medium,
    borderRadius: SIZES.cardRadius,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: 'bold',
    color: COLORS.text,
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  descriptionText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
    padding: SIZES.medium,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  featureText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SIZES.small,
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: SIZES.medium,
  },
  teamMember: {
    alignItems: 'center',
    width: '45%',
    marginBottom: SIZES.large,
  },
  memberPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: SIZES.small,
  },
  memberName: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },
  memberRole: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  linkText: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SIZES.medium,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  legalText: {
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  copyright: {
    alignItems: 'center',
    marginVertical: SIZES.large,
  },
  copyrightText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default AboutScreen;