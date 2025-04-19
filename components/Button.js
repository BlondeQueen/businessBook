// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', 
  disabled = false,
  loading = false,
  style = {} 
}) => {
  const buttonStyles = [
    styles.button,
    type === 'primary' && styles.primaryButton,
    type === 'secondary' && styles.secondaryButton,
    type === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style
  ];

  const textStyles = [
    styles.text,
    type === 'outline' && styles.outlineText,
    disabled && styles.disabledText
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? COLORS.primary : COLORS.card} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.textSecondary,
  },
  text: {
    color: COLORS.card,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  outlineText: {
    color: COLORS.primary,
  },
  disabledText: {
    color: COLORS.card,
  },
});

export default Button;