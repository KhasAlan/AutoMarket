
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { router } from 'expo-router';
import { useAppTheme } from '@/context/theme-context';

export type CarCardData = {
  id: string;
  brand: string;
  model: string;
  year: number;
  type?: string;
  price?: number;
  pricePerDay?: number;
  image: string;
};

type CarCardProps = {
  car: CarCardData;
  onPress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  style?: ViewStyle;
};

export default function CarCard({
  car,
  onPress,
  onFavoritePress,
  isFavorite = false,
  style,
}: CarCardProps) {
  const { colors } = useAppTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    router.push(`/car-details/${car.id}/page`);
  };

  const price = car.price ?? car.pricePerDay;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: car.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {car.type ? (
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{car.type}</Text>
          </View>
        ) : null}

        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            onFavoritePress?.();
          }}
          style={styles.favoriteButton}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          <Text style={styles.favoriteIcon}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={[styles.brand, { color: colors.muted }]}>
          {car.brand} · {car.year}
        </Text>

        <Text
          style={[styles.model, { color: colors.text }]}
          numberOfLines={1}
        >
          {car.model}
        </Text>

        {price !== undefined ? (
          <Text style={[styles.price, { color: colors.gold }]}>
            ${price.toLocaleString('en-US')}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 270,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 165,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: 'rgba(9, 18, 35, 0.85)',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(9, 18, 35, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  content: {
    padding: 15,
  },
  brand: {
    fontSize: 12,
    fontWeight: '500',
  },
  model: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 5,
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
    marginTop: 12,
  },
});
