import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const HelpSupportScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Liste des FAQ
  const faqs = [
    {
      id: 1,
      question: 'Comment ajouter une entreprise ?',
      answer: 'Pour ajouter une entreprise, allez sur votre profil, puis cliquez sur le bouton "Ajouter une entreprise". Remplissez le formulaire avec les informations requises et soumettez-le. Votre entreprise sera ajoutée après validation.',
    },
    {
      id: 2,
      question: 'Comment modifier mes informations personnelles ?',
      answer: 'Accédez à votre profil en cliquant sur l\'onglet "Profil", puis sélectionnez "Modifier le profil". Vous pourrez alors mettre à jour vos informations personnelles comme votre nom, votre email, et votre photo de profil.',
    },
    {
      id: 3,
      question: 'Comment contacter le support technique ?',
      answer: 'Vous pouvez contacter notre équipe de support technique par email à support@businessbook.com ou en utilisant le formulaire de contact disponible sur cette page. Nous répondons généralement sous 24 heures ouvrables.',
    },
    {
      id: 4,
      question: 'Comment supprimer mon compte ?',
      answer: 'Pour supprimer votre compte, allez dans Paramètres > Confidentialité > Supprimer le compte. Veuillez noter que cette action est irréversible et toutes vos données seront définitivement perdues.',
    },
    {
      id: 5,
      question: 'Comment signaler un problème avec une entreprise ?',
      answer: 'Si vous rencontrez un problème avec une entreprise listée, visitez la page de l\'entreprise et cliquez sur le bouton "Signaler" en bas de la page. Décrivez le problème en détail pour que nous puissions prendre les mesures appropriées.',
    },
  ];
  
  // Contacts du support
  const supportContacts = [
    {
      icon: 'mail-outline',
      title: 'Email',
      description: 'support@businessbook.com',
      action: () => Linking.openURL('mailto:support@businessbook.com'),
    },
    {
      icon: 'call-outline',
      title: 'Téléphone',
      description: '+33 1 23 45 67 89',
      action: () => Linking.openURL('tel:+33123456789'),
    },
    {
      icon: 'chatbubble-outline',
      title: 'Chat en direct',
      description: 'Discutez avec un conseiller',
      action: () => Alert.alert('Chat en direct', 'Cette fonctionnalité sera disponible prochainement.'),
    },
  ];
  
  // Filtrer les FAQs en fonction de la recherche
  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
  
  // Gérer l'expansion/réduction des FAQs
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  // Fonction pour envoyer un message au support
  const sendSupportMessage = () => {
    Alert.alert(
      'Message envoyé',
      'Nous avons bien reçu votre message. Notre équipe vous répondra dans les plus brefs délais.',
      [{ text: 'OK' }]
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
        <Text style={styles.title}>Aide et Soutien</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher dans l'aide..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textSecondary}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqItem}
                onPress={() => toggleFaq(faq.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons
                    name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={COLORS.textSecondary}
                  />
                </View>
                
                {expandedFaq === faq.id && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>
              Aucun résultat trouvé pour "{searchQuery}"
            </Text>
          )}
        </View>
        
        {/* Contacter le support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacter le support</Text>
          
          {supportContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactItem}
              onPress={contact.action}
            >
              <Ionicons name={contact.icon} size={24} color={COLORS.primary} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{contact.title}</Text>
                <Text style={styles.contactDescription}>{contact.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Formulaire de contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Envoyez-nous un message</Text>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Sujet</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Ex: Problème technique, Question sur mon compte..."
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Message</Text>
            <TextInput
              style={[styles.formInput, styles.formTextarea]}
              placeholder="Décrivez votre problème ou votre question en détail..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={sendSupportMessage}
          >
            <Text style={styles.submitButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
        
        {/* Guides et tutoriels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guides et tutoriels</Text>
          
          <TouchableOpacity 
            style={styles.guideItem}
            onPress={() => navigation.navigate('Guide', { id: 1 })}
          >
            <Ionicons name="document-text-outline" size={24} color={COLORS.primary} />
            <Text style={styles.guideTitle}>Guide de démarrage</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.guideItem}
            onPress={() => navigation.navigate('Guide', { id: 2 })}
          >
            <Ionicons name="business-outline" size={24} color={COLORS.primary} />
            <Text style={styles.guideTitle}>Gérer vos entreprises</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.guideItem}
            onPress={() => navigation.navigate('Guide', { id: 3 })}
          >
            <Ionicons name="shield-checkmark-outline" size={24} color={COLORS.primary} />
            <Text style={styles.guideTitle}>Sécurité et confidentialité</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.small,
    fontSize: SIZES.body,
    color: COLORS.text,
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
  faqItem: {
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.text,
    flex: 1,
  },
  faqAnswer: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.small,
    lineHeight: 22,
  },
  noResultsText: {
    padding: SIZES.medium,
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  contactInfo: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  contactTitle: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.text,
  },
  contactDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  formField: {
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.medium,
  },
  formLabel: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  formInput: {
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  formTextarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.large,
    marginBottom: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.card,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  guideTitle: {
    flex: 1,
    marginLeft: SIZES.medium,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
});

export default HelpSupportScreen;