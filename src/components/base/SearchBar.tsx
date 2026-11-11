
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type SearchBarProps = TextInputProps & {
  onClear?: () => void;
  containerStyle?: ViewStyle;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search cars...',
  onClear,
  containerStyle,
  ...inputProps
}: SearchBarProps) {
  const { colors } = useAppTheme();

  const handleClear = () => {
    onChangeText?.('');
    onClear?.();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        containerStyle,
      ]}
    >
      <Text style={[styles.searchIcon, { color: colors.muted }]}>
        ⌕
      </Text>

      <TextInput
        {...inputProps}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={[styles.input, { color: colors.text }]}
        returnKeyType="search"
        autoCapitalize="none"
      />

      {value ? (
        <Pressable
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={styles.clearButton}
        >
          <Text style={[styles.clearText, { color: colors.muted }]}>
            ×
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  searchIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 12,
  },
  clearButton: {
    width: 30,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 25,
  },
});
