/**
 * ChatScreen - Main chat interface
 * Displays messages in a FlatList with input at the bottom
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useMessages, useTheme } from '../hooks';
import { MessageBubble, MessageInput, ChatHeader } from '../components';
import { Message } from '../types';
import { mockMessageService } from '../services/MockMessageService';

export const ChatScreen: React.FC = () => {
  const {
    messages,
    isOnline,
    sendMessage,
    toggleOnlineStatus,
    getPendingCount,
  } = useMessages();
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList<Message>>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Simulate bot response for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length === 0) {
        mockMessageService.simulateIncomingMessage(
          'Hey! Welcome to AwesomChat! 👋',
          'Soujit Saha',
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [messages.length]);

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  const keyExtractor = (item: Message) => item.id;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ChatHeader
        title="AwesomChat"
        isOnline={isOnline}
        onToggleOnline={toggleOnlineStatus}
        pendingCount={getPendingCount()}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 56 : 10}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === 'ios' ? 'interactive' : 'on-drag'
          }
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
        />

        <MessageInput onSend={sendMessage} disabled={false} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  messageList: {
    paddingVertical: 8,
    flexGrow: 1,
  },
});
