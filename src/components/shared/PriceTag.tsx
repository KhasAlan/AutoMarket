
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type PriceTagProps = {
  price: number;
  currency?: string;
  period?: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
};

export default function PriceTag({
  price,
  currency = '$',
  period,
  label,
  size = 'medium',
  style,
}: PriceTagProps) {
  const { colors } = useAppTheme();

  const fontSize = {
    small: 14,
    medium: 18,
    large: 24,
  }[size];

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={[styles.label, { color: colors.muted }]}>
          {label}
        </Text>
      ) : null}

      <View style={styles.priceRow}>
        <Text
          style={[
            styles.price,
            {
              color: colors.gold,
              fontSize,
            },
          ]}
        >
          {currency}{price.toLocaleString('en-US')}
        </Text>

        {period ? (
          <Text style={[styles.period, { color: colors.muted }]}>
            / {period}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontWeight: '800',
  },
  period: {
    fontSize: 12,
    marginLeft: 4,
  },
});
