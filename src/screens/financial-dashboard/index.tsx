import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLanguage } from '../../context/language-context';
const COLORS = {
  background: '#0B1220',
  card: '#151F30',
  cardLight: '#1C2A40',
  gold: '#D6AD60',
  white: '#FFFFFF',
  secondary: '#9BA5B5',
  border: '#293448',
  green: '#35B779',
  darkGreen: '#173C35',
};

const VEHICLE_PRICE = 168900;

const downPaymentOptions = [10, 20, 30];
const termOptions = [24, 36, 48, 60, 72, 84];

const creditTiers = [
  {
    id: 'tier1',
    name: 'Tier 1 — Sovereign Elite',
    rate: 5.49,
    description: 'excellentCredit',
  },
  {
    id: 'tier2',
    name: 'Tier 2 — Prime Preferred',
    rate: 6.79,
    description: 'strongCredit',
  },
  {
    id: 'tier3',
    name: 'Tier 3 — Standard',
    rate: 8.49,
    description: 'standardCredit',
  },
];

const formatMoney = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

export default function FinancialDashboardScreen() {
const { t } = useLanguage();

  const [downPayment, setDownPayment] = useState(20);
  const [loanTerm, setLoanTerm] = useState(60);
  const [selectedTier, setSelectedTier] = useState('tier1');
  const [tradeInEnabled, setTradeInEnabled] = useState(false);

  const activeTier =
    creditTiers.find((tier) => tier.id === selectedTier) ?? creditTiers[0];

  const financialData = useMemo(() => {
    const downPaymentAmount = VEHICLE_PRICE * (downPayment / 100);
    const tradeInValue = tradeInEnabled ? 15000 : 0;

    const principal = Math.max(
      0,
      VEHICLE_PRICE - downPaymentAmount - tradeInValue,
    );

    const monthlyRate = activeTier.rate / 100 / 12;

    const monthlyPayment =
      monthlyRate === 0
        ? principal / loanTerm
        : (principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, loanTerm)) /
          (Math.pow(1 + monthlyRate, loanTerm) - 1);

    const totalPayments = monthlyPayment * loanTerm;
    const totalInterest = totalPayments - principal;
    const additionalFees = 2200;
    const totalCost = VEHICLE_PRICE + totalInterest + additionalFees;

    return {
      downPaymentAmount,
      tradeInValue,
      principal,
      monthlyPayment,
      totalInterest,
      additionalFees,
      totalCost,
    };
  }, [downPayment, loanTerm, activeTier, tradeInEnabled]);


