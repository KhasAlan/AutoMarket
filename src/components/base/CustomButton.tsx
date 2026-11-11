
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: CustomButtonProps) {
  const { colors } = useAppTheme();

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  const backgroundColor = isPrimary
    ? colors.gold
    : isSecondary
      ? colors.card
      : 'transparent';

  const textColor = isPrimary ? '#0B1220' : colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor: isPrimary ? colors.gold : colors.border,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        variant === 'outline' && styles.outline,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  outline: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
});
