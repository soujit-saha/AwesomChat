/**
 * Mock Message Service
 * Simulates real-time messaging without a backend
 */

import { Message, MessageStatus } from '../types';

type MessageListener = (message: Message) => void;
type StatusListener = (id: string, status: MessageStatus) => void;

export class MockMessageService {
  private messageListeners: MessageListener[] = [];
  private statusListeners: StatusListener[] = [];
  private deliveryDelay = 1500; // 1.5 seconds

  /**
   * Subscribe to new messages
   */
  onMessage(callback: MessageListener): () => void {
    this.messageListeners.push(callback);
    return () => {
      this.messageListeners = this.messageListeners.filter(
        listener => listener !== callback,
      );
    };
  }

  /**
   * Subscribe to message status updates
   */
  onStatusUpdate(callback: StatusListener): () => void {
    this.statusListeners.push(callback);
    return () => {
      this.statusListeners = this.statusListeners.filter(
        listener => listener !== callback,
      );
    };
  }

  /**
   * Send a message (simulated)
   * Returns the message with 'sent' status immediately
   * Triggers 'delivered' status after a delay
   */
  async sendMessage(message: Message): Promise<Message> {
    // Immediately mark as sent
    const sentMessage = { ...message, status: 'sent' as MessageStatus };

    // Notify listeners
    this.messageListeners.forEach(listener => listener(sentMessage));

    // Simulate network delay for delivery confirmation
    setTimeout(() => {
      this.statusListeners.forEach(listener =>
        listener(message.id, 'delivered'),
      );
    }, this.deliveryDelay);

    return sentMessage;
  }

  /**
   * Simulate receiving a message from another user
   */
  simulateIncomingMessage(text: string, senderName: string = 'Bot'): void {
    const incomingMessage: Message = {
      id: `msg_${Date.now()}_${Math.random()}`,
      text,
      timestamp: Date.now(),
      sender: 'other',
      status: 'delivered',
      senderName,
    };

    setTimeout(() => {
      this.messageListeners.forEach(listener => listener(incomingMessage));
    }, 500);
  }

  /**
   * Set custom delivery delay (for testing)
   */
  setDeliveryDelay(ms: number): void {
    this.deliveryDelay = ms;
  }
}

// Singleton instance
export const mockMessageService = new MockMessageService();
