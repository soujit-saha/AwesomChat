/**
 * MessageInput Component
 * Reusable input field with send button
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks';

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
}) => {
  const [text, setText] = useState('');
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.inputBackground,
          borderTopColor: theme.inputBorder,
          paddingBottom: insets.bottom ?? 0,
        },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: theme.inputText,
            borderColor: theme.inputBorder,
          },
        ]}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={theme.placeHolder}
        multiline
        maxLength={500}
        editable={!disabled}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          {
            backgroundColor: theme.sendButtonBackground,
          },
          (!text.trim() || disabled) && styles.sendButtonDisabled,
        ]}
        onPress={handleSend}
        disabled={!text.trim() || disabled}
        accessibilityLabel="Send message"
      >
        <Text style={[styles.sendButtonText, { color: theme.sendButtonText }]}>
          Send ➤
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'flex-end',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
