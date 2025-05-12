import { TextStyle, ViewStyle } from 'react-native';

export const colors = {
  primary: '#60A5FA',
  primaryDark: '#3B82F6',
  primaryLight: '#93C5FD',
  
  success: '#16A34A',
  warning: '#EAB308',
  error: '#EF4444',
  
  background: '#F8FAFC',
  surface: '#FFFFFF',
  
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    onPrimary: '#FFFFFF',
    onSuccess: '#FFFFFF',
    onError: '#FFFFFF',
  },
  
  border: {
    light: '#E2E8F0',
    medium: '#CBD5E1',
  }
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
};

export const shadows: Record<string, ViewStyle> = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
}; 