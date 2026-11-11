import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/context/theme-context';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export default function EmptyState({
  title,
  description,
  icon = '🚘',
  actionLabel,
  onActionPress,
  style,
}: EmptyStateProps) {
  const { colors } = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 28,
      paddingVertical: 40,
      backgroundColor: colors.card,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconContainer: {
      width: 76,
      height: 76,
      borderRadius: 38,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    icon: {
      fontSize: 34,
    },
    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 8,
    },
    description: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 21,
      textAlign: 'center',
    },
    button: {
      marginTop: 22,
      paddingHorizontal: 24,
      paddingVertical: 13,
      borderRadius: 14,
      backgroundColor: colors.gold,
    },
    buttonText: {
      color: '#111827',
      fontSize: 14,
      fontWeight: '700',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      {actionLabel && onActionPress ? (
        <Pressable
          style={styles.button}
          onPress={onActionPress}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}