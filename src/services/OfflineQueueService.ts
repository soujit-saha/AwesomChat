/**
 * Offline Queue Service
 * Handles storing and resending messages when the app is offline
 */

import { Message } from '../types';

export class OfflineQueueService {
  private queue: Message[] = [];
  private onFlushCallback?: (messages: Message[]) => void;

  /**
   * Add a message to the offline queue
   */
  enqueue(message: Message): void {
    this.queue.push(message);
  }

  /**
   * Get all queued messages
   */
  getQueue(): Message[] {
    return [...this.queue];
  }

  /**
   * Get count of queued messages
   */
  getQueueCount(): number {
    return this.queue.length;
  }

  /**
   * Clear the queue
   */
  clear(): void {
    this.queue = [];
  }

  /**
   * Remove a specific message from the queue
   */
  remove(messageId: string): void {
    this.queue = this.queue.filter(msg => msg.id !== messageId);
  }

  /**
   * Set callback for when queue should be flushed
   */
  onFlush(callback: (messages: Message[]) => void): void {
    this.onFlushCallback = callback;
  }

  /**
   * Flush all queued messages (called when going back online)
   */
  flush(): Message[] {
    const messages = [...this.queue];
    this.queue = [];

    if (this.onFlushCallback && messages.length > 0) {
      this.onFlushCallback(messages);
    }

    return messages;
  }

  /**
   * Check if queue has pending messages
   */
  hasPendingMessages(): boolean {
    return this.queue.length > 0;
  }
}

// Singleton instance
export const offlineQueueService = new OfflineQueueService();
