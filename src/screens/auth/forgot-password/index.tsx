
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const COLORS = {
  background: '#091735',
  card: '#172D5B',
  gold: '#FFD66B',
  white: '#FFFFFF',
  muted: '#A9B7D0',
};

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert('Email required', 'Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    Alert.alert(
      'Request received',
      'Your email has been validated. Password recovery is available in demo mode only.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹  Back</Text>
          </Pressable>

          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>🔐</Text>
            </View>

            <Text style={styles.title}>Forgot Password?</Text>

            <Text style={styles.subtitle}>
              Don't worry! Enter the email address associated with your
              account and we'll help you reset your password.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
              onPress={handleReset}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </Pressable>

            <Pressable
              style={styles.signInButton}
              onPress={() => router.replace('/(auth)/sign-in')}
            >
              <Text style={styles.signInText}>Back to Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 35,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  backText: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginTop: 75,
    marginBottom: 50,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 15,
  },
  form: {
    gap: 15,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 56,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: COLORS.white,
    fontSize: 15,
  },
  button: {
    height: 58,
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '800',
  },
  signInButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  signInText: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});
