
import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/context/theme-context';

const scenarios = [
  {
    id: 'buy',
    icon: '✦',
    title: 'I Want to Buy a Car',
    subtitle: 'Explore verified supercars, EVs & curated vehicles',
    badge: 'POPULAR',
  },
  {
    id: 'sell',
    icon: '⇄',
    title: 'Sell / Trade-in',
    subtitle: 'Instant appraisal & bespoke private concierge',
  },
  {
    id: 'explore',
    icon: 'ϟ',
    title: 'Just Browsing',
    subtitle: 'Immerse in telemetry specs, gallery & collections',
  },
];

const regions = [
  'Beverly Hills, CA 90210',
  'Baku, Azerbaijan',
  'Dubai, UAE',
  'London, UK',
];

export default function OnboardingScreen() {
  const [selectedScenario, setSelectedScenario] = useState('buy');
  const [region, setRegion] = useState('Beverly Hills, CA 90210');

  const { colors, activeTheme } = useAppTheme();

  const isDark = activeTheme === 'dark';
  const styles = getStyles(colors, isDark);

  const handleContinue = () => {
    router.push('/(auth)/welcome');
  };

  const handleSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  const handleChangeRegion = () => {
    Alert.alert('Market Region', 'Select your preferred region', [
      ...regions.map((item) => ({
        text: item,
        onPress: () => setRegion(item),
      })),
      {
        text: 'Cancel',
        style: 'cancel' as const,
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HERO IMAGE */}

        <View style={styles.hero}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
            }}
            style={styles.heroImage}
            imageStyle={styles.heroImageRadius}
          >
            <View style={styles.imageOverlay} />

            <View style={styles.heroTop}>
              <Text style={styles.heroTopText}>
                AUTOMARKET
              </Text>

              <Text style={styles.heroTopIcon}>✦</Text>
            </View>

            <View style={styles.imageBottom}>
              <View style={styles.vaultBadge}>
                <View style={styles.greenDot} />

                <Text style={styles.vaultText}>
                  PRIVATE VAULT ACCESS • 2025 EDITION
                </Text>
              </View>
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
            <Text style={styles.goldText}>
              AutoMarket
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            Find, Drive, or Sell Your Next Vehicle with Elegance.
          </Text>
        </View>

        {/* SCENARIO SELECTION */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            What brings you here today?
          </Text>

          <Text style={styles.stepText}>
            STEP 1 OF 3
          </Text>
        </View>

        <View style={styles.scenarios}>
          {scenarios.map((item) => {
            const selected = selectedScenario === item.id;

            return (
              <Pressable
                key={item.id}
                onPress={() => setSelectedScenario(item.id)}
                style={[
                  styles.scenario,
                  selected && styles.scenarioSelected,
                ]}
              >
                <View style={styles.scenarioIcon}>
                  <Text style={styles.scenarioIconText}>
                    {item.icon}
                  </Text>
                </View>

                <View style={styles.scenarioContent}>
                  <View style={styles.scenarioTitleRow}>
                    <Text style={styles.scenarioTitle}>
                      {item.title}
                    </Text>

                    {item.badge && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>
                          {item.badge}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text
                    style={styles.scenarioSubtitle}
                    numberOfLines={2}
                  >
                    {item.subtitle}
                  </Text>
                </View>

                <View
                  style={[
                    styles.radio,
                    selected && styles.radioSelected,
                  ]}
                >
                  {selected && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* MARKET REGION */}

        <View style={styles.regionCard}>
          <View style={styles.locationIcon}>
            <Text style={styles.locationEmoji}>📍</Text>
          </View>

          <View style={styles.regionContent}>
            <View style={styles.regionLabelRow}>
              <Text style={styles.regionLabel}>
                MARKET REGION
              </Text>

              <View style={styles.greenDotSmall} />
            </View>

            <Text style={styles.regionName}>
              {region}
            </Text>
          </View>

          <Pressable onPress={handleChangeRegion}>
            <Text style={styles.changeCity}>
              Change City
            </Text>
          </Pressable>
        </View>

        {/* GET STARTED */}

        <Pressable
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>
            Get Started
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </Pressable>

        {/* SIGN IN */}

        <View style={styles.signInRow}>
          <Text style={styles.signInLabel}>
            Already have an account?
          </Text>

          <Pressable onPress={handleSignIn}>
            <Text style={styles.signInLink}>
              Sign In
            </Text>
          </Pressable>
        </View>

        {/* EXCELLENCE STANDARDS */}

        <View style={styles.standardsCard}>
          <View style={styles.standardsHeader}>
            <Text style={styles.standardsTitle}>
              EXCELLENCE STANDARDS
            </Text>

            <Text style={styles.verified}>
              ✹ Verified
            </Text>
          </View>

          <View style={styles.standardsItems}>
            <View style={styles.standardItem}>
              <Text style={styles.standardIcon}>♢</Text>

              <Text style={styles.standardTitle}>
                100% Certified
              </Text>

              <Text style={styles.standardSubtitle}>
                Verified Inventory
              </Text>
            </View>

            <View style={styles.standardItem}>
              <Text style={styles.standardIcon}>♙</Text>

              <Text style={styles.standardTitle}>
                Concierge
              </Text>

              <Text style={styles.standardSubtitle}>
                White-Glove Deals
              </Text>
            </View>

            <View style={styles.standardItem}>
              <Text style={styles.standardIcon}>▤</Text>

              <Text style={styles.standardTitle}>
                Transparent
              </Text>

              <Text style={styles.standardSubtitle}>
                Zero Hidden Fees
              </Text>
            </View>
          </View>

          <Text style={styles.standardsFooter}>
            100% Certified Luxury Inventory • Concierge Delivery •
            Transparent Pricing
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
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 35,
    },

    hero: {
      height: 340,
      borderRadius: 24,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.gold,
      marginBottom: 22,
    },

    heroImage: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 18,
    },

    heroImageRadius: {
      borderRadius: 24,
    },

    imageOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(4, 12, 30, 0.52)',
    },

    heroTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    heroTopText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 3,
    },

    heroTopIcon: {
      color: colors.gold,
      fontSize: 25,
    },

    imageBottom: {
      alignItems: 'flex-start',
    },

    vaultBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(23,45,91,0.95)',
      borderRadius: 30,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 8,
    },

    greenDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.green,
    },

    vaultText: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 0.7,
    },

    intro: {
      marginBottom: 25,
    },

    eyebrow: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 2,
      marginBottom: 10,
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
      lineHeight: 21,
      fontWeight: '500',
      marginTop: 12,
    },

    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },

    sectionTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '800',
      flex: 1,
    },

    stepText: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '900',
      marginLeft: 8,
    },

    scenarios: {
      gap: 10,
      marginBottom: 20,
    },

    scenario: {
      minHeight: 76,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 17,
      padding: 13,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    scenarioSelected: {
      backgroundColor: isDark ? '#3B3A42' : colors.cardLight,
      borderColor: colors.gold,
      borderWidth: 1.5,
    },

    scenarioIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
    },

    scenarioIconText: {
      color: colors.gold,
      fontSize: 24,
      fontWeight: '800',
    },

    scenarioContent: {
      flex: 1,
    },

    scenarioTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 7,
    },

    scenarioTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '800',
    },

    popularBadge: {
      backgroundColor: colors.gold,
      borderRadius: 5,
      paddingHorizontal: 6,
      paddingVertical: 3,
    },

    popularText: {
      color: '#091735',
      fontSize: 8,
      fontWeight: '900',
    },

    scenarioSubtitle: {
      color: colors.muted,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 5,
    },

    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
    },

    radioSelected: {
      backgroundColor: colors.gold,
    },

    checkmark: {
      color: '#091735',
      fontSize: 14,
      fontWeight: '900',
    },

    regionCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
      gap: 11,
    },

    locationIcon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
    },

    locationEmoji: {
      fontSize: 20,
    },

    regionContent: {
      flex: 1,
    },

    regionLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 5,
    },

    regionLabel: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1,
    },

    greenDotSmall: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.green,
    },

    regionName: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '700',
    },

    changeCity: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '800',
    },

    continueButton: {
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.gold,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginBottom: 15,
    },

    continueText: {
      color: '#091735',
      fontSize: 17,
      fontWeight: '900',
    },

    arrow: {
      color: '#091735',
      fontSize: 23,
      fontWeight: '700',
    },

    signInRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      marginBottom: 28,
    },

    signInLabel: {
      color: colors.muted,
      fontSize: 12,
    },

    signInLink: {
      color: colors.gold,
      fontSize: 12,
      fontWeight: '900',
      textDecorationLine: 'underline',
    },

    standardsCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
    },

    standardsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },

    standardsTitle: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 1.3,
    },

    verified: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: '800',
    },

    standardsItems: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    standardItem: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 3,
    },

    standardIcon: {
      color: colors.gold,
      fontSize: 25,
      marginBottom: 8,
    },

    standardTitle: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '800',
      textAlign: 'center',
    },

    standardSubtitle: {
      color: colors.muted,
      fontSize: 9,
      textAlign: 'center',
      marginTop: 4,
    },

    standardsFooter: {
      color: colors.muted,
      fontSize: 9,
      lineHeight: 15,
      textAlign: 'center',
      marginTop: 18,
    },
  });
}
