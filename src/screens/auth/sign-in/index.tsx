
import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useAppTheme } from '@/context/theme-context';

export default function SignInScreen() {
  const [email, setEmail] = useState('alex.vance@automarket.com');
  const [password, setPassword] = useState('AutoMarket2026Secure');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { colors, activeTheme } = useAppTheme();

  const isDark = activeTheme === 'dark';
  const styles = getStyles(colors, isDark);

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing information',
        'Please enter your email and password.',
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert(
        'Invalid email',
        'Please enter a valid email address.',
      );
      return;
    }

    // Local demo authentication
    router.replace('/(tabs)');
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      `${provider} Sign In`,
      `${provider} authentication is available as a demo only.`,
    );
  };

  const handleBiometric = () => {
    Alert.alert(
      'Biometric Telemetry',
      'Face ID authentication is a visual demo in this version.',
    );
  };

  const handleCreateAccount = () => {
    router.push('/(auth)/register');
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* PRIVATE VAULT HEADER */}

          <View style={styles.topCard}>
            <View style={styles.brandRow}>
              <View style={styles.brandLeft}>
                <Text style={styles.brandIcon}>▣</Text>

                <View>
                  <Text style={styles.brandTitle}>
                    AUTOMARKET PRIVATE
                  </Text>

                  <Text style={styles.brandSubtitle}>
                    VAULT
                  </Text>
                </View>
              </View>

              <View style={styles.encryptedBadge}>
                <View style={styles.greenDot} />

                <Text style={styles.encryptedText}>
                  ENCRYPTED 256-BIT
                </Text>
              </View>
            </View>

            {/* AUTH TABS */}

            <View style={styles.authTabs}>
              <View style={styles.activeTab}>
                <Text style={styles.activeTabText}>
                  Sign In
                </Text>
              </View>

              <Pressable
                style={styles.inactiveTab}
                onPress={handleCreateAccount}
              >
                <Text style={styles.inactiveTabText}>
                  Create Account
                </Text>
              </Pressable>
            </View>
          </View>

          {/* INTRODUCTION */}

          <View style={styles.intro}>
            <Text style={styles.title}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Enter your credentials to access your luxury garage,
              custom telemetry, and private offers.
            </Text>
          </View>

          {/* SOCIAL LOGIN */}

          <View style={styles.socialRow}>
            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              <Text style={styles.appleIcon}>●</Text>

              <Text style={styles.socialText}>
                Apple
              </Text>
            </Pressable>

            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <Text style={styles.googleIcon}>G</Text>

              <Text style={styles.socialText}>
                Google
              </Text>
            </Pressable>
          </View>

          {/* DIVIDER */}

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />

            <Text style={styles.dividerText}>
              OR CONTINUE WITH CREDENTIALS
            </Text>

            <View style={styles.dividerLine} />
          </View>

          {/* EMAIL */}

          <View style={styles.field}>
            <Text style={styles.label}>
              EMAIL OR PHONE NUMBER
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>＠</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.muted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* PASSWORD */}

          <View style={styles.passwordCard}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>
                PASSPHRASE / SECURITY KEY
              </Text>

              <Text style={styles.strengthText}>
                HIGH STRENGTH
              </Text>
            </View>

            <View style={styles.passwordInputRow}>
              <Text style={styles.lockIcon}>♙</Text>

              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor={colors.muted}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <Pressable
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>
                  {showPassword ? '◉' : '◉'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.strengthBars}>
              <View style={styles.strengthBar} />
              <View style={styles.strengthBar} />
              <View style={styles.strengthBar} />
              <View style={styles.strengthBar} />
            </View>
          </View>

          {/* REMEMBER DEVICE */}

          <View style={styles.optionsRow}>
            <Pressable
              style={styles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxActive,
                ]}
              >
                {rememberMe && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <Text style={styles.rememberText}>
                Remember trusted device
              </Text>
            </Pressable>

            <Pressable onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          {/* SIGN IN BUTTON */}

          <Pressable
            style={styles.primaryButton}
            onPress={handleSignIn}
          >
            <Text style={styles.primaryButtonText}>
              Sign In to AutoMarket
            </Text>

            <Text style={styles.primaryArrow}>
              →
            </Text>
          </Pressable>

          {/* BIOMETRIC */}

          <Pressable
            style={styles.biometricCard}
            onPress={handleBiometric}
          >
            <View style={styles.biometricIcon}>
              <Text style={styles.faceIcon}>◎</Text>
            </View>

            <View style={styles.biometricContent}>
              <Text style={styles.biometricTitle}>
                Biometric Telemetry
              </Text>

              <Text style={styles.biometricSubtitle}>
                Instant access with Face ID
              </Text>
            </View>

            <View style={styles.fingerprintCircle}>
              <Text style={styles.fingerprint}>
                ◉
              </Text>
            </View>
          </Pressable>

          {/* FEATURED VEHICLE */}

          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
            }}
            style={styles.vehicleCard}
            imageStyle={styles.vehicleImage}
          >
            <View style={styles.vehicleOverlay} />

            <View style={styles.collectorBadge}>
              <Text style={styles.collectorText}>
                COLLECTOR TIER
              </Text>
            </View>

            <View style={styles.vehicleBottom}>
              <View>
                <Text style={styles.vehicleName}>
                  Vanguard Hyper-GT '25
                </Text>

                <Text style={styles.vehicleSpecs}>
                  0-100 km/h: 1.9s / 1,200 BHP
                </Text>
              </View>

              <Text style={styles.vehiclePrice}>
                $2,450,000
              </Text>
            </View>
          </ImageBackground>

          {/* TERMS */}

          <Text style={styles.terms}>
            By signing in, you confirm your adherence to our
            Terms of Luxury Service, Private Escrow Policy and
            Vehicle Data Telemetry Rights.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function getStyles(
  colors: ReturnType<typeof useAppTheme>['colors'],
  isDark: boolean,
) {
  const surface = isDark ? '#172D5B' : colors.card;
  const surfaceLight = isDark ? '#203967' : colors.cardLight;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    keyboard: {
      flex: 1,
    },

    container: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 35,
    },

    topCard: {
      backgroundColor: surface,
      borderRadius: 19,
      padding: 14,
      marginBottom: 32,
      borderWidth: 1,
      borderColor: colors.border,
    },

    brandRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 17,
      gap: 8,
    },

    brandLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      flex: 1,
    },

    brandIcon: {
      color: colors.gold,
      fontSize: 24,
      fontWeight: '900',
    },

    brandTitle: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 0.7,
    },

    brandSubtitle: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 1.5,
      marginTop: 2,
    },

    encryptedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: surfaceLight,
      borderRadius: 20,
      paddingHorizontal: 9,
      paddingVertical: 8,
      gap: 6,
    },

    greenDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.green,
    },

    encryptedText: {
      color: colors.green,
      fontSize: 9,
      fontWeight: '900',
    },

    authTabs: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: surfaceLight,
      borderRadius: 30,
      padding: 4,
    },

    activeTab: {
      flex: 1,
      height: 46,
      borderRadius: 25,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },

    activeTabText: {
      color: '#091735',
      fontSize: 14,
      fontWeight: '800',
    },

    inactiveTab: {
      flex: 1,
      height: 46,
      alignItems: 'center',
      justifyContent: 'center',
    },

    inactiveTabText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '800',
    },

    intro: {
      marginBottom: 25,
    },

    title: {
      color: colors.text,
      fontSize: 34,
      fontWeight: '900',
      letterSpacing: -0.8,
    },

    subtitle: {
      color: colors.text,
      opacity: 0.85,
      fontSize: 14,
      lineHeight: 23,
      fontWeight: '500',
      marginTop: 8,
    },

    socialRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },

    socialButton: {
      flex: 1,
      height: 58,
      backgroundColor: surface,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      borderWidth: 1,
      borderColor: colors.border,
    },

    appleIcon: {
      color: colors.text,
      fontSize: 19,
      fontWeight: '900',
    },

    googleIcon: {
      color: '#4285F4',
      fontSize: 20,
      fontWeight: '900',
    },

    socialText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '800',
    },

    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 22,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },

    dividerText: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '900',
    },

    field: {
      marginBottom: 18,
    },

    label: {
      color: colors.gold,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 0.5,
    },

    inputContainer: {
      height: 60,
      backgroundColor: surface,
      borderRadius: 14,
      marginTop: 9,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },

    inputIcon: {
      color: colors.gold,
      fontSize: 23,
      marginRight: 10,
      fontWeight: '800',
    },

    input: {
      flex: 1,
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },

    passwordCard: {
      backgroundColor: surface,
      borderRadius: 15,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 15,
    },

    passwordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 5,
    },

    strengthText: {
      color: colors.green,
      fontSize: 9,
      fontWeight: '900',
    },

    passwordInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
    },

    lockIcon: {
      color: colors.gold,
      fontSize: 20,
      marginRight: 10,
    },

    passwordInput: {
      flex: 1,
      color: colors.text,
      fontSize: 14,
      letterSpacing: 2,
    },

    eyeIcon: {
      color: colors.muted,
      fontSize: 20,
      paddingHorizontal: 5,
    },

    strengthBars: {
      flexDirection: 'row',
      gap: 6,
      marginTop: 15,
    },

    strengthBar: {
      flex: 1,
      height: 5,
      borderRadius: 5,
      backgroundColor: colors.green,
    },

    optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 9,
      gap: 8,
    },

    rememberRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },

    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    checkboxActive: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },

    checkmark: {
      color: '#091735',
      fontSize: 14,
      fontWeight: '900',
    },

    rememberText: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '600',
    },

    forgotText: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: '800',
    },

    primaryButton: {
      height: 60,
      borderRadius: 13,
      backgroundColor: colors.gold,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginTop: 13,
      marginBottom: 20,
    },

    primaryButtonText: {
      color: '#091735',
      fontSize: 16,
      fontWeight: '900',
    },

    primaryArrow: {
      color: '#091735',
      fontSize: 23,
      fontWeight: '800',
    },

    biometricCard: {
      minHeight: 78,
      backgroundColor: surface,
      borderRadius: 16,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 22,
      borderWidth: 1,
      borderColor: colors.border,
    },

    biometricIcon: {
      width: 45,
      height: 45,
      borderRadius: 23,
      backgroundColor: surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
    },

    faceIcon: {
      color: colors.gold,
      fontSize: 28,
      fontWeight: '800',
    },

    biometricContent: {
      flex: 1,
    },

    biometricTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '900',
    },

    biometricSubtitle: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: '600',
      marginTop: 4,
    },

    fingerprintCircle: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },

    fingerprint: {
      color: '#091735',
      fontSize: 25,
      fontWeight: '900',
    },

    vehicleCard: {
      height: 215,
      borderRadius: 18,
      overflow: 'hidden',
      justifyContent: 'space-between',
      padding: 14,
      marginBottom: 22,
      borderWidth: 1,
      borderColor: colors.border,
    },

    vehicleImage: {
      borderRadius: 18,
    },

    vehicleOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(4, 12, 30, 0.42)',
    },

    collectorBadge: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(9, 23, 53, 0.9)',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },

    collectorText: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 1,
    },

    vehicleBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 8,
    },

    vehicleName: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '900',
    },

    vehicleSpecs: {
      color: '#E0E6F2',
      fontSize: 10,
      fontWeight: '700',
      marginTop: 5,
    },

    vehiclePrice: {
      color: colors.gold,
      fontSize: 16,
      fontWeight: '900',
    },

    terms: {
      color: colors.muted,
      fontSize: 11,
      lineHeight: 18,
      textAlign: 'center',
      paddingHorizontal: 12,
    },
  });
}
