/**
 * Theme configuration for light and dark modes
 */

import { Theme } from '../types';

export const lightTheme: Theme = {
  background: '#F5F5F5',
  messageBackground: {
    me: '#007AFF',
    other: '#c3c3c3ff',
  },
  messageText: {
    me: '#FFFFFF',
    other: '#000000',
  },
  inputBackground: '#FFFFFF',
  inputText: '#000000',
  inputBorder: '#D1D1D6',
  headerBackground: '#007AFF',
  headerText: '#FFFFFF',
  timestampText: '#ffffff',
  placeHolder: '#5c5858ff',
  statusText: '#fcfcfcff',
  sendButtonBackground: '#007AFF',
  sendButtonText: '#FFFFFF',
  offlineIndicator: '#FF3B30',
  onlineIndicator: '#34C759',
};

export const darkTheme: Theme = {
  background: '#000000',
  messageBackground: {
    me: '#0A84FF',
    other: '#2C2C2E',
  },
  messageText: {
    me: '#FFFFFF',
    other: '#FFFFFF',
  },
  inputBackground: '#1C1C1E',
  inputText: '#FFFFFF',
  inputBorder: '#38383A',
  headerBackground: '#1C1C1E',
  headerText: '#FFFFFF',
  timestampText: '#FFFFFF',
  placeHolder: '#FFFFFF',
  statusText: '#8E8E93',
  sendButtonBackground: '#0A84FF',
  sendButtonText: '#200606ff',
  offlineIndicator: '#FF453A',
  onlineIndicator: '#32D74B',
};

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
