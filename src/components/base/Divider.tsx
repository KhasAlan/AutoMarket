
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

type DividerProps = {
  spacing?: number;
  thickness?: number;
  color?: string;
  style?: ViewStyle;
};

export default function Divider({
  spacing = 12,
  thickness = 1,
  color,
  style,
}: DividerProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.divider,
        {
          marginVertical: spacing,
          height: thickness,
          backgroundColor: color ?? colors.border,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});
