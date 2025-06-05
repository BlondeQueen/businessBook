import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddCompanyForm = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  const handleAddCompany = () => {
    if (!companyName || !companyLogo) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    // Logique pour ajouter l'entreprise (API ou stockage local)
    console.log('Nouvelle entreprise ajoutée:', { companyName, companyLogo });
    Alert.alert('Succès', 'Entreprise ajoutée avec succès.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom de l'entreprise</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le nom de l'entreprise"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <Text style={styles.label}>Logo de l'entreprise (URL)</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez l'URL du logo"
        value={companyLogo}
        onChangeText={setCompanyLogo}
      />
      <Button title="Ajouter l'entreprise" onPress={handleAddCompany} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
});

export default AddCompanyForm;