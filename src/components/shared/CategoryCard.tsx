
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type CategoryCardProps = {
  title: string;
  icon?: string;
  selected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

export default function CategoryCard({
  title,
  icon = '🚘',
  selected = false,
  onPress,
  style,
}: CategoryCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: selected ? colors.gold : colors.card,
          borderColor: selected ? colors.gold : colors.border,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>

        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {
              color: selected ? '#0B1220' : colors.text,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 105,
    minHeight: 90,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 25,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
  },
});
