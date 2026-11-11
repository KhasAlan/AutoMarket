
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Modal,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { cars } from '@/data/mock/cars';
import { comparisonData } from '@/data/mock/comparison-data';
import { useFavorites } from '@/context/favorites-context';

const COLORS = {
  background: '#080F24',
  card: '#111D38',
  cardLight: '#1A2948',
  gold: '#E7BD68',
  white: '#FFFFFF',
  muted: '#9AA9C2',
  border: '#293958',
  green: '#54D99A',
  greenDark: '#173F36',
  goldDark: '#443820',
};

type Car = (typeof cars)[number];

type MetricKey = keyof (typeof comparisonData)[string] | 'price';

type Metric = {
  label: string;
  key: MetricKey;
  icon?: string;
  better: 'lower' | 'higher' | 'none';
  unit?: string;
};

const POWER_METRICS: Metric[] = [
  {
    label: '0–60 MPH ACCELERATION',
    key: 'acceleration',
    better: 'lower',
  },
  {
    label: 'HORSEPOWER (BHP)',
    key: 'horsepower',
    better: 'higher',
  },
  {
    label: 'TOP TRACK SPEED',
    key: 'topSpeed',
    better: 'higher',
  },
  {
    label: 'ENGINE ARCHITECTURE',
    key: 'engine',
    better: 'none',
  },
];

const DRIVETRAIN_METRICS: Metric[] = [
  {
    label: 'ALL-WHEEL DRIVE SYSTEM',
    key: 'drivetrain',
    better: 'none',
  },
  {
    label: 'CURB WEIGHT',
    key: 'weight',
    better: 'lower',
  },
  {
    label: 'GROUND CLEARANCE',
    key: 'groundClearance',
    better: 'higher',
  },
];

const VALUE_METRICS: Metric[] = [
  {
    label: 'BASE VEHICLE MSRP',
    key: 'price',
    better: 'lower',
  },
  {
    label: 'ESTIMATED MONTHLY PAYMENT',
    key: 'monthlyPayment',
    better: 'lower',
  },
  {
    label: 'EST. 3-YR DEPRECIATION CURVE',
    key: 'depreciation',
    better: 'lower',
  },
];

function getNumericValue(value: string) {
  const number = parseFloat(value.replace(/[^0-9.]/g, ''));
  return Number.isNaN(number) ? 0 : number;
}

