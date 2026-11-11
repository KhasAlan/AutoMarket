
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function FavoriteButton({
  isFavorite,
  onPress,
  size = 42,
  style,
  disabled = false,
}: FavoriteButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={
        isFavorite ? 'Remove from favorites' : 'Add to favorites'
      }
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.icon,
          {
            color: isFavorite ? '#E05252' : colors.text,
            fontSize: size * 0.55,
          },
        ]}
      >
        {isFavorite ? '♥' : '♡'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontWeight: '700',
    lineHeight: 26,
  },
});
