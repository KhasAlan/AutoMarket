
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
  Linking
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useAppTheme } from '@/context/theme-context';

import {
  chatAdvisor,
  chatVehicle,
  testDriveDetails,
} from '@/data/mock/live-chat';

type Colors = ReturnType<typeof useAppTheme>['colors'];

const qrPattern = [
  '1111111001011111111',
  '1000001011011000001',
  '1011101010011011101',
  '1011101001111011101',
  '1011101010111011101',
  '1000001011011000001',
  '1111111010101111111',
  '0000000011100000000',
  '1101011100110101101',
  '0110100111011010010',
  '1011011100101101011',
  '0000000011010000000',
  '1111111010111110101',
  '1000001011000011010',
  '1011101011111010111',
  '1011101000101011000',
  '1011101011011110111',
  '1000001001100010100',
  '1111111010111011101',
];

export default function BookingConfirmationScreen() {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Pressable
          style={styles.topBar}
          onPress={() => router.back()}
        >
          <Text style={styles.closeButton}>×</Text>
          <Text style={styles.topTitle}>
            BOOKING CONFIRMATION
          </Text>
          <View style={styles.topSpacer} />
        </Pressable>

        <View style={styles.successIcon}>
          <Text style={styles.successCheck}>✓</Text>
        </View>

        <Text style={styles.eyebrow}>
          PRIVATE ACCESS GRANTED
        </Text>

        <Text style={styles.title}>
          VIP Test Drive{'\n'}Confirmed!
        </Text>

        <Text style={styles.subtitle}>
          Your private reservation pass has been generated
          and secured with Porsche Beverly Hills.
        </Text>

        <View style={styles.passCard}>
          <View style={styles.passHeader}>
            <View>
              <Text style={styles.passLabel}>
                ◉ AUTOMARKET VIP PASS
              </Text>
              <Text style={styles.passNumber}>
                AM-911-2026-VIP
              </Text>
            </View>

            <View style={styles.vipBadge}>
              <Text style={styles.vipText}>VIP</Text>
            </View>
          </View>

          <Image
            source={{ uri: chatVehicle.image }}
            style={styles.carImage}
            resizeMode="cover"
          />

          <Text style={styles.vehicleName}>
            {chatVehicle.year} {chatVehicle.brand} {chatVehicle.model}
          </Text>

          <Text style={styles.vehicleSubtitle}>
            Agate Grey Metallic • Sport Chrono Package
          </Text>

          <View style={styles.divider} />

          <View style={styles.specRow}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>POWER</Text>
              <Text style={styles.specValue}>473 HP</Text>
            </View>

            <View style={styles.specItem}>
              <Text style={styles.specLabel}>0–60 MPH</Text>
              <Text style={styles.specValue}>3.2 s</Text>
            </View>

            <View style={styles.specItem}>
              <Text style={styles.specLabel}>DRIVETRAIN</Text>
              <Text style={styles.specValue}>Twin-Turbo</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>▣</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                SCHEDULED WINDOW
              </Text>
              <Text style={styles.infoValue}>
                {testDriveDetails.date}
              </Text>
              <Text style={styles.infoSecondary}>
                {testDriveDetails.time} • {testDriveDetails.duration}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>⌖</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                PRIVATE HOST CENTER
              </Text>
              <Text style={styles.infoValue}>
                Porsche Center Beverly Hills
              </Text>
              <Text style={styles.infoSecondary}>
                9634 Wilshire Boulevard, Beverly Hills, CA 90212
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>◇</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                EXPERIENCE SCOPE
              </Text>
              <Text style={styles.experienceTitle}>
                Curated Canyon Route (45 Mins)
              </Text>
              <Text style={styles.infoSecondary}>
                Includes Private VIP Espresso Lounge & Track Telemetry
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.infoLabel}>
            DEDICATED HOST
          </Text>

          <View style={styles.advisorRow}>
            <Image
              source={{ uri: chatAdvisor.image }}
              style={styles.advisorImage}
            />

            <View style={styles.advisorInfo}>
              <Text style={styles.advisorName}>
                {chatAdvisor.name}
              </Text>
              <Text style={styles.advisorRole}>
                {chatAdvisor.role}
              </Text>
            </View>

            <Pressable
              style={styles.callButton}
              onPress={() => router.push('/live-dealer-chat')}
            >
              <Text style={styles.callButtonText}>✆</Text>
            </Pressable>
          </View>

          <View style={styles.qrSection}>
            <Text style={styles.qrTitle}>
              VALID FAST-LANE ENTRY
            </Text>

            <View style={styles.qrContainer}>
              {qrPattern.map((line, rowIndex) => (
                <View key={rowIndex} style={styles.qrRow}>
                  {line.split('').map((cell, cellIndex) => (
                    <View
                      key={`${rowIndex}-${cellIndex}`}
                      style={[
                        styles.qrCell,
                        cell === '1' && styles.qrCellActive,
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>

            <Text style={styles.qrCaption}>
              Present this pass to the concierge upon arrival
              for expedited vehicle staging.
            </Text>

            <Text style={styles.qrStatus}>
              ● DIGITAL WALLET READY
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert(
              'Calendar',
              'Your test drive details are ready to be added to your calendar.',
            )
          }
        >
          <Text style={styles.primaryButtonText}>
            ▣  Add to Apple / Google Calendar
          </Text>
        </Pressable>

        <Pressable
        onPress={() => {
  const address =
    'Porsche Center Baku, Neftchilar Avenue, Baku, Azerbaijan';

  const url =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  Linking.openURL(url).catch(() => {
    Alert.alert('Error', 'Unable to open Maps.');
  });
}}
           
        >
          <Text style={styles.secondaryButtonText}>
            ➤  Get Turn-by-Turn Directions
          </Text>
        </Pressable>

        <Pressable
          style={styles.chatButton}
          onPress={() => router.push('/live-dealer-chat')}
        >
          <Text style={styles.chatButtonText}>
            ▣  Message Advisor in Concierge Chat
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Complimentary Flexibility
          </Text>
          <Text style={styles.footerText}>
            Your reservation can be rescheduled through your
            dedicated concierge advisor.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStyles(colors: Colors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: 17,
      paddingTop: 8,
      paddingBottom: 35,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 23,
    },
    closeButton: {
      color: colors.text,
      fontSize: 27,
      width: 35,
    },
    topTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '900',
      flex: 1,
      textAlign: 'center',
    },
    topSpacer: {
      width: 35,
    },
    successIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 14,
    },
    successCheck: {
      color: colors.dark,
      fontSize: 28,
      fontWeight: '900',
    },
    eyebrow: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1.4,
      textAlign: 'center',
      marginBottom: 8,
    },
    title: {
      color: colors.text,
      fontSize: 27,
      lineHeight: 31,
      fontWeight: '900',
      textAlign: 'center',
      marginBottom: 9,
    },
    subtitle: {
      color: colors.muted,
      fontSize: 11,
      lineHeight: 17,
      textAlign: 'center',
      marginBottom: 20,
      paddingHorizontal: 8,
    },
    passCard: {
      backgroundColor: colors.card,
      borderRadius: 17,
      padding: 13,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 15,
    },
    passHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    passLabel: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 0.5,
    },
    passNumber: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 5,
    },
    vipBadge: {
      backgroundColor: colors.gold,
      paddingHorizontal: 11,
      paddingVertical: 6,
      borderRadius: 6,
    },
    vipText: {
      color: colors.dark,
      fontSize: 9,
      fontWeight: '900',
    },
    carImage: {
      width: '100%',
      height: 145,
      borderRadius: 10,
      backgroundColor: colors.cardLight,
    },
    vehicleName: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
      marginTop: 11,
    },
    vehicleSubtitle: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 4,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    specRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    specItem: {
      flex: 1,
    },
    specLabel: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '900',
      marginBottom: 5,
    },
    specValue: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '900',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 13,
    },
    infoIcon: {
      width: 25,
      height: 25,
      borderRadius: 7,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 9,
    },
    infoIconText: {
      color: colors.gold,
      fontSize: 13,
      fontWeight: '900',
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 0.7,
      marginBottom: 4,
    },
    infoValue: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '800',
    },
    infoSecondary: {
      color: colors.muted,
      fontSize: 8,
      lineHeight: 13,
      marginTop: 3,
    },
    experienceTitle: {
      color: colors.green,
      fontSize: 10,
      fontWeight: '800',
    },
    advisorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    advisorImage: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    advisorInfo: {
      flex: 1,
      marginLeft: 9,
    },
    advisorName: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '900',
    },
    advisorRole: {
      color: colors.muted,
      fontSize: 8,
      marginTop: 3,
    },
    callButton: {
      width: 31,
      height: 31,
      borderRadius: 16,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    callButtonText: {
      color: colors.gold,
      fontSize: 15,
    },
    qrSection: {
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: 15,
      paddingTop: 14,
    },
    qrTitle: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 0.7,
      marginBottom: 10,
    },
    qrContainer: {
      backgroundColor: '#FFFFFF',
      padding: 7,
      borderRadius: 7,
    },
    qrRow: {
      flexDirection: 'row',
    },
    qrCell: {
      width: 5,
      height: 5,
      backgroundColor: '#FFFFFF',
    },
    qrCellActive: {
      backgroundColor: '#091735',
    },
    qrCaption: {
      color: colors.muted,
      fontSize: 8,
      lineHeight: 12,
      textAlign: 'center',
      marginTop: 9,
      paddingHorizontal: 10,
    },
    qrStatus: {
      color: colors.green,
      fontSize: 8,
      fontWeight: '900',
      marginTop: 7,
    },
    primaryButton: {
      backgroundColor: colors.gold,
      borderRadius: 10,
      minHeight: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 9,
    },
    primaryButtonText: {
      color: colors.dark,
      fontSize: 10,
      fontWeight: '900',
    },
    secondaryButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      minHeight: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    secondaryButtonText: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '800',
    },
    chatButton: {
      minHeight: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatButtonText: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '800',
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: 13,
      paddingTop: 12,
    },
    footerTitle: {
      color: colors.text,
      fontSize: 9,
      fontWeight: '900',
      marginBottom: 5,
    },
    footerText: {
      color: colors.muted,
      fontSize: 8,
      lineHeight: 13,
    },
  });
}
