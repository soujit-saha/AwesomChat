/**
 * Custom hook for managing messages
 */

import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { mockMessageService } from '../services/MockMessageService';
import { offlineQueueService } from '../services/OfflineQueueService';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  // Listen for incoming messages and status updates
  useEffect(() => {
    const unsubscribeMessage = mockMessageService.onMessage(message => {
      setMessages(prev => {
        // Check if message already exists (sent message)
        const exists = prev.some(m => m.id === message.id);
        if (exists) {
          return prev.map(m => (m.id === message.id ? message : m));
        }
        return [...prev, message];
      });
    });

    const unsubscribeStatus = mockMessageService.onStatusUpdate(
      (id, status) => {
        setMessages(prev =>
          prev.map(msg => (msg.id === id ? { ...msg, status } : msg)),
        );
      },
    );

    return () => {
      unsubscribeMessage();
      unsubscribeStatus();
    };
  }, []);

  // Handle queue flushing when going online
  useEffect(() => {
    if (isOnline) {
      const queuedMessages = offlineQueueService.flush();
      queuedMessages.forEach(async msg => {
        try {
          await mockMessageService.sendMessage(msg);
        } catch (error) {
          console.error('Failed to send queued message:', error);
          setMessages(prev =>
            prev.map(m => (m.id === msg.id ? { ...m, status: 'failed' } : m)),
          );
        }
      });
    }
  }, [isOnline]);

  const sendMessage = useCallback(
    async (text: string) => {
      const newMessage: Message = {
        id: `msg_${Date.now()}_${Math.random()}`,
        text,
        timestamp: Date.now(),
        sender: 'me',
        status: 'pending',
      };

      // Add to UI immediately
      setMessages(prev => [...prev, newMessage]);

      if (isOnline) {
        // Send if online
        try {
          await mockMessageService.sendMessage(newMessage);
        } catch (error) {
          console.error('Failed to send message:', error);
          setMessages(prev =>
            prev.map(msg =>
              msg.id === newMessage.id ? { ...msg, status: 'failed' } : msg,
            ),
          );
        }
      } else {
        // Queue if offline
        offlineQueueService.enqueue(newMessage);
      }
    },
    [isOnline],
  );

  const toggleOnlineStatus = useCallback(() => {
    setIsOnline(prev => !prev);
  }, []);

  const getPendingCount = useCallback(() => {
    return offlineQueueService.getQueueCount();
  }, []);

  return {
    messages,
    isOnline,
    sendMessage,
    toggleOnlineStatus,
    getPendingCount,
  };
};
