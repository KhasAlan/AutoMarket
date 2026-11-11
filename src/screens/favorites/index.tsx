
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
import { useAppTheme } from '@/context/theme-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useFavorites } from '@/context/favorites-context';
import { carSpecs } from '@/data/mock/car-specs';

type FavoritesColors = ReturnType<typeof useAppTheme>['colors'];

type FilterType = 'All Saved' | 'Price Drops' | 'Available Now';

const PRICE_DROP_IDS = ['1', '3'];
const AVAILABLE_IDS = ['1', '2', '3', '4', '5', '6'];

export default function FavoritesScreen() {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  const {
    favoriteCars,
    selectedCars,
    toggleFavorite,
    toggleCompare,
    isSelectedForCompare,
    clearFavorites,
  } = useFavorites();

  const [activeFilter, setActiveFilter] =
    useState<FilterType>('All Saved');

  const filters: FilterType[] = [
    'All Saved',
    'Price Drops',
    'Available Now',
  ];

  const filteredCars = favoriteCars.filter((car) => {
    if (activeFilter === 'Price Drops') {
      return PRICE_DROP_IDS.includes(car.id);
    }

    if (activeFilter === 'Available Now') {
      return AVAILABLE_IDS.includes(car.id);
    }

    return true;
  });

  const handleClearAll = () => {
    if (favoriteCars.length === 0) return;

    Alert.alert(
      'Clear favorites?',
      'All saved vehicles and comparison selections will be removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: clearFavorites,
        },
      ]
    );
  };

