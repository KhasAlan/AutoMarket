
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  action?: string;
  onActionPress?: () => void;
};

export default function SectionTitle({
  title,
  subtitle,
  action,
  onActionPress,
}: SectionTitleProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            {title}
          </Text>

          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {action ? (
          <Text
            onPress={onActionPress}
            style={[styles.action, { color: colors.gold }]}
          >
            {action}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 5,
    lineHeight: 18,
  },
  action: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 12,
  },
});