const handlePreApproval = () => {
  Alert.alert(
    t('preApprovalTitle'),
    t('preApprovalMessage'),
    [{ text: t('gotIt') }],
  );
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>

          <View style={styles.brandContainer}>
            <Text style={styles.brand}>AUTO</Text>
            <Text style={styles.brandGold}>MARKET</Text>
          </View>

          <View style={styles.headerAvatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>

     <View style={styles.titleSection}>
  <Text style={styles.eyebrow}>{t('financialCenter')}</Text>
  <Text style={styles.title}>{t('financialDashboard')}</Text>
  <Text style={styles.subtitle}>{t('financialSubtitle')}</Text>
</View>

        {/* Live Loan Telemetry */}
        <View style={styles.telemetryCard}>
          <View style={styles.sectionTopRow}>
            <View>
              <Text style={styles.cardEyebrow}>● {t('liveLoanTelemetry')}</Text>
              <Text style={styles.cardHeading}>{t('estimatedMonthlyInvestment')}</Text>
            </View>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
          </View>

          <Text style={styles.monthlyAmount}>
            {formatMoney(financialData.monthlyPayment)}
            <Text style={styles.perMonth}> /mo</Text>
          </Text>

          <View style={styles.telemetryDivider} />

          <View style={styles.telemetryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{t('totalFinance')}</Text>
              <Text style={styles.statValue}>
                {formatMoney(financialData.principal)}
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{t('financeCharge')}</Text>
              <Text style={styles.statValue}>
                {formatMoney(financialData.totalInterest)}
              </Text>
            </View>
          </View>

     

            <Text style={styles.telemetryFootnote}>
  {t('estimatedAPR')}: {activeTier.rate}%
</Text>
        </View>

        {/* Vehicle Valuation */}
        <View style={styles.section}>
        <View style={styles.sectionHeadingRow}>
  <Text style={styles.sectionTitle}>{t('vehicleValuation')}</Text>
  <View style={styles.verifiedBadge}>
    <Text style={styles.verifiedText}>{t('configured')}</Text>
  </View>
</View>

          <View style={styles.vehicleCard}>
            <View style={styles.vehicleImagePlaceholder}>
              <Text style={styles.vehicleEmoji}>🏎️</Text>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>2024 Porsche 911 Carrera S</Text>
          
              <Text style={styles.vehicleDescription}>
              {t('premiumSportsCoupe')}
              </Text>
              <Text style={styles.vehiclePrice}>
                {formatMoney(VEHICLE_PRICE)}
              </Text>
            </View>
          </View>
        </View>

        {/* Down Payment */}
        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>{t('downPaymentEquity')}</Text>
            <Text style={styles.goldValue}>
              {formatMoney(financialData.downPaymentAmount)}
            </Text>
          </View>

         
            <Text style={styles.helperText}>
        { t('selectContribution')}
        </Text>

          <View style={styles.optionRow}>
            {downPaymentOptions.map((option) => (
              <Pressable
                key={option}
                style={[
                  styles.optionButton,
                  downPayment === option && styles.optionButtonActive,
                ]}
                onPress={() => setDownPayment(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    downPayment === option && styles.optionTextActive,
                  ]}
                >
                  {option}%
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={[
                styles.optionButton,
                tradeInEnabled && styles.tradeInActive,
              ]}
              onPress={() => setTradeInEnabled((current) => !current)}
            >
              <Text
                style={[
                  styles.optionText,
                  tradeInEnabled && styles.optionTextActive,
                ]}
              >
                {t('tradeIn')}
              </Text>
            </Pressable>
          </View>

          {tradeInEnabled && (
            <View style={styles.tradeInInfo}>
               <Text style={styles.tradeInInfoText}>
                 {t('tradeInCreditApplied')}: {formatMoney(15000)}
              </Text>
            </View>
          )}

          <View style={styles.equityBar}>
            <View
              style={[
                styles.equityFill,
                { width: `${downPayment}%` },
              ]}
            />
          </View>

           <Text style={styles.helperText}>
            
            {downPayment}% {t('initialPayment')}
            {tradeInEnabled ? ` + $15,000 ${t('tradeInCredit')}` : ''}
          </Text>
        </View>

        {/* Financing Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('financingDuration')}</Text>
         <Text style={styles.helperText}>{t('chooseRepayment')}</Text>

          <View style={styles.termGrid}>
            {termOptions.map((term) => (
              <Pressable
                key={term}
                style={[
                  styles.termButton,
                  loanTerm === term && styles.termButtonActive,
                ]}
                onPress={() => setLoanTerm(term)}
              >
                <Text
                  style={[
                    styles.termValue,
                    loanTerm === term && styles.termTextActive,
                  ]}
                >
                  {term}
                </Text>
         

         <Text
       style={[
    styles.termLabel,
     loanTerm === term && styles.termTextActive,
    ]}
    >
  {t('months')}
</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Credit Rating Tier */}
        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>{t('creditRatingTier')}</Text>
            <Text style={styles.creditStatus}>{t('estimatedAPR')}</Text>
          </View>

          {creditTiers.map((tier) => (
            <Pressable
              key={tier.id}
              style={[
                styles.creditCard,
                selectedTier === tier.id && styles.creditCardActive,
              ]}
              onPress={() => setSelectedTier(tier.id)}
            >
              <View style={styles.creditRadio}>
                {selectedTier === tier.id && (
                  <View style={styles.creditRadioInner} />
                )}
              </View>

              <View style={styles.creditInfo}>
                <Text style={styles.creditName}>{tier.name}</Text>
                <Text style={styles.creditDescription}>
  {t(tier.description as import('../../constants/translations').TranslationKey)}
</Text>
              </View>

              <Text style={styles.creditRate}>{tier.rate.toFixed(2)}%</Text>
            </Pressable>
          ))}
        </View>

        {/* Cost Composition */}
       <View style={styles.section}>
  <View style={styles.sectionHeadingRow}>
    <Text style={styles.sectionTitle}>{t('costComposition')}</Text>
    <Text style={styles.creditStatus}>{t('monthlyAllocation')}</Text>
  </View>

          <View style={styles.costCard}>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t('vehiclePrice')}</Text>
              <Text style={styles.costValue}>
                {formatMoney(VEHICLE_PRICE)}
              </Text>
            </View>

            <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t('downPaymentLabel')}</Text>
              <Text style={styles.costValue}>
                -{formatMoney(financialData.downPaymentAmount)}
              </Text>
            </View>

            {tradeInEnabled && (
              <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t('tradeInCredit')}</Text>
                <Text style={styles.costValue}>
                  -{formatMoney(financialData.tradeInValue)}
                </Text>
              </View>
            )}

            <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t('estimatedInterest')}</Text>
              <Text style={styles.costValue}>
                {formatMoney(financialData.totalInterest)}
              </Text>
            </View>

            <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t('additionalFees')}</Text>
              <Text style={styles.costValue}>
                {formatMoney(financialData.additionalFees)}
              </Text>
            </View>

            <View style={styles.costDivider} />

            <View style={styles.costRow}>
              <Text style={styles.totalLabel}>{t('estimatedTotalCost')}</Text>
              <Text style={styles.totalValue}>
                {formatMoney(financialData.totalCost)}
              </Text>
            </View>
          </View>
        </View>

        {/* Zero Impact Verification */}
        <View style={styles.verificationCard}>
          <View style={styles.verificationIcon}>
            <Text style={styles.verificationIconText}>✓</Text>
          </View>

          <View style={styles.verificationContent}>
              <Text style={styles.verificationTitle}>
  {t('zeroImpactVerification')}
</Text>


           <Text style={styles.verificationDescription}>
  {t('zeroImpactDescription')}
</Text>
          </View>

          <Text style={styles.verificationStatus}>{t('demo')}</Text>
        </View>

        {/* Leasing */}
        <View style={styles.leasingCard}>
          <View style={styles.leasingTextContainer}>
            <Text style={styles.leasingTitle}>{t('preferLuxuryLeasing')}</Text>
            <Text style={styles.leasingDescription}>
  {t('leasingDescription')}
</Text>
          </View>
          <Text style={styles.leasingArrow}>›</Text>
        </View>

        {/* Pre-Approval */}
        <Pressable
          style={styles.approvalButton}
          onPress={handlePreApproval}
        >
          

          <Text style={styles.approvalButtonText}>
  {t('preApproval')}
</Text>
          <Text style={styles.approvalArrow}>→</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
  {t('disclaimer')}
</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 34,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandGold: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.cardLight,
    borderWidth: 1,
    borderColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.gold,
    fontWeight: '800',
  },
  titleSection: {
    marginTop: 22,
    marginBottom: 20,
  },
  eyebrow: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 7,
  },
  telemetryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  sectionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardEyebrow: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardHeading: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 9,
  },
  liveBadge: {
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  liveBadgeText: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: '900',
  },
  monthlyAmount: {
    color: COLORS.gold,
    fontSize: 34,
    fontWeight: '900',
    marginTop: 8,
  },
  perMonth: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: '500',
  },
  telemetryDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 17,
  },
  telemetryStats: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  statValue: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 7,
  },
  telemetryFootnote: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 15,
  },
  section: {
    marginTop: 25,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  verifiedBadge: {
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
  },
  verifiedText: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: '700',
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
  },
  vehicleImagePlaceholder: {
    width: 92,
    height: 76,
    borderRadius: 12,
    backgroundColor: COLORS.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleEmoji: {
    fontSize: 38,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 13,
  },
  vehicleName: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  vehicleDescription: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 5,
  },
  vehiclePrice: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 8,
  },
  goldValue: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '800',
  },
  helperText: {
    color: COLORS.secondary,
    fontSize: 11,
    marginTop: 5,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    minHeight: 43,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  tradeInActive: {
    backgroundColor: COLORS.darkGreen,
    borderColor: COLORS.green,
  },
  optionText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '800',
  },
  optionTextActive: {
    color: COLORS.background,
  },
  tradeInInfo: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 9,
    padding: 10,
    marginTop: 10,
  },
  tradeInInfoText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: '700',
  },
  equityBar: {
    height: 7,
    borderRadius: 10,
    backgroundColor: COLORS.cardLight,
    overflow: 'hidden',
    marginTop: 17,
  },
  equityFill: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.gold,
  },
  termGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  termButton: {
    width: '31%',
    minHeight: 58,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termButtonActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  termValue: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
  termLabel: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 3,
  },
  termTextActive: {
    color: COLORS.background,
  },
  creditStatus: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  creditCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    marginBottom: 9,
  },
  creditCardActive: {
    borderColor: COLORS.gold,
    backgroundColor: '#202B3B',
  },
  creditRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  creditRadioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.gold,
  },
  creditInfo: {
    flex: 1,
  },
  creditName: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  creditDescription: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 4,
  },
  creditRate: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '900',
  },
  costCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  costLabel: {
    color: COLORS.secondary,
    fontSize: 11,
  },
  costValue: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  costDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 14,
  },
  totalLabel: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  totalValue: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '900',
  },
  verificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginTop: 24,
  },
  verificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationIconText: {
    color: COLORS.green,
    fontSize: 17,
    fontWeight: '900',
  },
  verificationContent: {
    flex: 1,
    marginLeft: 11,
    marginRight: 7,
  },
  verificationTitle: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  verificationDescription: {
    color: COLORS.secondary,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
  },
  verificationStatus: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: '900',
  },
  leasingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginTop: 12,
  },
  leasingTextContainer: {
    flex: 1,
  },
  leasingTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  leasingDescription: {
    color: COLORS.secondary,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },
  leasingArrow: {
    color: COLORS.gold,
    fontSize: 27,
    marginLeft: 10,
  },
  approvalButton: {
    minHeight: 54,
    backgroundColor: COLORS.gold,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  approvalButtonText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: '900',
  },
  approvalArrow: {
    color: COLORS.background,
    fontSize: 19,
    fontWeight: '900',
    marginLeft: 10,
  },
  disclaimer: {
    color: COLORS.secondary,
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 15,
  },
});