export default function CarComparisonScreen() {
  const { selectedCars, toggleCompare } = useFavorites();

  const [showAddModal, setShowAddModal] = useState(false);

  const availableCars = cars.filter(
    (car) => !selectedCars.some((selected) => selected.id === car.id)
  );

  const handleAddCar = (car: Car) => {
    const result = toggleCompare(car);

    if (result === 'added') {
      setShowAddModal(false);
    } else if (result === 'limit') {
      Alert.alert(
        'Comparison limit',
        'You can compare a maximum of 3 vehicles.'
      );
    }
  };

  const handleRemoveCar = (car: Car) => {
    toggleCompare(car);
  };

  const handleScheduleDrive = () => {
    if (selectedCars.length < 2) {
      Alert.alert(
        'Select two vehicles',
        'Please add at least two vehicles to schedule a dual test drive.'
      );
      return;
    }

    Alert.alert(
      'Dual Test Drive',
      `Your demo request is prepared for:\n\n${selectedCars
        .map((car) => `${car.brand} ${car.model}`)
        .join('\n\n')}\n\nNo real booking has been sent yet.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book first vehicle',
          onPress: () => {
            router.push({
              pathname: '/book-test-drive',
              params: { id: selectedCars[0].id },
            });
          },
        },
      ]
    );
  };

  const getMetricValue = (car: Car, key: string) => {
    if (key === 'price') {
      return car.price;
    }

    const specs = comparisonData[car.id];

    return specs?.[key as keyof typeof specs] ?? '—';
  };

  const getWinner = (
    metric: Metric,
    vehicles: Car[]
  ): string | null => {
    if (metric.better === 'none' || vehicles.length < 2) {
      return null;
    }

    const values = vehicles.map((car) => ({
      id: car.id,
      value: getNumericValue(
        String(getMetricValue(car, metric.key))
      ),
    }));

    if (values.some((item) => item.value === 0)) {
      return null;
    }

    const winner = values.reduce((best, current) => {
      if (metric.better === 'lower') {
        return current.value < best.value ? current : best;
      }

      return current.value > best.value ? current : best;
    });

    return winner.id;
  };

  const renderSection = (
    title: string,
    icon: string,
    metrics: Metric[]
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {metrics.map((metric) => {
        const winner = getWinner(metric, selectedCars);

        return (
          <View key={metric.label} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{metric.label}</Text>

            <View style={styles.metricValues}>
              {selectedCars.map((car) => {
                const value = getMetricValue(car, metric.key);
                const isWinner = winner === car.id;

                return (
                  <View
                    key={car.id}
                    style={[
                      styles.metricValueBox,
                      isWinner && styles.metricWinnerBox,
                    ]}
                  >
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.metricValue,
                        isWinner && styles.metricWinnerText,
                      ]}
                    >
                      {value}
                    </Text>

                    {isWinner && (
                      <View style={styles.leadBadge}>
                        <Text style={styles.leadBadgeText}>
                          LEAD
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderVehicleCard = (car: Car) => {
    const specs = comparisonData[car.id];

    return (
      <View key={car.id} style={styles.vehicleCard}>
        <Pressable
          style={styles.removeButton}
          onPress={() => handleRemoveCar(car)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </Pressable>

        <Image
          source={{ uri: car.image }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />

        <Text style={styles.vehicleYear}>
          {car.year} · {car.category.toUpperCase()}
        </Text>

        <Text style={styles.vehicleBrand}>
          {car.brand.toUpperCase()}
        </Text>

        <Text style={styles.vehicleName} numberOfLines={2}>
          {car.model}
        </Text>

        <Text style={styles.vehiclePrice}>{car.price}</Text>

        <Text style={styles.vehicleColor}>
          {specs?.color ?? 'Standard'}
        </Text>
      </View>
    );
  };

  const renderAddVehicle = () => (
    <Pressable
      style={styles.addVehicleCard}
      onPress={() => setShowAddModal(true)}
    >
      <Text style={styles.addVehicleIcon}>＋</Text>
      <Text style={styles.addVehicleText}>Add Vehicle</Text>
    </Pressable>
  );

  const renderAvailability = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionIcon}>▣</Text>
        <Text style={styles.sectionTitle}>
          Dealer & Availability
        </Text>
      </View>

      <View style={styles.dealerRow}>
        {selectedCars.map((car) => {
          const specs = comparisonData[car.id];

          return (
            <View key={car.id} style={styles.dealerCard}>
              <Text style={styles.availableLabel}>
                ● AVAILABLE NOW
              </Text>

              <Text style={styles.dealerName}>
                {specs?.dealer ?? car.brand}
              </Text>

              <Text style={styles.dealerAddress}>
                {specs?.dealerAddress ?? car.location}
              </Text>

              <View style={styles.dealerDivider} />

              <Text style={styles.dealerStatus}>
                {specs?.availability ?? 'Demo availability'}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderConciergeAnalysis = () => {
    if (selectedCars.length < 2) {
      return null;
    }

    const first = selectedCars[0];
    const second = selectedCars[1];

    const firstSpecs = comparisonData[first.id];
    const secondSpecs = comparisonData[second.id];

    return (
      <View style={styles.analysisCard}>
        <View style={styles.analysisHeader}>
          <Text style={styles.analysisIcon}>✦</Text>
          <Text style={styles.analysisTitle}>
            CONCIERGE TELEMETRY ANALYSIS
          </Text>
        </View>

        <Text style={styles.analysisText}>
          The {first.brand} {first.model} and {second.brand}{' '}
          {second.model} offer different driving experiences.
          Compare acceleration, power, drivetrain and estimated
          ownership costs before choosing your next vehicle.
        </Text>

        <Text style={styles.analysisDisclaimer}>
          DEMO ANALYSIS · BASED ON MOCK VEHICLE DATA
        </Text>
      </View>
    );
  };

  const renderAddModal = () => (
    <Modal
      visible={showAddModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowAddModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Vehicle</Text>

            <Pressable
              onPress={() => setShowAddModal(false)}
              style={styles.modalClose}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </Pressable>
          </View>

          <Text style={styles.modalSubtitle}>
            Select a vehicle to add to your comparison.
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {availableCars.length === 0 ? (
              <Text style={styles.emptyText}>
                All available demo vehicles are already selected.
              </Text>
            ) : (
              availableCars.map((car) => (
                <Pressable
                  key={car.id}
                  style={styles.modalCar}
                  onPress={() => handleAddCar(car)}
                >
                  <Image
                    source={{ uri: car.image }}
                    style={styles.modalCarImage}
                  />

                  <View style={styles.modalCarInfo}>
                    <Text style={styles.modalCarName}>
                      {car.brand} {car.model}
                    </Text>

                    <Text style={styles.modalCarDetails}>
                      {car.year} · {car.price}
                    </Text>
                  </View>

                  <Text style={styles.modalAddIcon}>＋</Text>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerEyebrow}>AUTO MARKET</Text>
          <Text style={styles.headerTitle}>
            Car Comparison Matrix
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>⇄</Text>
        </View>
      </View>

      <View style={styles.selectionBar}>
        <View style={styles.selectionBadge}>
          <View style={styles.selectionDot} />
          <Text style={styles.selectionText}>
            {selectedCars.length} of 3 Selected
          </Text>
        </View>

        {selectedCars.length < 3 && renderAddVehicle()}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedCars.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>⇄</Text>
            <Text style={styles.emptyTitle}>
              Start Your Comparison
            </Text>
            <Text style={styles.emptyDescription}>
              Add vehicles to compare their performance,
              dimensions and estimated ownership costs.
            </Text>

            <Pressable
              style={styles.emptyButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.emptyButtonText}>
                + Add First Vehicle
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.vehiclesRow}>
              {selectedCars.map(renderVehicleCard)}

              {selectedCars.length < 3 && renderAddVehicle()}
            </View>

            {renderSection(
              'Power & Dynamics',
              '◎',
              POWER_METRICS
            )}

            {renderSection(
              'Drivetrain & Dimensions',
              '▣',
              DRIVETRAIN_METRICS
            )}

            {renderSection(
              'Value & Financing',
              '▤',
              VALUE_METRICS
            )}

            {renderAvailability()}

            {renderConciergeAnalysis()}
          </>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={[
            styles.scheduleButton,
            selectedCars.length < 2 && styles.scheduleButtonDisabled,
          ]}
          onPress={handleScheduleDrive}
        >
          <Text style={styles.scheduleIcon}>▣</Text>
          <Text style={styles.scheduleButtonText}>
            Schedule Dual Test Drive
          </Text>
          <Text style={styles.scheduleArrow}>→</Text>
        </Pressable>
      </View>

      {renderAddModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 34,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerEyebrow: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 3,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    color: COLORS.gold,
    fontSize: 23,
    fontWeight: '700',
  },
  selectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  selectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greenDark,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  selectionDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 7,
  },
  selectionText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: '800',
  },
  addVehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  addVehicleIcon: {
    color: COLORS.gold,
    fontSize: 17,
    fontWeight: '800',
    marginRight: 5,
  },
  addVehicleText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 25,
  },
  vehiclesRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 22,
  },
  vehicleCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.card,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 7,
    right: 7,
    zIndex: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#101A30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: COLORS.white,
    fontSize: 18,
    lineHeight: 21,
  },
  vehicleImage: {
    width: '100%',
    height: 85,
    borderRadius: 9,
    backgroundColor: COLORS.cardLight,
  },
  vehicleYear: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '700',
    marginTop: 8,
  },
  vehicleBrand: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '900',
    marginTop: 5,
  },
  vehicleName: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    minHeight: 30,
  },
  vehiclePrice: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 5,
  },
  vehicleColor: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 4,
    marginBottom: 3,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  sectionIcon: {
    color: COLORS.gold,
    fontSize: 17,
    marginRight: 8,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  metricCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  metricLabel: {
    color: '#D7DFEC',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 9,
  },
  metricValues: {
    flexDirection: 'row',
    gap: 7,
  },
  metricValueBox: {
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: COLORS.cardLight,
    paddingHorizontal: 8,
    paddingVertical: 9,
    justifyContent: 'center',
  },
  metricWinnerBox: {
    backgroundColor: COLORS.greenDark,
    borderWidth: 1,
    borderColor: '#2B745B',
  },
  metricValue: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  metricWinnerText: {
    color: COLORS.green,
  },
  leadBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.green,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 5,
  },
  leadBadgeText: {
    color: '#09251D',
    fontSize: 7,
    fontWeight: '900',
  },
  dealerRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dealerCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 11,
  },
  availableLabel: {
    color: COLORS.green,
    fontSize: 8,
    fontWeight: '900',
    marginBottom: 10,
  },
  dealerName: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  dealerAddress: {
    color: COLORS.muted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 6,
  },
  dealerDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 9,
  },
  dealerStatus: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '700',
  },
  analysisCard: {
    backgroundColor: COLORS.card,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 15,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  analysisIcon: {
    color: COLORS.gold,
    fontSize: 17,
    marginRight: 8,
  },
  analysisTitle: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  analysisText: {
    color: '#D5DCE8',
    fontSize: 11,
    lineHeight: 17,
  },
  analysisDisclaimer: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '700',
    marginTop: 10,
  },
  bottomBar: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  scheduleButton: {
    height: 54,
    backgroundColor: COLORS.gold,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleButtonDisabled: {
    opacity: 0.65,
  },
  scheduleIcon: {
    color: '#151A25',
    fontSize: 16,
    marginRight: 9,
  },
  scheduleButtonText: {
    color: '#151A25',
    fontSize: 13,
    fontWeight: '900',
  },
  scheduleArrow: {
    color: '#151A25',
    fontSize: 20,
    fontWeight: '900',
    position: 'absolute',
    right: 17,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 75,
  },
  emptyIcon: {
    color: COLORS.gold,
    fontSize: 55,
    marginBottom: 18,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '900',
  },
  emptyDescription: {
    color: COLORS.muted,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  emptyButton: {
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 14,
    marginTop: 23,
  },
  emptyButtonText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: '900',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    maxHeight: '75%',
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    paddingBottom: 35,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
  },
  modalClose: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: COLORS.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    color: COLORS.white,
    fontSize: 24,
  },
  modalSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  modalCar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    marginBottom: 9,
  },
  modalCarImage: {
    width: 65,
    height: 55,
    borderRadius: 8,
    backgroundColor: COLORS.cardLight,
  },
  modalCarInfo: {
    flex: 1,
    marginLeft: 12,
  },
  modalCarName: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  modalCarDetails: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  modalAddIcon: {
    color: COLORS.gold,
    fontSize: 24,
    fontWeight: '800',
    paddingHorizontal: 8,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 30,
  },
});
