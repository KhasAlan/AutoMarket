
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import {
  useLanguage,
  Language,
} from '@/context/language-context';

import {
  useAppTheme,
  ThemeMode,
} from '@/context/theme-context';

const languages: { code: Language; label: string }[] = [
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' },
  { code: 'TR', label: 'Türkçe' },
  { code: 'AZ', label: 'Azərbaycan' },
];

const currencies = ['USD $', 'EUR €', 'AED د.إ', 'GBP £'];

const themes: {
  id: ThemeMode;
  icon: string;
}[] = [
  { id: 'light', icon: '☼' },
  { id: 'dark', icon: '☾' },
  { id: 'system', icon: '◐' },
];

type SettingsColors = ReturnType<typeof useAppTheme>['colors'];

function getStyles(colors: SettingsColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      minHeight: 54,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 8,
    },
    backButton: {
      width: 28,
      alignItems: 'center',
    },
    backText: {
      color: colors.text,
      fontSize: 34,
    },
    headerTitle: {
      flex: 1,
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
    },
    headerIcon: {
      width: 34,
      height: 34,
      borderRadius: 18,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIconText: {
      color: colors.gold,
      fontSize: 19,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 17,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 22,
    },
    profileText: {
      flex: 1,
    },
    eyebrow: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '900',
      marginBottom: 8,
    },
    profileTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '800',
    },
    profileSubtitle: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 4,
    },
    profileSettings: {
      width: 46,
      height: 46,
      borderRadius: 24,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileSettingsText: {
      color: colors.gold,
      fontSize: 25,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 10,
    },
    sectionIcon: {
      color: colors.gold,
      fontSize: 14,
      marginRight: 7,
    },
    sectionTitle: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 0.5,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      marginBottom: 5,
    },
    fieldLabel: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: '800',
      marginBottom: 9,
    },
    languageSelector: {
      height: 46,
      backgroundColor: colors.cardLight,
      borderRadius: 10,
      paddingHorizontal: 13,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectedLanguage: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '700',
    },
    chevron: {
      color: colors.gold,
      fontSize: 21,
    },
    languageList: {
      backgroundColor: colors.dark,
      borderRadius: 10,
      marginTop: 7,
      padding: 5,
    },
    languageOption: {
      minHeight: 42,
      paddingHorizontal: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
    },
    selectedLanguageOption: {
      backgroundColor: colors.cardLight,
    },
    languageOptionText: {
      color: colors.text,
      fontSize: 14,
    },
    selectedLanguageText: {
      color: colors.gold,
      fontWeight: '800',
    },
    checkmark: {
      color: colors.gold,
      fontSize: 18,
      fontWeight: '900',
    },
    currencyLabel: {
      marginTop: 18,
    },
    currencyRow: {
      flexDirection: 'row',
      gap: 5,
    },
    currencyButton: {
      flex: 1,
      minHeight: 38,
      borderRadius: 9,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 3,
    },
    currencyText: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '800',
    },
    activeGoldButton: {
      backgroundColor: colors.gold,
    },
    activeGoldText: {
      color: colors.dark,
    },
    unitsRow: {
      marginTop: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '800',
    },
    rowSubtitle: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 3,
    },
    goldSmall: {
      color: colors.gold,
      fontSize: 10,
      marginTop: 3,
    },
    segmentContainer: {
      flexDirection: 'row',
      backgroundColor: colors.dark,
      borderRadius: 22,
      padding: 3,
    },
    segmentButton: {
      paddingHorizontal: 10,
      paddingVertical: 9,
      borderRadius: 20,
    },
    segmentText: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '800',
    },
    themeRow: {
      flexDirection: 'row',
      gap: 7,
      marginBottom: 13,
    },
    themeButton: {
      flex: 1,
      height: 75,
      borderRadius: 10,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 3,
    },
    themeIcon: {
      fontSize: 20,
      marginBottom: 5,
    },
    themeText: {
      fontSize: 10,
      fontWeight: '800',
      textAlign: 'center',
    },
    themeCheck: {
      fontSize: 10,
      position: 'absolute',
      top: 4,
      right: 6,
    },
    toggleRow: {
      minHeight: 65,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 8,
    },
    toggleTextContainer: {
      flex: 1,
      paddingRight: 8,
    },
    versionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 9,
    },
    stableText: {
      color: colors.green,
      fontSize: 9,
      fontWeight: '900',
    },
    legalRow: {
      minHeight: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    legalText: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '600',
    },
    signOutButton: {
      height: 54,
      borderRadius: 12,
      backgroundColor: colors.cardLight,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    signOutText: {
      color: '#E56B62',
      fontSize: 14,
      fontWeight: '900',
    },
    bottomSpace: {
      height: 25,
    },
  });
}

