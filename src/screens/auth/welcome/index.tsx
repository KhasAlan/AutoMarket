
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppTheme } from '@/context/theme-context';

export default function WelcomeScreen() {
  const { colors, activeTheme } = useAppTheme();

  const isDark = activeTheme === 'dark';
  const styles = getStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.logo}>
            AUTO<Text style={styles.logoGold}>MARKET</Text>
          </Text>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              PRIVATE VAULT ACCESS
            </Text>
          </View>
        </View>

        {/* HERO */}

        <View style={styles.hero}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
            }}
            style={styles.heroImage}
            imageStyle={styles.heroImageRadius}
          >
            <View style={styles.imageOverlay} />

            <View style={styles.imageTop}>
              <Text style={styles.imageLabel}>
                EXCLUSIVE AUTOMOTIVE COLLECTION
              </Text>
              <Text style={styles.imageStar}>✦</Text>
            </View>

            <View style={styles.imageBottom}>
              <Text style={styles.imageCaption}>
                PRECISION. PERFORMANCE. PRESTIGE.
              </Text>
              <Text style={styles.imageSmall}>
                YOUR NEXT JOURNEY STARTS HERE
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* INTRODUCTION */}

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>
            AUTOMOTIVE EXCELLENCE
          </Text>

          <Text style={styles.title}>
            Welcome to{' '}
            <Text style={styles.goldText}>AutoMarket</Text>
          </Text>

          <Text style={styles.subtitle}>
            Discover exceptional vehicles, explore
            exclusive collections, and find the car
            that matches your lifestyle.
          </Text>
        </View>

        {/* ACTIONS */}

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push('/(auth)/sign-in')}
          >
            <Text style={styles.primaryButtonText}>
              Sign In
            </Text>
            <Text style={styles.buttonArrow}>→</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.secondaryButtonText}>
              Create Account
            </Text>
            <Text style={styles.secondaryArrow}>→</Text>
          </Pressable>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our
          </Text>

          <View style={styles.legalRow}>
            <Text style={styles.legalLink}>
              Terms of Service
            </Text>
            <Text style={styles.footerText}> and </Text>
            <Text style={styles.legalLink}>
              Privacy Policy
            </Text>
          </View>

          <Text style={styles.footerBrand}>
            PREMIUM AUTOMOTIVE MARKETPLACE
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStyles(
  colors: ReturnType<typeof useAppTheme>['colors'],
  isDark: boolean,
) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      flexGrow: 1,
      paddingHorizontal: 22,
      paddingTop: 15,
      paddingBottom: 30,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },

    logo: {
      color: colors.text,
      fontSize: 21,
      fontWeight: '900',
      letterSpacing: 1.5,
    },

    logoGold: {
      color: colors.gold,
    },

    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      backgroundColor: colors.card,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 20,
    },

    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.green,
    },

    statusText: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '800',
      letterSpacing: 0.7,
    },

    hero: {
      height: 290,
      borderRadius: 23,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.gold,
      marginBottom: 28,
    },

    heroImage: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 17,
    },

    heroImageRadius: {
      borderRadius: 23,
    },

    imageOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(4, 12, 30, 0.48)',
    },

    imageTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    imageLabel: {
      color: '#FFFFFF',
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1.2,
    },

    imageStar: {
      color: '#FFD66B',
      fontSize: 24,
    },

    imageBottom: {
      gap: 7,
    },

    imageCaption: {
      color: '#FFD66B',
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.5,
    },

    imageSmall: {
      color: '#FFFFFF',
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 1.3,
    },

    intro: {
      marginBottom: 30,
    },

    eyebrow: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 2,
      marginBottom: 11,
    },

    title: {
      color: colors.text,
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '900',
    },

    goldText: {
      color: colors.gold,
    },

    subtitle: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 22,
      marginTop: 12,
      maxWidth: 330,
    },

    actions: {
      gap: 13,
    },

    primaryButton: {
      height: 59,
      borderRadius: 17,
      backgroundColor: colors.gold,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },

    primaryButtonText: {
      color: '#091735',
      fontSize: 16,
      fontWeight: '900',
    },

    buttonArrow: {
      color: '#091735',
      fontSize: 21,
      fontWeight: '800',
    },

    secondaryButton: {
      height: 59,
      borderRadius: 17,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.gold,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },

    secondaryButtonText: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
    },

    secondaryArrow: {
      color: colors.gold,
      fontSize: 20,
    },

    pressed: {
      opacity: 0.75,
      transform: [{ scale: 0.98 }],
    },

    footer: {
      alignItems: 'center',
      marginTop: 27,
    },

    footerText: {
      color: colors.muted,
      fontSize: 11,
    },

    legalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },

    legalLink: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: '800',
      textDecorationLine: 'underline',
    },

    footerBrand: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '800',
      letterSpacing: 2,
      marginTop: 25,
    },
  });
}
