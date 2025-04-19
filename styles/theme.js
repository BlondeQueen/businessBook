// styles/theme.js
export const COLORS = {
    primary: '#2c3e50',       // Bleu nuit profond
    secondary: '#3498db',     // Bleu clair
    accent: '#1abc9c',        // Turquoise
    
    background: '#f5f7fa',
    card: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    
    success: '#2ecc71',
    warning: '#f1c40f',
    error: '#e74c3c',
    
    border: '#ecf0f1',
    shadow: 'rgba(0, 0, 0, 0.1)',
  };
  
  export const SIZES = {
    base: 8,
    small: 12,
    medium: 16,
    large: 24,
    extraLarge: 32,
    
    title: 22,
    subtitle: 18,
    body: 14,
    caption: 12,
    
    borderRadius: 12,
    cardRadius: 16,
  };
  
  export const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 5,
    },
  };
  
  export default { COLORS, SIZES, SHADOWS };