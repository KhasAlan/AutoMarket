
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type CustomInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function CustomInput({
  label,
  error,
  style,
  ...inputProps
}: CustomInputProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
        </Text>
      ) : null}

      <TextInput
        {...inputProps}
        placeholderTextColor={colors.muted}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: error ? '#E05252' : colors.border,
          },
          style,
        ]}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  error: {
    color: '#E05252',
    fontSize: 12,
    marginTop: 6,
  },
});
