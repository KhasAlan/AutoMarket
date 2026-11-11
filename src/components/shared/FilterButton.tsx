import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/context/theme-context';

interface FilterButtonProps {
  onPress: () => void;
  activeCount?: number;
  title?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function FilterButton({
  onPress,
  activeCount = 0,
  title = 'Filters',
  style,
  disabled = false,
}: FilterButtonProps) {
  const { colors } = useAppTheme();

  const styles = StyleSheet.create({
    button: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 18,
      borderRadius: 14,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: activeCount > 0 ? colors.gold : colors.border,
      opacity: disabled ? 0.5 : 1,
    },
    icon: {
      fontSize: 18,
      color: colors.gold,
      marginRight: 9,
    },
    title: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    badge: {
      minWidth: 21,
      height: 21,
      borderRadius: 11,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 9,
      paddingHorizontal: 5,
    },
    badgeText: {
      color: '#111827',
      fontSize: 11,
      fontWeight: '800',
    },
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}
      accessibilityRole="button"
      accessibilityLabel={
        activeCount > 0
          ? `${title}, ${activeCount} active`
          : title
      }
    >
      <Text style={styles.icon}>☷</Text>

      <Text style={styles.title}>{title}</Text>

      {activeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {activeCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
}