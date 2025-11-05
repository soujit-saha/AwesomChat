/**
 * MessageBubble Component
 * Reusable adaptive message bubble that changes appearance based on sender
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../types';
import { useTheme } from '../../hooks';

interface MessageBubbleProps {
    message: Message;
    variant?: 'sender' | 'receiver';
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    variant
}) => {
    const { theme } = useTheme();
    const isSender = variant === 'sender' || message.sender === 'me';

    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const getStatusIcon = (status: Message['status']): string => {
        switch (status) {
            case 'pending':
                return '🕐'; // Clock icon
            case 'sent':
                return '✓'; // Single tick
            case 'delivered':
                return '✓✓'; // Double tick
            case 'failed':
                return '✕'; // X mark
            default:
                return '';
        }
    };

    const getStatusColor = (status: Message['status']): string => {
        switch (status) {
            case 'pending':
                return '#FFA500'; // Orange for pending
            case 'sent':
                return theme.timestampText; // Gray for sent
            case 'delivered':
                return '#34C759'; // Green for delivered
            case 'failed':
                return '#FF3B30'; // Red for failed
            default:
                return theme.timestampText;
        }
    };

    return (
        <View style={[
            styles.container,
            isSender ? styles.senderContainer : styles.receiverContainer
        ]}>
            <View
                style={[
                    styles.bubble,
                    {
                        backgroundColor: isSender
                            ? theme.messageBackground.me
                            : theme.messageBackground.other,
                    },
                    isSender ? styles.senderBubble : styles.receiverBubble,
                ]}
            >
                {!isSender && message.senderName && (
                    <Text style={[styles.senderName, { color: theme.statusText }]}>
                        {message.senderName}
                    </Text>
                )}
                <Text
                    style={[
                        styles.messageText,
                        {
                            color: isSender
                                ? theme.messageText.me
                                : theme.messageText.other,
                        },
                    ]}
                >
                    {message.text}
                </Text>
                <View style={styles.footer}>
                    <Text style={[styles.timestamp, { color: theme.timestampText }]}>
                        {formatTime(message.timestamp)}
                    </Text>
                    {isSender && (
                        <Text style={[styles.status, { color: getStatusColor(message.status) }]}>
                            {getStatusIcon(message.status)}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        marginHorizontal: 12,
    },
    senderContainer: {
        alignItems: 'flex-end',
    },
    receiverContainer: {
        alignItems: 'flex-start',
    },
    bubble: {
        maxWidth: '75%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
    },
    senderBubble: {
        borderBottomRightRadius: 4,
    },
    receiverBubble: {
        borderBottomLeftRadius: 4,
    },
    senderName: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 2,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 4,
        gap: 8,
    },
    timestamp: {
        fontSize: 11,
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
    },
});
