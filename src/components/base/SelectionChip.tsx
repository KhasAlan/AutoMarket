
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type SelectionChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function SelectionChip({
  label,
  selected,
  onPress,
  style,
  disabled = false,
}: SelectionChipProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: selected ? colors.gold : colors.card,
          borderColor: selected ? colors.gold : colors.border,
          opacity: disabled ? 0.5 : pressed ? 0.75 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected ? '#0B1220' : colors.text,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