const handleCompare = () => {
  if (selectedCars.length < 2) {
    Alert.alert(
      'Select vehicles',
      'Please select at least 2 vehicles to compare.'
    );
    return;
  }

  router.push('/car-comparison');
};

  const handleToggleCompare = (
    car: (typeof favoriteCars)[number]
  ) => {
    const result = toggleCompare(car);

    if (result === 'limit') {
      Alert.alert(
        'Comparison limit',
        'You can compare a maximum of 3 vehicles.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.logo}>AUTO MARKET</Text>
            <Text style={styles.location}>
              ⌖  Baku, Azerbaijan
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AM</Text>
          </View>
        </View>

        {/* TITLE */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Saved Vehicles</Text>
              <Text style={styles.subtitle}>
                Your personal collection of dream cars
              </Text>
            </View>

            <View style={styles.countBadge}>
              <Text style={styles.countNumber}>
                {favoriteCars.length}
              </Text>
              <Text style={styles.countLabel}>SAVED</Text>
            </View>
          </View>

          <View style={styles.inventoryRow}>
            <View style={styles.liveDot} />
            <Text style={styles.inventoryText}>
              LOCAL DEMO INVENTORY
            </Text>
          </View>
        </View>

        {/* FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.filterButton,
                  active && styles.filterButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* COMPARE TOOLBAR */}
        <View style={styles.compareToolbar}>
          <Pressable
            style={styles.compareButton}
            onPress={handleCompare}
          >
            <Text style={styles.compareIcon}>⇄</Text>

            <Text style={styles.compareButtonText}>
              Select to Compare
            </Text>

            <View style={styles.compareCount}>
              <Text style={styles.compareCountText}>
                {selectedCars.length}/3
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={handleClearAll}>
            <Text style={styles.clearText}>Clear All</Text>
          </Pressable>
        </View>

        {/* VEHICLE LIST */}
        {filteredCars.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>♡</Text>

            <Text style={styles.emptyTitle}>
              {favoriteCars.length === 0
                ? 'No saved vehicles yet'
                : 'No vehicles found'}
            </Text>

            <Text style={styles.emptyText}>
              {favoriteCars.length === 0
                ? 'Explore the catalog and tap the heart to save your favorite cars.'
                : 'There are no saved vehicles in this category.'}
            </Text>

            {favoriteCars.length === 0 && (
              <Pressable
                style={styles.browseButton}
                onPress={() => router.push('/(tabs)/catalog')}
              >
                <Text style={styles.browseButtonText}>
                  Explore Catalog →
                </Text>
              </Pressable>
            )}
          </View>
        ) : (
          filteredCars.map((car) => {
            const specs = carSpecs[car.id];
            const selected = isSelectedForCompare(car.id);
            const hasPriceDrop = PRICE_DROP_IDS.includes(car.id);

            return (
              <View key={car.id} style={styles.carCard}>
                {/* IMAGE */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: car.image }}
                    style={styles.image}
                    resizeMode="cover"
                  />

                  <View style={styles.imageTopRow}>
                    <View style={styles.savedBadge}>
                      <Text style={styles.savedBadgeText}>
                        ♥ SAVED
                      </Text>
                    </View>

                    {hasPriceDrop && (
                      <View style={styles.priceDropBadge}>
                        <Text style={styles.priceDropText}>
                          ↓ PRICE DROP
                        </Text>
                      </View>
                    )}
                  </View>

                  <Pressable
                    style={styles.removeButton}
                    onPress={() => toggleFavorite(car)}
                  >
                    <Text style={styles.removeHeart}>♥</Text>
                  </Pressable>
                </View>

                {/* CAR INFO */}
                <View style={styles.carInfo}>
                  <View style={styles.carHeading}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.carYear}>
                        {car.year}  ·  {car.category.toUpperCase()}
                      </Text>

                      <Text style={styles.carName}>
                        {car.brand} {car.model}
                      </Text>

                      <Text style={styles.carLocation}>
                        ⌖  {car.location}
                      </Text>
                    </View>

                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>
                        {car.price}
                      </Text>
                      <Text style={styles.priceCaption}>
                        LISTED PRICE
                      </Text>
                    </View>
                  </View>

                  {/* SPECIFICATIONS */}
                  <View style={styles.specGrid}>
                    <View style={styles.specItem}>
                      <Text style={styles.specIcon}>◷</Text>
                      <Text style={styles.specValue}>
                        {specs?.mileage ?? 'N/A'}
                      </Text>
                      <Text style={styles.specLabel}>
                        MILEAGE
                      </Text>
                    </View>

                    <View style={styles.specItem}>
                      <Text style={styles.specIcon}>↗</Text>
                      <Text style={styles.specValue}>
                        {specs?.acceleration ?? 'N/A'}
                      </Text>
                      <Text style={styles.specLabel}>
                        0–60 MPH
                      </Text>
                    </View>

                    <View style={styles.specItem}>
                      <Text style={styles.specIcon}>⚡</Text>
                      <Text style={styles.specValue}>
                        {specs?.output ?? 'N/A'}
                      </Text>
                      <Text style={styles.specLabel}>
                        OUTPUT
                      </Text>
                    </View>
                  </View>

                  <View style={styles.engineRow}>
                    <Text style={styles.engineLabel}>
                      POWERTRAIN
                    </Text>
                    <Text style={styles.engineValue}>
                      {specs?.engine ?? 'Not specified'}
                    </Text>
                  </View>

                  {specs?.range && (
                    <View style={styles.engineRow}>
                      <Text style={styles.engineLabel}>
                        RANGE
                      </Text>
                      <Text style={styles.engineValue}>
                        {specs.range}
                      </Text>
                    </View>
                  )}

                  {/* ACTIONS */}
                  <View style={styles.actions}>
                    <Pressable
                      style={styles.scheduleButton}
                      onPress={() =>
                        router.push({
                          pathname: '/book-test-drive',
                          params: { id: car.id },
                        })
                      }
                    >
                      <Text style={styles.scheduleButtonText}>
                        Schedule Drive
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.detailsButton}
                      onPress={() =>
                        router.push(`/car-details/${car.id}`)
                      }
                    >
                      <Text style={styles.detailsButtonText}>
                        View Details →
                      </Text>
                    </Pressable>
                  </View>

                  {/* COMPARE */}
                  <Pressable
                    style={[
                      styles.selectCompare,
                      selected && styles.selectCompareActive,
                    ]}
                    onPress={() => handleToggleCompare(car)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selected && styles.checkboxActive,
                      ]}
                    >
                      {selected && (
                        <Text style={styles.checkboxCheck}>
                          ✓
                        </Text>
                      )}
                    </View>

                    <Text
                      style={[
                        styles.selectCompareText,
                        selected && styles.selectCompareTextActive,
                      ]}
                    >
                      {selected
                        ? 'Selected for Comparison'
                        : 'Select to Compare'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })
        )}

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            AUTO MARKET  ·  PREMIUM AUTOMOTIVE EXPERIENCE
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStyles(colors: FavoritesColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 25,
    },
    topBar: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      color: colors.gold,
      fontSize: 15,
      fontWeight: '900',
      letterSpacing: 2,
    },
    location: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 5,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: colors.gold,
      fontSize: 12,
      fontWeight: '800',
    },
    header: {
      paddingHorizontal: 20,
      paddingBottom: 18,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: colors.text,
      fontSize: 27,
      fontWeight: '900',
    },
    subtitle: {
      color: colors.muted,
      fontSize: 12,
      marginTop: 7,
    },
    countBadge: {
      minWidth: 55,
      padding: 9,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: 'center',
    },
    countNumber: {
      color: colors.gold,
      fontSize: 19,
      fontWeight: '900',
    },
    countLabel: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '800',
      marginTop: 2,
    },
    inventoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 17,
    },
    liveDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.green,
      marginRight: 8,
    },
    inventoryText: {
      color: colors.green,
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1.4,
    },
    filterContainer: {
      paddingHorizontal: 20,
      paddingBottom: 18,
      gap: 9,
    },
    filterButton: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    filterButtonActive: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },
    filterText: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: '700',
    },
    filterTextActive: {
      color: colors.background,
    },
    compareToolbar: {
      marginHorizontal: 20,
      marginBottom: 17,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    compareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardLight,
      borderRadius: 11,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    compareIcon: {
      color: colors.gold,
      fontSize: 17,
      marginRight: 8,
    },
    compareButtonText: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '700',
    },
    compareCount: {
      backgroundColor: colors.gold,
      borderRadius: 7,
      paddingHorizontal: 7,
      paddingVertical: 4,
      marginLeft: 9,
    },
    compareCountText: {
      color: colors.background,
      fontSize: 10,
      fontWeight: '900',
    },
    clearText: {
      color: '#F15B68',
      fontSize: 11,
      fontWeight: '700',
    },
    carCard: {
      marginHorizontal: 16,
      marginBottom: 20,
      backgroundColor: colors.card,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    imageContainer: {
      height: 190,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageTopRow: {
      position: 'absolute',
      top: 12,
      left: 12,
      right: 55,
      flexDirection: 'row',
      gap: 8,
    },
    savedBadge: {
      backgroundColor: colors.cardLight,
      borderRadius: 7,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },
    savedBadgeText: {
      color: colors.green,
      fontSize: 9,
      fontWeight: '900',
    },
    priceDropBadge: {
      backgroundColor: colors.cardLight,
      borderRadius: 7,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },
    priceDropText: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
    },
    removeButton: {
      position: 'absolute',
      top: 11,
      right: 11,
      width: 35,
      height: 35,
      borderRadius: 11,
      backgroundColor: '#091735DD',
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeHeart: {
      color: '#F15B68',
      fontSize: 19,
    },
    carInfo: {
      padding: 15,
    },
    carHeading: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    carYear: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1,
    },
    carName: {
      color: colors.text,
      fontSize: 19,
      fontWeight: '900',
      marginTop: 6,
    },
    carLocation: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 6,
    },
    priceContainer: {
      alignItems: 'flex-end',
      marginLeft: 8,
    },
    price: {
      color: colors.gold,
      fontSize: 17,
      fontWeight: '900',
    },
    priceCaption: {
      color: colors.muted,
      fontSize: 8,
      marginTop: 5,
      letterSpacing: 1,
    },
    specGrid: {
      flexDirection: 'row',
      marginTop: 18,
      paddingVertical: 14,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    specItem: {
      flex: 1,
      alignItems: 'center',
      borderRightWidth: 1,
      borderColor: colors.border,
    },
    specIcon: {
      color: colors.gold,
      fontSize: 16,
      marginBottom: 5,
    },
    specValue: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '800',
    },
    specLabel: {
      color: colors.muted,
      fontSize: 8,
      marginTop: 5,
      letterSpacing: 0.7,
    },
    engineRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12,
    },
    engineLabel: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 0.7,
    },
    engineValue: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '700',
    },
    actions: {
      flexDirection: 'row',
      gap: 9,
      marginTop: 17,
    },
    scheduleButton: {
      flex: 1,
      minHeight: 43,
      borderRadius: 10,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scheduleButtonText: {
      color: colors.background,
      fontSize: 11,
      fontWeight: '900',
    },
    detailsButton: {
      flex: 1,
      minHeight: 43,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsButtonText: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '800',
    },
    selectCompare: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 13,
      paddingTop: 12,
      borderTopWidth: 1,
      borderColor: colors.border,
    },
    selectCompareActive: {
      borderColor: '#42634F',
    },
    checkbox: {
      width: 19,
      height: 19,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 9,
    },
    checkboxActive: {
      backgroundColor: colors.green,
      borderColor: colors.green,
    },
    checkboxCheck: {
      color: colors.background,
      fontSize: 13,
      fontWeight: '900',
    },
    selectCompareText: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: '700',
    },
    selectCompareTextActive: {
      color: colors.green,
    },
    empty: {
      alignItems: 'center',
      paddingHorizontal: 35,
      paddingTop: 65,
      paddingBottom: 60,
    },
    emptyIcon: {
      color: colors.gold,
      fontSize: 60,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '900',
      marginTop: 15,
    },
    emptyText: {
      color: colors.muted,
      fontSize: 13,
      textAlign: 'center',
      lineHeight: 21,
      marginTop: 9,
    },
    browseButton: {
      marginTop: 20,
      paddingHorizontal: 20,
      paddingVertical: 13,
      backgroundColor: colors.gold,
      borderRadius: 11,
    },
    browseButtonText: {
      color: colors.background,
      fontSize: 12,
      fontWeight: '900',
    },
    footer: {
      paddingVertical: 18,
      alignItems: 'center',
    },
    footerText: {
      color: colors.muted,
      fontSize: 8,
      letterSpacing: 1,
    },
  });
}
