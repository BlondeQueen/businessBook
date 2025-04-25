// services/api.js
import { Enterprise, Customer, Visitor, Review, ReviewNote, Domain, Type, Status, DomainName } from './models';

// Données fictives basées sur le modèle de données
const domains = [
  { id: '1', domainName: DomainName.LLC, description: 'Limited Liability Company' },
  { id: '2', domainName: DomainName.INSURANCE, description: 'Insurance Services' },
  { id: '3', domainName: DomainName.CREDITS, description: 'Credit Services' },
];

const enterprises = [
  {
    id: '1',
    longName: 'Tech Solutions LLC',
    shortName: 'TechSol',
    logoUrl: 'https://via.placeholder.com/100/2c3e50/ffffff?text=TS',
    isIndividualBusiness: false,
    description: 'Entreprise spécialisée dans le développement de solutions informatiques sur mesure pour les PME.',
    type: Type.LLC,
    isActive: true,
    websiteUrl: 'www.techsolutions.com',
    socialNetwork: 'linkedin.com/company/techsolutions',
    businessRegistrationNumber: 'RCS123456789',
    taxNumber: 'FR123456789',
    capitalShare: 50000.0,
    registrationDate: new Date('2018-03-15'),
    ceoName: 'Jean Dupont',
    yearFounded: new Date('2018-01-01'),
    keywords: ['tech', 'software', 'development', 'IT'],
    status: Status.ACTIVE,
    businessDomains: [domains[0]],
    orgContact: '+33 1 23 45 67 89',
    email: 'contact@techsolutions.com',
    numberOfEmployees: 25,
    businessActorId: '101'
  },
  // Ajoutez d'autres entreprises suivant le même modèle
];

const customers = [
  {
    id: '1',
    email: 'jean.dupont@example.com',
    username: 'jean.dupont',
    password: 'password123',
    tel: '+33 6 12 34 56 78'
  }
];

const visitors = [
  {
    id: '1'
  }
];

const reviews = [
  {
    id: '1',
    content: 'Excellente entreprise, très professionnelle.'
  }
];

const reviewNotes = [
  {
    id: '1',
    note: 5
  }
];

// Fonctions API simulées
export const getEnterprises = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enterprises);
    }, 1000);
  });
};

export const getEnterpriseById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const enterprise = enterprises.find(e => e.id === id);
      if (enterprise) {
        resolve(enterprise);
      } else {
        reject(new Error('Enterprise not found'));
      }
    }, 1000);
  });
};

export const getDomains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(domains);
    }, 800);
  });
};

export const searchEnterprises = (query, domainIds = []) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...enterprises];
      
      if (query) {
        const lowerCaseQuery = query.toLowerCase();
        results = results.filter(
          enterprise => 
            enterprise.longName.toLowerCase().includes(lowerCaseQuery) ||
            enterprise.description.toLowerCase().includes(lowerCaseQuery) ||
            enterprise.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
        );
      }
      
      if (domainIds.length > 0) {
        results = results.filter(enterprise => 
          enterprise.businessDomains.some(domain => domainIds.includes(domain.id))
        );
      }
      
      resolve(results);
    }, 1500);
  });
};

export const createEnterprise = (enterpriseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEnterprise = {
        ...new Enterprise(),
        ...enterpriseData,
        id: (enterprises.length + 1).toString(),
        registrationDate: new Date(),
      };
      enterprises.push(newEnterprise);
      resolve(newEnterprise);
    }, 1000);
  });
};

export const deleteEnterprise = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = enterprises.findIndex(e => e.id === id);
      if (index !== -1) {
        enterprises.splice(index, 1);
        resolve({ success: true });
      } else {
        reject(new Error('Enterprise not found'));
      }
    }, 1000);
  });
};

export const hinderEnterprise = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const enterprise = enterprises.find(e => e.id === id);
      if (enterprise) {
        enterprise.isActive = false;
        enterprise.status = Status.INACTIVE;
        resolve(enterprise);
      } else {
        reject(new Error('Enterprise not found'));
      }
    }, 1000);
  });
};

export const getAllTrafics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simuler des données de trafic
      resolve({
        totalVisits: 12450,
        uniqueVisitors: 5230,
        pagesPerVisit: 3.2,
        searchCount: 8750,
        enterpriseViews: 15600
      });
    }, 1000);
  });
};