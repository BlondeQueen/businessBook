// services/models.js
// Enumérations
export const DomainName = {
    LLC: 'LLC',
    INSURANCE: 'INSURANCE',
    CREDITS: 'CREDITS'
  };
  
  export const Type = {
    LLC: 'LLC',
    INSURANCE: 'INSURANCE',
    CREDITS: 'CREDITS'
  };
  
  export const Status = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    PENDING: 'PENDING'
  };
  
  // Modèles
  export class Enterprise {
    constructor() {
      this.id = null; // uuid
      this.longName = ''; // string
      this.shortName = ''; // string
      this.logoUrl = ''; // string
      this.isIndividualBusiness = false; // boolean
      this.description = ''; // string
      this.type = Type.LLC; // Type
      this.isActive = true; // boolean
      this.websiteUrl = ''; // string
      this.socialNetwork = ''; // string
      this.businessRegistrationNumber = ''; // string
      this.taxNumber = ''; // string
      this.capitalShare = 0.0; // double
      this.registrationDate = new Date(); // Date
      this.ceoName = ''; // string
      this.yearFounded = new Date(); // Date
      this.keywords = []; // string[0..*]
      this.status = Status.ACTIVE; // Status
      this.businessDomains = []; // Domain[0..*]
      this.orgContact = ''; // string
      this.email = ''; // string
      this.numberOfEmployees = 0; // int
      this.businessActorId = null; // uuid
    }
  }
  
  export class Customer {
    constructor() {
      this.id = null; // uuid
      this.email = ''; // string
      this.username = ''; // string
      this.password = ''; // string
      this.tel = ''; // string
    }
  
    createEnterprise() {
      // Implémentation de la création d'entreprise
    }
    
    deleteEnterprise() {
      // Implémentation de la suppression d'entreprise
    }
  }
  
  export class SuperAdmin extends Customer {
    constructor() {
      super();
      this.id = null; // uuid
    }
  
    hinderEnterprise(enterpriseId) {
      // Implémentation pour bloquer une entreprise
    }
  
    hinderCustomer(customerId) {
      // Implémentation pour bloquer un client
    }
  
    getAllTrafics() {
      // Implémentation pour obtenir toutes les statistiques de trafic
    }
  }
  
  export class Visitor {
    constructor() {
      this.id = null; // uuid
    }
  
    search() {
      // Implémentation de la recherche
    }
  
    subscribe() {
      // Implémentation de l'abonnement
    }
  
    contactEnterprise(contact) {
      // Implémentation pour contacter une entreprise
    }
  }
  
  export class Review {
    constructor() {
      this.id = null; // uuid
      this.content = ''; // string
    }
    
    deleteEnterprise() {
      // Implémentation pour supprimer une entreprise
    }
  }
  
  export class ReviewNote {
    constructor() {
      this.id = null; // uuid
      this.note = 0; // integer
    }
    
    deleteEnterprise() {
      // Implémentation pour supprimer une entreprise
    }
  }
  
  export class Domain {
    constructor() {
      this.id = null; // uuid
      this.domainName = DomainName.LLC; // DomainName
      this.description = ''; // string
    }
  }