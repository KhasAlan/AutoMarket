
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppTheme } from '@/context/theme-context';

import { cars } from '@/data/mock/cars';
import {
  dealership,
  inventoryCategories,
  inventoryDetails,
} from '@/data/mock/dealership';



type Category = 'All' | 'Coupe' | 'Sedan' | 'SUV';

function getCarCategory(category: string, model: string): Category {
  if (category === 'SUV') return 'SUV';

  if (
    model.toLowerCase().includes('911') ||
    model.toLowerCase().includes('amg') ||
    model.toLowerCase().includes('huracán')
  ) {
    return 'Coupe';
  }

  return 'Sedan';
}

export default function DealershipScreen() {

    const { colors } = useAppTheme();

  const COLORS = {
    background: colors.background,
    card: colors.card,
    cardLight: colors.cardLight,
    gold: colors.gold,
    white: colors.text,
    muted: colors.muted,
    border: colors.border,
    green: colors.green,
    dark: '#071329',
  };

  const styles = useMemo(() => getStyles(COLORS), [colors]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>('All');

const filteredCars = useMemo(() => {
  return cars.filter((car) => {
   
    if (!inventoryDetails[car.id]) return false;

    if (selectedCategory === 'All') return true;

    return (
      getCarCategory(car.category, car.model) === selectedCategory
    );
  });
}, [selectedCategory]);

const handleAction = (action: string) => {
  if (
    action === 'Concierge' ||
    action === 'Message Advisor' ||
    action === 'Book Private Showroom Visit'
  ) {
    router.push('/live-dealer-chat');
    return;
  }

  Alert.alert(
    action,
    'This feature is available in the local demo version.'
  );
};

  const openCarDetails = (id: string) => {
    router.push({
      pathname: '/car-details/[id]',
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
    

      <View style={styles.screen}>
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
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>
                Dealership & Showroom
              </Text>
              <Text style={styles.headerSubtitle}>
                PREMIUM AUTOMOTIVE EXPERIENCE
              </Text>
            </View>

            <Pressable
              style={styles.headerButton}
              onPress={() => handleAction('Share Dealership')}
            >
              <Text style={styles.headerAction}>↗</Text>
            </Pressable>

            <Pressable
              style={styles.headerButton}
              onPress={() => handleAction('Showroom Settings')}
            >
              <Text style={styles.headerAction}>⚙</Text>
            </Pressable>
          </View>

          {/* Live status */}
          <View style={styles.liveStatus}>
            <View style={styles.liveDot} />
            <Text style={styles.liveStatusText}>
              SHOWROOM LIVE • ACTIVE CONCIERGE
            </Text>
          </View>

          {/* Dealership image */}
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: dealership.image }}
              style={styles.heroImage}
              resizeMode="cover"
            />

            <View style={styles.imageBottomOverlay}>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingText}>
                  {dealership.rating} ({dealership.reviews})
                </Text>
              </View>
            </View>
          </View>

          {/* Dealership information */}
          <View style={styles.dealerInfo}>
            <Text style={styles.dealerName}>
              {dealership.name}
            </Text>

            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>
                ✓ VERIFIED DEALER
              </Text>
            </View>

            <View style={styles.addressRow}>
              <Text style={styles.addressIcon}>⌖</Text>
              <Text style={styles.addressText}>
                {dealership.distance} • {dealership.address}
              </Text>
            </View>
          </View>

          {/* Main actions */}
          <View style={styles.actionsRow}>
            <Pressable
              style={styles.actionButton}
              onPress={() => handleAction('Directions')}
            >
              <Text style={styles.actionIcon}>⌖</Text>
              <Text style={styles.actionText}>Directions</Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={() => handleAction('Call Dealer')}
            >
              <Text style={styles.actionIcon}>☎</Text>
              <Text style={styles.actionText}>Call Dealer</Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={() => handleAction('Concierge')}
            >
              <Text style={styles.actionIcon}>▣</Text>
              <Text style={styles.actionText}>Concierge</Text>
            </Pressable>
          </View>

          {/* Working hours */}
          <Pressable
            style={styles.hoursCard}
            onPress={() => handleAction('Showroom Hours')}
          >
            <View style={styles.hoursIconContainer}>
              <Text style={styles.hoursIcon}>◷</Text>
            </View>

            <View style={styles.hoursContent}>
              <View style={styles.hoursTitleRow}>
                <Text style={styles.openText}>
                  {dealership.workingHours.status}
                </Text>
                <Text style={styles.hoursTime}>
                  {dealership.workingHours.hours}
                </Text>
              </View>

              <Text style={styles.hoursDescription}>
                {dealership.workingHours.description}
              </Text>
            </View>

            <Text style={styles.chevron}>⌄</Text>
          </Pressable>

          {/* Amenities */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                SHOWROOM AMENITIES
              </Text>
              <Text style={styles.sectionCaption}>
                EXCLUSIVE ACCESS
              </Text>
            </View>

            <View style={styles.amenitiesGrid}>
              {dealership.amenities.map((amenity) => (
                <View
                  key={amenity.id}
                  style={styles.amenityItem}
                >
                  <Text style={styles.amenityIcon}>
                    {amenity.icon}
                  </Text>
                  <Text
                    style={styles.amenityName}
                    numberOfLines={1}
                  >
                    {amenity.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Inventory header */}
          <View style={styles.inventoryHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Live Inventory
              </Text>
              <Text style={styles.inventorySubtitle}>
                {filteredCars.length} Vehicles in Stock
              </Text>
            </View>

            <Pressable
              onPress={() => router.push('/(tabs)/catalog')}
            >
              <Text style={styles.viewAll}>View All ↗</Text>
            </Pressable>
          </View>

          {/* Inventory categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {inventoryCategories.map((category) => {
              const active = selectedCategory === category;

              return (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryButton,
                    active && styles.categoryButtonActive,
                  ]}
                  onPress={() =>
                    setSelectedCategory(category as Category)
                  }
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive,
                    ]}
                  >
                    {category === 'All'
                      ? `All (${cars.length})`
                      : category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Inventory cards */}
          <View style={styles.inventoryList}>
            {filteredCars.map((car) => {
              const details = inventoryDetails[car.id];

              return (
                <View
                  key={car.id}
                  style={styles.carCard}
                >
                  <Pressable
                    onPress={() => openCarDetails(car.id)}
                  >
                    <View style={styles.carImageContainer}>
                      <Image
                        source={{ uri: car.image }}
                        style={styles.carImage}
                        resizeMode="cover"
                      />

                      <View style={styles.carBadge}>
                        <Text style={styles.carBadgeText}>
                          {details.badge}
                        </Text>
                      </View>

                      <Pressable
                        style={styles.bookmarkButton}
                        onPress={() =>
                          handleAction('Save Vehicle')
                        }
                      >
                        <Text style={styles.bookmarkIcon}>♧</Text>
                      </Pressable>
                    </View>

                    <View style={styles.carInfo}>
                      <View style={styles.carTitleRow}>
                        <View style={styles.carNameContainer}>
                          <Text style={styles.carTitle}>
                            {car.year} {car.brand}
                          </Text>
                          <Text style={styles.carModel}>
                            {car.model}
                          </Text>
                        </View>

                        <Text style={styles.carPrice}>
                          {car.price}
                        </Text>
                      </View>

                      <Text style={styles.carColor}>
                        {details.color} • {car.category}
                      </Text>

                      <View style={styles.specifications}>
                        <View style={styles.specItem}>
                          <Text style={styles.specLabel}>
                            0–60 MPH
                          </Text>
                          <Text style={styles.specValue}>
                            {details.specifications[0]}
                          </Text>
                        </View>

                        <View style={styles.specItem}>
                          <Text style={styles.specLabel}>
                            OUTPUT
                          </Text>
                          <Text style={styles.specValue}>
                            {details.specifications[1]}
                          </Text>
                        </View>

                        <View style={styles.specItem}>
                          <Text style={styles.specLabel}>
                            TOP SPEED
                          </Text>
                          <Text style={styles.specValue}>
                            {details.specifications[2]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>

                  <View style={styles.carFooter}>
                    <View style={styles.availability}>
                      <Text style={styles.availabilityIcon}>✓</Text>
                      <Text style={styles.availabilityText}>
                        {details.availability}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() =>
                        openCarDetails(car.id)
                      }
                    >
                      <Text style={styles.configureText}>
                        Configure / Reserve →
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}

            {filteredCars.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>
                  No vehicles found
                </Text>
                <Text style={styles.emptySubtitle}>
                  Try another inventory category.
                </Text>
              </View>
            )}
          </View>

          {/* Client advisor */}
          <View style={styles.advisorCard}>
            <View style={styles.advisorHeader}>
              <Text style={styles.advisorLabel}>
                DEDICATED CLIENT ADVISOR
              </Text>
              <View style={styles.advisorAvailability}>
                <View style={styles.advisorDot} />
                <Text style={styles.advisorAvailableText}>
                  {dealership.advisor.availability}
                </Text>
              </View>
            </View>

            <View style={styles.advisorContent}>
              <Image
                source={{
                  uri: dealership.advisor.image,
                }}
                style={styles.advisorImage}
              />

              <View style={styles.advisorInfo}>
                <Text style={styles.advisorName}>
                  {dealership.advisor.name}
                </Text>
                <Text style={styles.advisorRole}>
                  {dealership.advisor.role}
                </Text>
              </View>

              <Pressable
                style={styles.advisorAction}
                onPress={() => handleAction('Call Advisor')}
              >
                <Text style={styles.advisorActionIcon}>☎</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.advisorAction,
                  styles.advisorMessageAction,
                ]}
                onPress={() => handleAction('Message Advisor')}
              >
                <Text style={styles.advisorActionIcon}>✉</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* Bottom showroom booking */}
        <View style={styles.bottomBar}>
          <Pressable
            style={styles.bottomIconButton}
            onPress={() => handleAction('Concierge')}
          >
            <Text style={styles.bottomIcon}>▣</Text>
          </Pressable>

          <Pressable
            style={styles.bookingButton}
            onPress={() =>
              handleAction('Book Private Showroom Visit')
            }
          >
            <Text style={styles.bookingIcon}>▣</Text>
            <Text style={styles.bookingText}>
              Book Private Showroom Visit
            </Text>
            <Text style={styles.bookingArrow}>→</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (COLORS: {
  background: string;
  card: string;
  cardLight: string;
  gold: string;
  white: string;
  muted: string;
  border: string;
  green: string;
  dark: string;
}) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 17,
  },
  headerButton: {
    width: 37,
    height: 39,
    borderRadius: 11,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 34,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 1,
    marginTop: 4,
  },
  headerAction: {
    color: COLORS.gold,
    fontSize: 19,
  },
  liveStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#173B4B',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 12,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 7,
  },
  liveStatusText: {
    color: '#A9EBD1',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  heroImageContainer: {
    height: 185,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageBottomOverlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 23, 53, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 9,
  },
  ratingStar: {
    color: COLORS.gold,
    fontSize: 13,
    marginRight: 5,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  dealerInfo: {
    marginTop: 17,
  },
  dealerName: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '900',
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4A3B18',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    marginTop: 8,
  },
  verifiedText: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },
  addressIcon: {
    color: COLORS.gold,
    fontSize: 17,
    marginRight: 6,
  },
  addressText: {
    color: COLORS.muted,
    fontSize: 11,
    flex: 1,
    lineHeight: 17,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 17,
  },
  actionButton: {
    flex: 1,
    height: 64,
    borderRadius: 13,
    backgroundColor: COLORS.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    color: COLORS.gold,
    fontSize: 20,
    marginBottom: 4,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  hoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    marginTop: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hoursIconContainer: {
    width: 37,
    height: 37,
    borderRadius: 10,
    backgroundColor: COLORS.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  hoursIcon: {
    color: COLORS.gold,
    fontSize: 22,
  },
  hoursContent: {
    flex: 1,
  },
  hoursTitleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 7,
  },
  openText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: '800',
  },
  hoursTime: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
  },
  hoursDescription: {
    color: COLORS.gold,
    fontSize: 9,
    marginTop: 5,
  },
  chevron: {
    color: COLORS.muted,
    fontSize: 20,
    marginLeft: 5,
  },
  section: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '900',
  },
  sectionCaption: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  amenityItem: {
    width: '48%',
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  amenityIcon: {
    color: COLORS.gold,
    fontSize: 15,
    marginRight: 7,
  },
  amenityName: {
    flex: 1,
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
  },
  inventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 14,
  },
  inventorySubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 5,
  },
  viewAll: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '800',
  },
  categories: {
    gap: 8,
    paddingBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    height: 34,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  categoryText: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: COLORS.dark,
    fontWeight: '900',
  },
  inventoryList: {
    gap: 17,
  },
  carCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  carImageContainer: {
    height: 180,
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  carBadge: {
    position: 'absolute',
    top: 11,
    left: 11,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  carBadgeText: {
    color: COLORS.dark,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 33,
    height: 33,
    borderRadius: 10,
    backgroundColor: 'rgba(9, 23, 53, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkIcon: {
    color: COLORS.white,
    fontSize: 19,
  },
  carInfo: {
    paddingHorizontal: 13,
    paddingTop: 13,
  },
  carTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 7,
  },
  carNameContainer: {
    flex: 1,
  },
  carTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '900',
  },
  carModel: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },
  carPrice: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '900',
  },
  carColor: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 7,
  },
  specifications: {
    flexDirection: 'row',
    backgroundColor: '#10244A',
    borderRadius: 11,
    paddingVertical: 11,
    marginTop: 13,
    marginBottom: 12,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  specValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 5,
  },
  carFooter: {
    minHeight: 43,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingBottom: 12,
    gap: 7,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  availabilityIcon: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: '900',
    marginRight: 4,
  },
  availabilityText: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: '700',
    flexShrink: 1,
  },
  configureText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: COLORS.card,
    borderRadius: 14,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  emptySubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 7,
  },
  advisorCard: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 13,
    marginTop: 23,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  advisorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  advisorLabel: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  advisorAvailability: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  advisorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.green,
    marginRight: 5,
  },
  advisorAvailableText: {
    color: COLORS.green,
    fontSize: 8,
    fontWeight: '700',
  },
  advisorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  advisorImage: {
    width: 43,
    height: 43,
    borderRadius: 22,
  },
  advisorInfo: {
    flex: 1,
    marginLeft: 10,
  },
  advisorName: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  advisorRole: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 4,
  },
  advisorAction: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: COLORS.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
  },
  advisorMessageAction: {
    backgroundColor: '#695222',
  },
  advisorActionIcon: {
    color: COLORS.white,
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  bottomIconButton: {
    width: 46,
    height: 47,
    borderRadius: 13,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIcon: {
    color: COLORS.gold,
    fontSize: 20,
  },
  bookingButton: {
    flex: 1,
    height: 47,
    borderRadius: 12,
    backgroundColor: COLORS.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  bookingIcon: {
    color: COLORS.dark,
    fontSize: 15,
    marginRight: 8,
  },
  bookingText: {
    color: COLORS.dark,
    fontSize: 11,
    fontWeight: '900',
    flex: 1,
    textAlign: 'center',
  },
  bookingArrow: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 5,
  },
});
