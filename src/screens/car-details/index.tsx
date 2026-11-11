
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';

import { cars } from '../../data/mock/cars';
import { carDetails } from '../../data/mock/car-details';

const COLORS = {
  background: '#080F1E',
  card: '#111C30',
  gold: '#D6AD60',
  white: '#FFFFFF',
  muted: '#8994A8',
  green: '#39C98A',
  border: '#26334A',
};

export default function CarDetailsScreen() {
  const params = useLocalSearchParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

const car = cars.find((item) => item.id === id);

const details = (id ? carDetails[id] : undefined) ?? {
  mileage: 'Not specified',
  engine: 'Not specified',
  horsepower: 'Not specified',
  transmission: 'Not specified',
  fuel: 'Not specified',
  drivetrain: 'Not specified',
  body: car?.category ?? 'Not specified',
  color: 'Not specified',
  description: `${car?.brand ?? ''} ${car?.model ?? ''} — premium vehicle available in ${car?.location ?? 'Baku'}.`,
  features: [
    'Premium Interior',
    'Advanced Safety Systems',
    'Climate Control',
    'Modern Infotainment',
  ],
};

  const [isFavorite, setIsFavorite] = useState(false);

  if (!car || !details) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>
            Car not found
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const specifications = [
    { label: 'Mileage', value: details.mileage, icon: '🛣' },
    { label: 'Engine', value: details.engine, icon: '⚙' },
    { label: 'Horsepower', value: details.horsepower, icon: '🏁' },
    { label: 'Transmission', value: details.transmission, icon: '🔧' },
    { label: 'Fuel Type', value: details.fuel, icon: '⛽' },
    { label: 'Drivetrain', value: details.drivetrain, icon: '🚘' },
    { label: 'Body Type', value: details.body, icon: '🚗' },
    { label: 'Exterior Color', value: details.color, icon: '🎨' },
  ];


const handleTestDrive = () => {
  router.push({
    pathname: '/book-test-drive',
    params: { id: car.id },
  });
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Text style={styles.headerButtonText}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            VEHICLE DETAILS
          </Text>

          <Pressable
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>

        {/* Car Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: car.image }}
            style={styles.carImage}
            resizeMode="cover"
          />

          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>
              {car.featured ? 'FEATURED' : 'PREMIUM'}
            </Text>
          </View>

          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              1 / 1
            </Text>
          </View>
        </View>

        {/* Car Information */}
        <View style={styles.carInfo}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>
              {car.brand}
            </Text>

            <View style={styles.availableBadge}>
              <View style={styles.availableDot} />
              <Text style={styles.availableText}>
                Available
              </Text>
            </View>
          </View>

          <Text style={styles.model}>
            {car.model}
          </Text>

          <Text style={styles.year}>
            {car.year} · {car.category}
          </Text>

          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>⌖</Text>
            <Text style={styles.location}>
              {car.location}
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabel}>
                PRICE
              </Text>
              <Text style={styles.price}>
                {car.price}
              </Text>
            </View>

            <View style={styles.priceTag}>
              <Text style={styles.priceTagText}>
                PREMIUM
              </Text>
            </View>
          </View>
        </View>

        {/* Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Specifications
          </Text>

          <View style={styles.specGrid}>
            {specifications.map((item) => (
              <View
                key={item.label}
                style={styles.specCard}
              >
                <Text style={styles.specIcon}>
                  {item.icon}
                </Text>

                <Text style={styles.specLabel}>
                  {item.label}
                </Text>

                <Text style={styles.specValue}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {details.description}
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Features & Equipment
          </Text>

          <View style={styles.featuresContainer}>
            {details.features.map((feature) => (
              <View
                key={feature}
                style={styles.featureItem}
              >
                <Text style={styles.featureCheck}>✓</Text>
                <Text style={styles.featureText}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Test Drive Button */}
        <Pressable
          style={styles.testDriveButton}
          onPress={handleTestDrive}
        >
          <Text style={styles.testDriveButtonText}>
            Book a Test Drive
          </Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>

        <Text style={styles.footerText}>
          AUTO MARKET · PREMIUM AUTOMOTIVE EXPERIENCE
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
  scrollContent: {
    paddingBottom: 35,
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    color: COLORS.white,
    fontSize: 32,
    lineHeight: 36,
  },
  headerTitle: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  favoriteIcon: {
    color: COLORS.gold,
    fontSize: 25,
  },
  imageContainer: {
    height: 250,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  imageBadgeText: {
    color: COLORS.background,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    backgroundColor: 'rgba(8,15,30,0.85)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  imageCounterText: {
    color: COLORS.white,
    fontSize: 11,
  },
  carInfo: {
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15372F',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
  },
  availableDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.green,
    marginRight: 7,
  },
  availableText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: '600',
  },
  model: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: '800',
    marginTop: 7,
  },
  year: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },
  locationIcon: {
    color: COLORS.gold,
    fontSize: 19,
    marginRight: 7,
  },
  location: {
    color: COLORS.muted,
    fontSize: 13,
  },
  priceContainer: {
    marginTop: 23,
    padding: 18,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  price: {
    color: COLORS.gold,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 5,
  },
  priceTag: {
    borderWidth: 1,
    borderColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  priceTagText: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  section: {
    paddingHorizontal: 22,
    marginTop: 30,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 16,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  specCard: {
    width: '48%',
    minHeight: 112,
    padding: 14,
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  specIcon: {
    fontSize: 19,
    marginBottom: 8,
  },
  specLabel: {
    color: COLORS.muted,
    fontSize: 11,
  },
  specValue: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
  },
  description: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 23,
  },
  featuresContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },
  featureCheck: {
    color: COLORS.gold,
    fontSize: 17,
    fontWeight: '800',
    marginRight: 12,
  },
  featureText: {
    color: COLORS.white,
    fontSize: 13,
  },
  testDriveButton: {
    height: 58,
    marginHorizontal: 22,
    marginTop: 30,
    backgroundColor: COLORS.gold,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testDriveButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: '800',
  },
  buttonArrow: {
    color: COLORS.background,
    fontSize: 22,
    marginLeft: 12,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 1.2,
    textAlign: 'center',
    marginTop: 25,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 12,
  },
  backButtonText: {
    color: COLORS.background,
    fontWeight: '700',
  },
});
