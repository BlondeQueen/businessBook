Business Book - Annuaire d'Entreprises Mobile
Business Book est une application mobile d'annuaire d'entreprises développée avec React Native et Expo. Elle permet aux utilisateurs de rechercher, consulter et interagir avec des entreprises à travers une interface intuitive et réactive.
Fonctionnalités

📱 Interface utilisateur élégante et moderne
🔍 Recherche avancée avec filtres par catégorie
⭐ Système d'évaluation et d'avis
❤️ Gestion des favoris
👤 Profil utilisateur personnalisable
🏢 Fiches détaillées des entreprises
📍 Informations de contact complètes

Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine:

Node.js (version 14 ou plus récente)
npm ou yarn
Expo CLI

Installation

Clonez ce dépôt sur votre machine locale:

bashgit clone https://github.com/BlondeQueen/businessBook.git
cd businessBook

Installez les dépendances:

bashnpm install
# ou
yarn install


Exécution de l'application
Pour lancer l'application en mode développement:
bashnpx expo start
Cette commande démarre le serveur de développement Expo et affiche un QR code dans votre terminal.
Options pour exécuter l'application:

Sur un appareil physique:

Téléchargez l'application Expo Go sur votre smartphone (Android ou iOS)
Scannez le QR code avec l'application Expo Go (Android) ou l'appareil photo (iOS)


Sur un émulateur Android:

Assurez-vous que l'émulateur Android est en cours d'exécution
Appuyez sur a dans le terminal où Expo est en cours d'exécution


Sur un simulateur iOS (macOS uniquement):

Assurez-vous que Xcode et le simulateur iOS sont installés
Appuyez sur i dans le terminal où Expo est en cours d'exécution



Compilation pour la production
Pour Android:

Configurez votre compte Expo et connectez-vous:

bashnpx expo login

Créez une build pour Android:

bashnpx expo build:android

Choisissez le type de build (APK ou App Bundle)

Pour iOS (nécessite un compte Apple Developer):

Configurez votre compte Expo et connectez-vous:

bashnpx expo login

Créez une build pour iOS:

bashnpx expo build:ios

Suivez les instructions pour configurer les certificats nécessaires

Personnalisation
Thème
Le thème global de l'application peut être modifié dans le fichier styles/theme.js. Vous pouvez ajuster:

Les couleurs principales
Les tailles de texte
Les dimensions des espaces
Les styles de shadow

Données
Actuellement, l'application utilise des données fictives définies dans services/api.js. Pour connecter l'application à une vraie API:

Modifiez les fonctions dans services/api.js pour faire des appels API réels
Ajustez les modèles de données si nécessaire

Technologies utilisées

React Native
Expo
React Navigation
React Native Vector Icons
AsyncStorage

Contribution

Forkez le projet
Créez votre branche de fonctionnalité (git checkout -b feature/amazing-feature)
Committez vos changements (git commit -m 'Add some amazing feature')
Poussez vers la branche (git push origin feature/amazing-feature)
Ouvrez une Pull Request

Licence
Distribué sous la licence MIT. Voir LICENSE pour plus d'informations.
Contact
Danga Patchoum - blondedanga@gmail.com
