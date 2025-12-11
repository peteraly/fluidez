import React from 'react';
import { colors, spacing, borderRadius } from '../styles/theme';

export const Card = ({ children, style = {}, onClick }) => (
  <div 
    style={{
      backgroundColor: colors.bgSecondary,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }} 
    onClick={onClick}
  >
    {children}
  </div>
);
