import React from 'react';
import { colors, borderRadius } from '../styles/theme';

export const ProgressBar = ({ progress }) => (
  <div style={{ 
    width: '100%', 
    height: 6, 
    backgroundColor: colors.border, 
    borderRadius: borderRadius.sm, 
    overflow: 'hidden' 
  }}>
    <div style={{ 
      width: `${Math.min(100, Math.max(0, progress))}%`, 
      height: '100%', 
      backgroundColor: colors.accent, 
      borderRadius: borderRadius.sm, 
      transition: 'width 0.5s' 
    }} />
  </div>
);
