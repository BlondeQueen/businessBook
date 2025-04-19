// services/api.js
// Données fictives pour simuler une API

const companies = [
    {
      id: 1,
      name: 'Tech Solutions',
      logo: 'https://via.placeholder.com/100/2c3e50/ffffff?text=TS',
      coverImage: 'https://via.placeholder.com/500x200/3498db/ffffff?text=Tech+Solutions',
      category: 'Informatique',
      categoryId: 1,
      description: 'Entreprise spécialisée dans le développement de solutions informatiques sur mesure pour les PME. Nos services incluent le développement d\'applications, la maintenance de systèmes et le conseil en transformation digitale.',
      address: '15 rue de l\'Innovation, 75001 Paris',
      phone: '+33 1 23 45 67 89',
      email: 'contact@techsolutions.com',
      website: 'www.techsolutions.com',
      hours: 'Lun-Ven: 9h-18h',
      rating: 4.7,
      reviewCount: 124,
      reviews: [
        {
          name: 'Marie L.',
          date: '12/03/2023',
          rating: 5,
          comment: 'Excellente entreprise, très professionnelle. Le projet a été livré dans les délais et le résultat est à la hauteur de nos attentes.',
        },
        {
          name: 'Pierre D.',
          date: '28/02/2023',
          rating: 4,
          comment: 'Bonne expérience globale. Équipe réactive et à l\'écoute.',
        },
      ],
    },
    {
      id: 2,
      name: 'Green Garden',
      logo: 'https://via.placeholder.com/100/27ae60/ffffff?text=GG',
      coverImage: 'https://via.placeholder.com/500x200/2ecc71/ffffff?text=Green+Garden',
      category: 'Paysagisme',
      categoryId: 2,
      description: 'Service d\'aménagement paysager et d\'entretien d\'espaces verts pour particuliers et professionnels. Conception de jardins, installation et maintenance.',
      address: '8 avenue des Fleurs, 69002 Lyon',
      phone: '+33 4 56 78 90 12',
      email: 'info@greengarden.fr',
      website: 'www.greengarden.fr',
      hours: 'Lun-Sam: 8h-19h',
      rating: 4.2,
      reviewCount: 78,
      reviews: [
        {
          name: 'Sophie M.',
          date: '05/04/2023',
          rating: 5,
          comment: 'Service impeccable ! Notre jardin est magnifique.',
        },
      ],
    },
    {
      id: 3,
      name: 'Café Parisien',
    logo: 'https://via.placeholder.com/100/c0392b/ffffff?text=CP',
    coverImage: 'https://via.placeholder.com/500x200/e74c3c/ffffff?text=Café+Parisien',
    category: 'Restauration',
    categoryId: 3,
    description: 'Café traditionnel français proposant des petits-déjeuners, déjeuners et pâtisseries faites maison. Ambiance chaleureuse au cœur de Paris.',
    address: '42 rue Saint-Michel, 75006 Paris',
    phone: '+33 1 45 67 89 01',
    email: 'bonjour@cafeparisien.fr',
    website: 'www.cafeparisien.fr',
    hours: 'Tous les jours: 7h-22h',
    rating: 4.5,
    reviewCount: 203,
    reviews: [
      {
        name: 'Jean M.',
        date: '19/03/2023',
        rating: 5,
        comment: 'Excellent café, pâtisseries délicieuses et service attentif. Je recommande vivement !',
      },
      {
        name: 'Laura K.',
        date: '02/04/2023',
        rating: 4,
        comment: 'Très bon service et produits de qualité, mais un peu cher.',
      },
    ],
  },
  {
    id: 4,
    name: 'Design & Co',
    logo: 'https://via.placeholder.com/100/8e44ad/ffffff?text=D&C',
    coverImage: 'https://via.placeholder.com/500x200/9b59b6/ffffff?text=Design+%26+Co',
    category: 'Design',
    categoryId: 4,
    description: 'Studio de design d\'intérieur spécialisé dans la création d\'espaces modernes et fonctionnels. Nous proposons des services de conception, rénovation et décoration.',
    address: '27 boulevard des Arts, 33000 Bordeaux',
    phone: '+33 5 67 89 01 23',
    email: 'contact@designandco.com',
    website: 'www.designandco.com',
    hours: 'Lun-Ven: 10h-19h',
    rating: 4.8,
    reviewCount: 56,
    reviews: [
      {
        name: 'Claire B.',
        date: '27/02/2023',
        rating: 5,
        comment: 'Équipe talentueuse qui a transformé notre appartement. Résultat au-delà de nos espérances !',
      },
    ],
  },
  {
    id: 5,
    name: 'MediCenter',
    logo: 'https://via.placeholder.com/100/3498db/ffffff?text=MC',
    coverImage: 'https://via.placeholder.com/500x200/2980b9/ffffff?text=MediCenter',
    category: 'Santé',
    categoryId: 5,
    description: 'Centre médical pluridisciplinaire regroupant médecins généralistes et spécialistes. Consultations sur rendez-vous.',
    address: '10 rue de la Santé, 59000 Lille',
    phone: '+33 3 20 45 67 89',
    email: 'accueil@medicenter.fr',
    website: 'www.medicenter.fr',
    hours: 'Lun-Ven: 8h-20h, Sam: 9h-12h',
    rating: 4.3,
    reviewCount: 112,
    reviews: [
      {
        name: 'Thomas L.',
        date: '15/03/2023',
        rating: 4,
        comment: 'Personnel compétent et prise en charge rapide. Seul bémol : le temps d\'attente parfois long.',
      },
      {
        name: 'Emma R.',
        date: '08/04/2023',
        rating: 5,
        comment: 'Très satisfaite de ma consultation. Médecins à l\'écoute et professionnels.',
      },
    ],
  },
  {
    id: 6,
    name: 'Auto Express',
    logo: 'https://via.placeholder.com/100/f39c12/ffffff?text=AE',
    coverImage: 'https://via.placeholder.com/500x200/f1c40f/ffffff?text=Auto+Express',
    category: 'Automobile',
    categoryId: 6,
    description: 'Garage automobile proposant des services de réparation, entretien et vente de véhicules neufs et d\'occasion. Équipe de mécaniciens qualifiés.',
    address: '55 avenue des Voitures, 31000 Toulouse',
    phone: '+33 5 61 23 45 67',
    email: 'service@autoexpress.fr',
    website: 'www.autoexpress.fr',
    hours: 'Lun-Ven: 8h30-18h30, Sam: 9h-16h',
    rating: 4.0,
    reviewCount: 87,
    reviews: [
      {
        name: 'Nicolas D.',
        date: '02/03/2023',
        rating: 4,
        comment: 'Service rapide et efficace. Prix raisonnables.',
      },
    ],
  },
];

const categories = [
  { id: 1, name: 'Informatique' },
  { id: 2, name: 'Paysagisme' },
  { id: 3, name: 'Restauration' },
  { id: 4, name: 'Design' },
  { id: 5, name: 'Santé' },
  { id: 6, name: 'Automobile' },
  { id: 7, name: 'Éducation' },
  { id: 8, name: 'Finance' },
];

// Simuler des appels API asynchrones
export const getCompanies = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(companies);
    }, 1000);
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 800);
  });
};

export const getCompanyById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const company = companies.find(c => c.id === id);
      if (company) {
        resolve(company);
      } else {
        reject(new Error('Company not found'));
      }
    }, 1000);
  });
};

export const searchCompanies = (query, categoryIds = []) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...companies];
      
      if (query) {
        const lowerCaseQuery = query.toLowerCase();
        results = results.filter(
          company => 
            company.name.toLowerCase().includes(lowerCaseQuery) ||
            company.description.toLowerCase().includes(lowerCaseQuery) ||
            company.category.toLowerCase().includes(lowerCaseQuery)
        );
      }
      
      if (categoryIds.length > 0) {
        results = results.filter(company => 
          categoryIds.includes(company.categoryId)
        );
      }
      
      resolve(results);
    }, 1500);
  });
};