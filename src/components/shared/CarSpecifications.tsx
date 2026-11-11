
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/context/theme-context';

export type CarSpecification = {
  label: string;
  value: string | number;
  icon?: string;
};

type CarSpecificationsProps = {
  specifications: CarSpecification[];
  title?: string;
  columns?: 1 | 2 | 3;
  style?: ViewStyle;
};

export default function CarSpecifications({
  specifications,
  title = 'Specifications',
  columns = 2,
  style,
}: CarSpecificationsProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>

      <View style={styles.grid}>
        {specifications.map((item, index) => (
          <View
            key={`${item.label}-${index}`}
            style={[
              styles.item,
              {
                width: `${100 / columns}%`,
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            {item.icon ? (
              <Text style={styles.icon}>{item.icon}</Text>
            ) : null}

            <Text
              style={[styles.label, { color: colors.muted }]}
              numberOfLines={1}
            >
              {item.label}
            </Text>

            <Text
              style={[styles.value, { color: colors.text }]}
              numberOfLines={2}
            >
              {String(item.value)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  item: {
    minHeight: 95,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    justifyContent: 'center',
    gap: 5,
  },
  icon: {
    fontSize: 19,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
  },
});
