
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { router } from 'expo-router';
import { useAppTheme } from '@/context/theme-context';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: string;
  onRightActionPress?: () => void;
  onBackPress?: () => void;
  style?: ViewStyle;
};

export default function ScreenHeader({
  title,
  subtitle,
  showBack = true,
  rightAction,
  onRightActionPress,
  onBackPress,
  style,
}: ScreenHeaderProps) {
  const { colors } = useAppTheme();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {showBack ? (
        <Pressable
          onPress={handleBack}
          style={[
            styles.backButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.backIcon, { color: colors.text }]}>
            ‹
          </Text>
        </Pressable>
      ) : null}

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightAction ? (
        <Pressable
          onPress={onRightActionPress}
          style={styles.actionButton}
        >
          <Text style={[styles.actionText, { color: colors.gold }]}>
            {rightAction}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  backIcon: {
    fontSize: 32,
    lineHeight: 36,
    marginTop: -4,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  actionButton: {
    paddingVertical: 8,
    paddingLeft: 10,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
