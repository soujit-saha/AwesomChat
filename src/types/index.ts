/**
 * Core type definitions for the chat application
 */

export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'failed';

export type SenderType = 'me' | 'other';

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: SenderType;
  status: MessageStatus;
  senderName?: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Theme {
  background: string;
  messageBackground: {
    me: string;
    other: string;
  };
  messageText: {
    me: string;
    other: string;
  };
  inputBackground: string;
  inputText: string;
  inputBorder: string;
  headerBackground: string;
  headerText: string;
  timestampText: string;
  placeHolder: string;
  statusText: string;
  sendButtonBackground: string;
  sendButtonText: string;
  offlineIndicator: string;
  onlineIndicator: string;
}

export type ThemeMode = 'light' | 'dark';
