/**
 * ChatHeader Component
 * Header with title and online/offline toggle
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';
import { StatusIndicator } from '../StatusIndicator';

interface ChatHeaderProps {
  title: string;
  isOnline: boolean;
  onToggleOnline: () => void;
  pendingCount?: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  isOnline,
  onToggleOnline,
  pendingCount = 0,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.headerBackground }]}
    >
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: theme.headerText }]}>{title}</Text>
        <View style={styles.actions}>
          {pendingCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pendingCount}</Text>
            </View>
          )}
        </View>
      </View>

      <StatusIndicator
        status={isOnline ? 'online' : 'offline'}
        showToggle={true}
        onToggle={onToggleOnline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
