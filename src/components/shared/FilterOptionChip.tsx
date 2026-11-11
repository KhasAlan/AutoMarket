
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type FilterOptionChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function FilterOptionChip({
  label,
  selected,
  onPress,
  disabled = false,
  style,
}: FilterOptionChipProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
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
        numberOfLines={1}
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
    minHeight: 42,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
