
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type RangeInputProps = {
  title?: string;
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  unit?: string;
  keyboardType?: KeyboardTypeOptions;
  style?: ViewStyle;
};

export default function RangeInput({
  title,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder = 'From',
  maxPlaceholder = 'To',
  unit,
  keyboardType = 'numeric',
  style,
}: RangeInputProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, style]}>
      {title ? (
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
      ) : null}

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TextInput
            value={minValue}
            onChangeText={onMinChange}
            placeholder={minPlaceholder}
            placeholderTextColor={colors.muted}
            keyboardType={keyboardType}
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
          />
        </View>

        <Text style={[styles.separator, { color: colors.muted }]}>
          —
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={maxValue}
            onChangeText={onMaxChange}
            placeholder={maxPlaceholder}
            placeholderTextColor={colors.muted}
            keyboardType={keyboardType}
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
          />
        </View>
      </View>

      {unit ? (
        <Text style={[styles.unit, { color: colors.muted }]}>
          {unit}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  separator: {
    fontSize: 18,
    fontWeight: '600',
  },
  unit: {
    fontSize: 11,
    marginTop: 7,
  },
});
