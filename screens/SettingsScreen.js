import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const SettingsScreen = ({ navigation }) => {
  // États pour les différentes options de paramètres
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);
  const [language, setLanguage] = useState('Français');
  
  // Liste des paramètres généraux
  const generalSettings = [
    {
      title: 'Langue',
      value: language,
      icon: 'language-outline',
      onPress: () => navigation.navigate('LanguageSelector'),
    },
    {
      title: 'Connexion automatique',
      icon: 'log-in-outline',
      isSwitch: true,
      value: autoLogin,
      onValueChange: setAutoLogin,
    },
    {
      title: 'Mode sombre',
      icon: 'moon-outline',
      isSwitch: true,
      value: darkMode,
      onValueChange: setDarkMode,
    },
    {
        title: 'Aide et soutien',
        icon: 'help-circle-outline',
        onPress: () => navigation.navigate('HelpSupport'),
    },
    {
        title: 'À propos de BusinessBook',
        icon: 'information-circle-outline',
        onPress: () => navigation.navigate('About'),
    },
  ];
  
  // Liste des paramètres de notification
  const notificationSettings = [
    {
      title: 'Notifications push',
      icon: 'notifications-outline',
      isSwitch: true,
      value: pushNotifications,
      onValueChange: setPushNotifications,
    },
    {
      title: 'Notifications par email',
      icon: 'mail-outline',
      isSwitch: true,
      value: emailNotifications,
      onValueChange: setEmailNotifications,
    },
  ];
  
  // Liste des paramètres de confidentialité
  const privacySettings = [
    {
      title: 'Politique de confidentialité',
      icon: 'document-text-outline',
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      title: 'Conditions d\'utilisation',
      icon: 'document-outline',
      onPress: () => navigation.navigate('TermsOfService'),
    },
    {
      title: 'Supprimer le compte',
      icon: 'trash-outline',
      onPress: () => {
        // Afficher une confirmation avant de supprimer le compte
        Alert.alert(
          'Supprimer le compte',
          'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
          [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Supprimer', style: 'destructive', onPress: () => console.log('Compte supprimé') },
          ]
        );
      },
      textColor: COLORS.error,
    },
  ];
  
  // Rendu d'une section de paramètres
  const renderSettingSection = (title, settings) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {settings.map((setting, index) => (
        <View 
          key={index}
          style={[
            styles.settingItem, 
            index === settings.length - 1 && { borderBottomWidth: 0 }
          ]}
        >
          <TouchableOpacity
            style={styles.settingInfo}
            onPress={setting.isSwitch ? undefined : setting.onPress}
          >
            <Ionicons 
              name={setting.icon} 
              size={22} 
              color={setting.textColor || COLORS.text} 
            />
            <Text 
              style={[
                styles.settingText, 
                setting.textColor && { color: setting.textColor }
              ]}
            >
              {setting.title}
            </Text>
          </TouchableOpacity>
          
          {setting.isSwitch ? (
            <Switch
              value={setting.value}
              onValueChange={setting.onValueChange}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.card}
            />
          ) : (
            setting.value ? (
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{setting.value}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
              </View>
            ) : (
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            )
          )}
        </View>
      ))}
    </View>
  );
  
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
        <Text style={styles.title}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSettingSection('Général', generalSettings)}
        {renderSettingSection('Notifications', notificationSettings)}
        {renderSettingSection('Confidentialité', privacySettings)}
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  section: {
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.medium,
    backgroundColor: COLORS.card,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SIZES.medium,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginRight: SIZES.small,
  },
  versionContainer: {
    alignItems: 'center',
    padding: SIZES.large,
  },
  versionText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
});

export default SettingsScreen;