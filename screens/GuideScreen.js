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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const GuideScreen = ({ route, navigation }) => {
  const { id } = route.params;
  
  // Données des guides (dans une application réelle, ces données viendraient d'une API)
  const guides = {
    1: {
      title: 'Guide de démarrage',
      content: [
        {
          type: 'heading',
          text: 'Bienvenue sur Business Book',
        },
        {
          type: 'paragraph',
          text: 'Découvrez comment utiliser toutes les fonctionnalités de notre application pour gérer et trouver des entreprises facilement.',
        },
        {
          type: 'subheading',
          text: 'Créer un compte',
        },
        {
          type: 'paragraph',
          text: 'Pour profiter de toutes les fonctionnalités, commencez par créer un compte en utilisant votre email ou en vous connectant avec Google ou Facebook.',
        },
        {
          type: 'subheading',
          text: 'Découvrir des entreprises',
        },
        {
          type: 'paragraph',
          text: 'Utilisez la barre de recherche pour trouver des entreprises par nom, catégorie ou emplacement. Explorez également nos suggestions sur la page d\'accueil.',
        },
        {
          type: 'subheading',
          text: 'Sauvegarder vos favoris',
        },
        {
          type: 'paragraph',
          text: 'Cliquez sur l\'icône en forme de cœur pour ajouter une entreprise à vos favoris et y accéder facilement plus tard.',
        },
      ],
    },
    2: {
      title: 'Gérer vos entreprises',
      content: [
        {
          type: 'heading',
          text: 'Comment gérer vos entreprises',
        },
        {
          type: 'paragraph',
          text: 'En tant que propriétaire d\'entreprise, vous pouvez ajouter, modifier et gérer vos entreprises directement depuis votre profil.',
        },
        {
          type: 'subheading',
          text: 'Ajouter une nouvelle entreprise',
        },
        {
          type: 'paragraph',
          text: 'Depuis votre profil, accédez à la section "Mes entreprises" et cliquez sur "Ajouter une entreprise". Remplissez le formulaire avec toutes les informations pertinentes.',
        },
        {
          type: 'subheading',
          text: 'Mettre à jour les informations',
        },
        {
          type: 'paragraph',
          text: 'Sélectionnez une entreprise dans votre liste et utilisez le bouton "Modifier" pour mettre à jour les détails comme l\'adresse, les heures d\'ouverture ou les services offerts.',
        },
        {
          type: 'subheading',
          text: 'Analyser les performances',
        },
        {
          type: 'paragraph',
          text: 'Consultez les statistiques de visite, les avis et l\'engagement des utilisateurs pour améliorer votre visibilité.',
        },
      ],
    },
    3: {
      title: 'Sécurité et confidentialité',
      content: [
        {
          type: 'heading',
          text: 'Protéger vos données',
        },
        {
          type: 'paragraph',
          text: 'Nous prenons la sécurité et la confidentialité de vos données très au sérieux. Voici comment vous pouvez renforcer la protection de votre compte.',
        },
        {
          type: 'subheading',
          text: 'Mot de passe sécurisé',
        },
        {
          type: 'paragraph',
          text: 'Utilisez un mot de passe fort combinant lettres, chiffres et caractères spéciaux. Changez-le régulièrement pour une sécurité optimale.',
        },
        {
          type: 'subheading',
          text: 'Authentification à deux facteurs',
        },
        {
          type: 'paragraph',
          text: 'Activez l\'authentification à deux facteurs dans les paramètres de sécurité pour ajouter une couche de protection supplémentaire.',
        },
        {
          type: 'subheading',
          text: 'Contrôle de vos données',
        },
        {
          type: 'paragraph',
          text: 'Gérez quelles informations sont visibles publiquement et quelles données sont partagées avec notre plateforme dans les paramètres de confidentialité.',
        },
      ],
    },
  };
  
  const guide = guides[id] || {
    title: 'Guide non trouvé',
    content: [
      {
        type: 'paragraph',
        text: 'Désolé, ce guide n\'est pas disponible actuellement.',
      },
    ],
  };
  
  // Rendu des différents types de contenu
  const renderContent = (item, index) => {
    switch (item.type) {
      case 'heading':
        return <Text key={index} style={styles.heading}>{item.text}</Text>;
      case 'subheading':
        return <Text key={index} style={styles.subheading}>{item.text}</Text>;
      case 'paragraph':
        return <Text key={index} style={styles.paragraph}>{item.text}</Text>;
      case 'image':
        return (
          <Image
            key={index}
            source={{ uri: item.url }}
            style={styles.image}
            resizeMode="cover"
          />
        );
      default:
        return null;
    }
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
        <Text style={styles.title}>{guide.title}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          {guide.content.map((item, index) => renderContent(item, index))}
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
  contentContainer: {
    backgroundColor: COLORS.card,
    margin: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: SIZES.cardRadius,
    ...SHADOWS.small,
  },
  heading: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  subheading: {
    fontSize: SIZES.subtitle,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SIZES.medium,
    marginBottom: SIZES.small,
  },
  paragraph: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SIZES.medium,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.small,
    marginVertical: SIZES.medium,
  },
});

export default GuideScreen;