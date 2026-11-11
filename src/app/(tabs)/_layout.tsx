
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

export default function TabsLayout() {
  const { colors } = useAppTheme();

  const getIcon = (symbol: string) => {
    return (props: any) => (
      <Text
        style={{
          color: props.color ?? colors.muted,
          fontSize: props.focused ? 23 : 21,
          fontWeight: props.focused ? '800' : '400',
        }}
      >
        {symbol}
      </Text>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.4,
          marginTop: 3,
          marginBottom: 5,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 72,
          paddingTop: 8,
          paddingBottom: 5,
          elevation: 12,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: getIcon('⌖'),
        }}
      />

      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Catalog',
          tabBarIcon: getIcon('◈'),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Saved',
          tabBarIcon: getIcon('♡'),
        }}
      />

      <Tabs.Screen
        name="trade-in"
        options={{
          title: 'Trade-In',
          tabBarIcon: getIcon('⇄'),
        }}
      />

      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Garage',
          tabBarIcon: getIcon('▣'),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: getIcon('♙'),
        }}
      />

      <Tabs.Screen
        name="filters"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
