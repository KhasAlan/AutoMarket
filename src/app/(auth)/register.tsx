
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#091735',
  card: '#172D5B',
  gold: '#FFD66B',
  white: '#FFFFFF',
  muted: '#A9B7D0',
  border: '#263D68',
};

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Weak password', 'Password must contain at least 8 characters.');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Terms and conditions', 'Please accept the terms to continue.');
      return;
    }

    Alert.alert(
      'Account created',
      'Registration is currently running in demo mode. No data was sent to a server.',
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>‹</Text>
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>

          <View style={styles.brand}>
            <Text style={styles.logo}>
              AUTO<Text style={styles.logoGold}>MARKET</Text>
            </Text>
            <Text style={styles.brandCaption}>PREMIUM AUTOMOTIVE MARKETPLACE</Text>
          </View>

          <View style={styles.heading}>
            <Text style={styles.eyebrow}>GET STARTED</Text>
            <Text style={styles.title}>Create your{'\n'}account.</Text>
            <Text style={styles.subtitle}>
              Join AutoMarket and discover your next drive.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
            />

            <Text style={styles.label}>Email address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Minimum 8 characters"
                placeholderTextColor={COLORS.muted}
                style={styles.passwordInput}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showPassword}>
                  {showPassword ? 'HIDE' : 'SHOW'}
                </Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.termsRow}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View style={[styles.checkbox, acceptedTerms && styles.checkboxActive]}>
                {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.goldText}>Terms of Service</Text>
                {' '}and <Text style={styles.goldText}>Privacy Policy</Text>
              </Text>
            </Pressable>

            <Pressable style={styles.submitButton} onPress={handleRegister}>
              <Text style={styles.submitText}>Create Account</Text>
              <Text style={styles.submitArrow}>→</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              YOUR JOURNEY. YOUR AUTOMARKET.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  backText: {
    color: COLORS.gold,
    fontSize: 32,
    marginRight: 8,
    lineHeight: 34,
  },
  backLabel: {
    color: COLORS.muted,
    fontSize: 13,
  },
  brand: {
    marginTop: 25,
    marginBottom: 38,
  },
  logo: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  logoGold: {
    color: COLORS.gold,
  },
  brandCaption: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 7,
  },
  heading: {
    marginBottom: 30,
  },
  eyebrow: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 13,
  },
  title: {
    color: COLORS.white,
    fontSize: 36,
    lineHeight: 43,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
  },
  form: {
    gap: 11,
  },
  label: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  input: {
    height: 54,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 16,
    color: COLORS.white,
    fontSize: 14,
  },
  passwordContainer: {
    height: 54,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
  },
  showPassword: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    padding: 8,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 13,
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  checkmark: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: '900',
  },
  termsText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
  },
  goldText: {
    color: COLORS.gold,
    fontWeight: '600',
  },
  submitButton: {
    height: 57,
    backgroundColor: COLORS.gold,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 5,
  },
  submitText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: '800',
  },
  submitArrow: {
    color: COLORS.background,
    fontSize: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 35,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 2,
  },
});
