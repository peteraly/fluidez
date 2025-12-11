import React from 'react';
import { colors, spacing, borderRadius } from '../styles/theme';

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  fullWidth = false,
  style = {} 
}) => {
  const baseStyle = {
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderRadius: borderRadius.md,
    fontSize: 16,
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.2s',
    opacity: disabled ? 0.5 : 1,
    ...style
  };
  
  const variants = {
    primary: { backgroundColor: colors.accent, color: 'white' },
    secondary: { backgroundColor: 'transparent', color: colors.accent, border: `2px solid ${colors.accent}` },
    success: { backgroundColor: colors.success, color: 'white' },
    warning: { backgroundColor: colors.warning, color: 'white' },
  };
  
  return (
    <button 
      style={{ ...baseStyle, ...variants[variant] }} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};
