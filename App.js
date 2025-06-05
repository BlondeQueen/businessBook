// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

// Import des contextes si nécessaire
import { BusinessProvider } from './contexts/BusinessContext';

// Import du thème
import { COLORS } from './styles/theme';

// Configuration principale de l'application
export default function App() {
  // État utilisateur simulé (dans une application réelle, cela viendrait d'un système d'authentification)
  const [userType, setUserType] = useState('visitor'); // 'visitor', 'customer', 'admin'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement initial
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Simuler la connexion d'un utilisateur
  const handleLogin = (type) => {
    setUserType(type);
  };

  return (
    <BusinessProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <AppNavigator 
        userType={userType} 
        isLoading={isLoading} 
        handleLogin={handleLogin} 
      />
    </BusinessProvider>
  );
}