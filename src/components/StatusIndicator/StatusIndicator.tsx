/**
 * StatusIndicator Component
 * Shows online/offline status with a colored dot
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';

interface StatusIndicatorProps {
    status: 'online' | 'offline';
    showText?: boolean;
    onToggle?: () => void;
    showToggle?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
    status,
    showText = true,
    onToggle,
    showToggle = false,
}) => {
    const { theme } = useTheme();
    const isOnline = status === 'online';

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.dot,
                    {
                        backgroundColor: isOnline
                            ? theme.onlineIndicator
                            : theme.offlineIndicator,
                    },
                ]}
            />
            {showText && (
                <Text style={[styles.text, { color: theme.statusText }]}>
                    {isOnline ? 'Online' : 'Offline'}
                </Text>
            )}
            {showToggle && onToggle && (
                <TouchableOpacity
                    style={[
                        styles.toggle,
                        {
                            backgroundColor: isOnline
                                ? theme.onlineIndicator
                                : theme.offlineIndicator,
                        },
                    ]}
                    onPress={onToggle}
                    activeOpacity={0.7}
                >
                    <View
                        style={[
                            styles.toggleThumb,
                            isOnline ? styles.toggleThumbOn : styles.toggleThumbOff,
                        ]}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
    },
    toggle: {
        width: 44,
        height: 24,
        borderRadius: 12,
        padding: 2,
        justifyContent: 'center',
        marginLeft: 4,
    },
    toggleThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    toggleThumbOn: {
        alignSelf: 'flex-end',
    },
    toggleThumbOff: {
        alignSelf: 'flex-start',
    },
});
