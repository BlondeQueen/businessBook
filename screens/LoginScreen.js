// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fonction onLogin passée en paramètre
  const { onLogin } = route.params || {};

  const handleLogin = () => {
    setIsLoading(true);
    
    // Simulation d'authentification
    setTimeout(() => {
      setIsLoading(false);
      
      // Déterminer le type d'utilisateur (dans une vraie app, cela viendrait du backend)
      if (email === 'admin@example.com') {
        onLogin && onLogin('admin');
        navigation.replace('Main');
      } else if (email && password) {
        onLogin && onLogin('customer');
        navigation.replace('Main');
      } else {
        // Afficher une erreur (dans une vraie app)
        alert('Veuillez entrer un email et un mot de passe valides');
      }
    }, 1500);
  };

  const handleVisitorAccess = () => {
    onLogin && onLogin('visitor');
    navigation.replace('Main');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo-placeholder.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>Business Book</Text>
            <Text style={styles.appSubtitle}>Votre annuaire d'entreprises</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.button, 
                styles.loginButton,
                (!email || !password) && styles.disabledButton,
                isLoading && styles.loadingButton
              ]}
              onPress={handleLogin}
              disabled={!email || !password || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.card} />
              ) : (
                <Text style={styles.buttonText}>Se connecter</Text>
              )}
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OU</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity 
              style={[styles.button, styles.visitorButton]}
              onPress={handleVisitorAccess}
            >
              <Text style={styles.visitorButtonText}>Continuer en tant que visiteur</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Vous n'avez pas de compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.large,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.extraLarge,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SIZES.medium,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.small,
  },
  appSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  formContainer: {
    marginBottom: SIZES.extraLarge,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    height: 50,
    ...SHADOWS.small,
  },
  inputIcon: {
    marginRight: SIZES.small,
  },
  input: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.large,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: SIZES.body,
  },
  button: {
    height: 50,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.7,
  },
  loadingButton: {
    backgroundColor: COLORS.primary,
    opacity: 0.8,
  },
  buttonText: {
    color: COLORS.card,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.large,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  orText: {
    marginHorizontal: SIZES.medium,
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
  },
  visitorButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  visitorButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    marginRight: SIZES.small,
  },
  registerText: {
    color: COLORS.primary,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
});

export default LoginScreen;