type ToggleRowProps = {
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (value: boolean) => void;
  colors: SettingsColors;
  styles: ReturnType<typeof getStyles>;
};

function ToggleRow({
  title,
  subtitle,
  value,
  onChange,
  colors,
  styles,
}: ToggleRowProps) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleTextContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: '#8993A5',
          true: colors.green,
        }}
        thumbColor={value ? colors.dark : '#FFFFFF'}
      />
    </View>
  );
}

function SectionTitle({
  children,
  styles,
}: {
  children: string;
  styles: ReturnType<typeof getStyles>;
}) {
  return (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionIcon}>◉</Text>
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

export default function SettingsScreen() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, colors, activeTheme } = useAppTheme();

  const styles = getStyles(colors);

  const [languageOpen, setLanguageOpen] = useState(false);
  const [currency, setCurrency] = useState('USD $');
  const [units, setUnits] = useState<'Metric' | 'Imperial'>('Imperial');

  const [highContrast, setHighContrast] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [inventoryMatches, setInventoryMatches] = useState(true);
  const [privateAuctions, setPrivateAuctions] = useState(true);

  const [faceId, setFaceId] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [anonymousTelemetry, setAnonymousTelemetry] = useState(true);

  const showDemo = (title: string) => {
    Alert.alert(
      title,
      'This feature is available in the local demo version.',
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={activeTheme === 'light' ? 'dark' : 'light'} />

      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          {t('headerSettings')}
        </Text>

        <Pressable
          style={styles.headerIcon}
          onPress={() => showDemo(t('tools'))}
        >
          <Text style={styles.headerIconText}>⌁</Text>
        </Pressable>

        <Pressable
          style={styles.headerIcon}
          onPress={() => showDemo(t('settings'))}
        >
          <Text style={styles.headerIconText}>⚙</Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileText}>
            <Text style={styles.eyebrow}>
              ● {t('conciergeProfile')}
            </Text>

            <Text style={styles.profileTitle}>
              {t('clientPreferences')}
            </Text>

            <Text style={styles.profileSubtitle}>
              {t('calibrateSubtitle')}
            </Text>
          </View>

          <Pressable
            style={styles.profileSettings}
            onPress={() => showDemo(t('clientPreferencesTitle'))}
          >
            <Text style={styles.profileSettingsText}>☷</Text>
          </Pressable>
        </View>

        <SectionTitle styles={styles}>
          {t('localization')}
        </SectionTitle>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>
            {t('selectedLanguage')}
          </Text>

          <Pressable
            style={styles.languageSelector}
            onPress={() => setLanguageOpen(!languageOpen)}
          >
            <Text style={styles.selectedLanguage}>
              {languages.find(item => item.code === language)?.label}
            </Text>

            <Text style={styles.chevron}>
              {languageOpen ? '⌃' : '⌄'}
            </Text>
          </Pressable>

          {languageOpen && (
            <View style={styles.languageList}>
              {languages.map(item => {
                const selected = language === item.code;

                return (
                  <Pressable
                    key={item.code}
                    style={[
                      styles.languageOption,
                      selected && styles.selectedLanguageOption,
                    ]}
                    onPress={() => {
                      setLanguage(item.code);
                      setLanguageOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.languageOptionText,
                        selected && styles.selectedLanguageText,
                      ]}
                    >
                      {item.label}
                    </Text>

                    {selected && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          )}

          <Text style={[styles.fieldLabel, styles.currencyLabel]}>
            {t('pricingCurrency')}
          </Text>

          <View style={styles.currencyRow}>
            {currencies.map(item => {
              const selected = currency === item;

              return (
                <Pressable
                  key={item}
                  style={[
                    styles.currencyButton,
                    selected && styles.activeGoldButton,
                  ]}
                  onPress={() => setCurrency(item)}
                >
                  <Text
                    style={[
                      styles.currencyText,
                      selected && styles.activeGoldText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.unitsRow}>
            <View>
              <Text style={styles.rowTitle}>
                {t('velocityRange')}
              </Text>

              <Text style={styles.rowSubtitle}>
                {t('measurementUnits')}
              </Text>

              <Text style={styles.goldSmall}>
                {units === 'Metric' ? 'km, km/h' : 'mph, mi'}
              </Text>
            </View>

            <View style={styles.segmentContainer}>
              {(['Metric', 'Imperial'] as const).map(item => {
                const selected = units === item;

                return (
                  <Pressable
                    key={item}
                    style={[
                      styles.segmentButton,
                      selected && styles.activeGoldButton,
                    ]}
                    onPress={() => setUnits(item)}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        selected && styles.activeGoldText,
                      ]}
                    >
                      {item === 'Metric' ? t('metric') : t('imperial')}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        <SectionTitle styles={styles}>
          {t('interfaceDisplay')}
        </SectionTitle>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>
            {t('appTheme')}
          </Text>

          <View style={styles.themeRow}>
            {themes.map(item => {
              const selected = theme === item.id;

              return (
                <Pressable
                  key={item.id}
                  style={[
                    styles.themeButton,
                    {
                      backgroundColor: colors.cardLight,
                      borderColor: selected
                        ? colors.gold
                        : colors.border,
                    },
                  ]}
                  onPress={() => setTheme(item.id)}
                >
                  <Text
                    style={[
                      styles.themeIcon,
                      { color: colors.gold },
                    ]}
                  >
                    {item.icon}
                  </Text>

                  <Text
                    style={[
                      styles.themeText,
                      { color: colors.text },
                    ]}
                  >
                    {t(item.id)}
                  </Text>

                  {selected && (
                    <Text
                      style={[
                        styles.themeCheck,
                        { color: colors.gold },
                      ]}
                    >
                      ✓
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.rowSubtitle}>
            {theme === 'system'
              ? `${t('followingDevice')} (${activeTheme === 'light' ? t('light') : t('dark')})`
              : `${t(theme)} ${t('appearanceSelected')}`}
          </Text>

          <ToggleRow
            title={t('highContrast')}
            subtitle={t('highContrastSubtitle')}
            value={highContrast}
            onChange={setHighContrast}
            colors={colors}
            styles={styles}
          />
        </View>

        <SectionTitle styles={styles}>
          {t('notificationsRadar')}
        </SectionTitle>

        <View style={styles.card}>
          <ToggleRow
            title={t('priceAlerts')}
            subtitle={t('priceAlertsSubtitle')}
            value={priceAlerts}
            onChange={setPriceAlerts}
            colors={colors}
            styles={styles}
          />

          <ToggleRow
            title={t('inventoryMatches')}
            subtitle={t('inventorySubtitle')}
            value={inventoryMatches}
            onChange={setInventoryMatches}
            colors={colors}
            styles={styles}
          />

          <ToggleRow
            title={t('privateAuctions')}
            subtitle={t('privateAuctionsSubtitle')}
            value={privateAuctions}
            onChange={setPrivateAuctions}
            colors={colors}
            styles={styles}
          />
        </View>

        <SectionTitle styles={styles}>
          {t('securityPrivacy')}
        </SectionTitle>

        <View style={styles.card}>
          <ToggleRow
            title={t('biometric')}
            subtitle={t('biometricSubtitle')}
            value={faceId}
            onChange={setFaceId}
            colors={colors}
            styles={styles}
          />

          <ToggleRow
            title={t('twoFactor')}
            subtitle={t('twoFactorSubtitle')}
            value={twoFactor}
            onChange={setTwoFactor}
            colors={colors}
            styles={styles}
          />

          <ToggleRow
            title={t('anonymousTelemetry')}
            subtitle={t('telemetrySubtitle')}
            value={anonymousTelemetry}
            onChange={setAnonymousTelemetry}
            colors={colors}
            styles={styles}
          />
        </View>

        <SectionTitle styles={styles}>
          {t('versionLegal')}
        </SectionTitle>

        <View style={styles.card}>
          <View style={styles.versionRow}>
            <View>
              <Text style={styles.rowTitle}>
                {t('vipClient')}
              </Text>

              <Text style={styles.rowSubtitle}>
                v2.4.0 (Build 2026)
              </Text>
            </View>

            <Text style={styles.stableText}>
              {t('productionStable')}
            </Text>
          </View>

          <Pressable
            style={styles.legalRow}
            onPress={() => showDemo(t('serviceTerms'))}
          >
            <Text style={styles.legalText}>
              {t('serviceTerms')}
            </Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <Pressable
            style={styles.legalRow}
            onPress={() => showDemo(t('privacyPolicy'))}
          >
            <Text style={styles.legalText}>
              {t('privacyPolicy')}
            </Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <Pressable
            style={styles.legalRow}
            onPress={() => showDemo(t('conciergeSupport'))}
          >
            <Text style={styles.legalText}>
              {t('conciergeSupport')}
            </Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.signOutButton}
          onPress={() =>
            Alert.alert(
              t('signOutTitle'),
              t('signOutMessage'),
              [
                { text: t('cancel'), style: 'cancel' },
                {
                  text: t('signOut'),
                  style: 'destructive',
                  onPress: () => router.replace('/(auth)/welcome'),
                },
              ],
            )
          }
        >
          <Text style={styles.signOutText}>
            ⇥ {t('signOut')}
          </Text>
        </Pressable>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}
