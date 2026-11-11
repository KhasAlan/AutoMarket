
import { useAppTheme } from '@/context/theme-context';
import { useLanguage } from '@/context/language-context';
import { useFavorites } from '@/context/favorites-context';
import { cars } from '@/data/mock/cars';

import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeColors = ReturnType<typeof useAppTheme>['colors'];

const categories = [
  { id: 'Electric', key: 'electric' as const, icon: '⚡' },
  { id: 'Hybrid', key: 'hybrid' as const, icon: '♻' },
  { id: 'Supercars', key: 'supercars' as const, icon: '🏎' },
  { id: 'GT', key: 'gt' as const, icon: '🏁' },
  { id: 'Luxury', key: 'luxury' as const, icon: '✦' },
  { id: 'SUVs', key: 'suvs' as const, icon: '🚙' },
  { id: 'Convertibles', key: 'convertibles' as const, icon: '☀' },
  { id: 'Executive Sedans', key: 'executiveSedans' as const, icon: '◈' },
  { id: 'Track Edition', key: 'trackEdition' as const, icon: '🏁' },
];

const categoryMatches: Record<string, string[]> = {
  Electric: ['electric'],
  Hybrid: ['hybrid'],
  Supercars: ['supercar', 'sports'],
  GT: ['gt'],
  Luxury: ['luxury'],
  SUVs: ['suv'],
  Convertibles: ['convertible', 'cabriolet'],
  'Executive Sedans': ['sedan', 'executive'],
  'Track Edition': ['track', 'racing'],
};

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { t } = useLanguage();
  const styles = getStyles(colors);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const searchText =
        `${car.brand} ${car.model} ${car.year}`.toLowerCase();

      const matchesSearch = searchText.includes(
        search.toLowerCase().trim()
      );

      const carCategory = String(car.category).toLowerCase();

      const matchesCategory =
        !selectedCategory ||
        (categoryMatches[selectedCategory] ?? []).some((value) =>
          carCategory.includes(value)
        );

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleCarPress = (carId: string) => {
    router.push({
      pathname: '/car-details/[id]',
      params: { id: carId },
    });
  };

  const handleFavoritePress = (car: (typeof cars)[number]) => {
    const added = toggleFavorite(car);

    Alert.alert(
      t('favoritesTitle'),
      `${car.brand} ${car.model} ${
        added
          ? t('addedToFavorites')
          : t('removedFromFavorites')
      }`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              AUTO<Text style={styles.logoGold}>MARKET</Text>
            </Text>

            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>⌖</Text>
              <Text style={styles.location}>
                Baku, Azerbaijan
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              style={styles.notificationButton}
              onPress={() =>
                Alert.alert(
                  t('notificationsTitle'),
                  t('noNewNotifications')
                )
              }
            >
              <Text style={styles.notificationIcon}>♧</Text>
              <View style={styles.notificationDot} />
            </Pressable>

            <Pressable
              style={styles.avatar}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Text style={styles.avatarText}>AM</Text>
            </Pressable>
          </View>
        </View>

        {/* WELCOME */}
        <View style={styles.welcomeSection}>
          <View style={styles.eyebrowRow}>
            <View style={styles.goldDot} />
            <Text style={styles.eyebrow}>
              {t('premiumMarketplace')}
            </Text>
          </View>

          <Text style={styles.title}>
            {t('findYour')}{' '}
            <Text style={styles.goldText}>
              {t('perfectDrive')}
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            {t('homeSubtitle')}
          </Text>
        </View>

        {/* SEARCH CAR */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder={t('searchCar')}
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            returnKeyType="search"
          />

          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Text style={styles.clearSearch}>×</Text>
            </Pressable>
          )}

          <Pressable
            style={styles.filterButton}
            onPress={() => router.push('/(tabs)/filters')}
          >
            <Text style={styles.filterIcon}>☷</Text>
          </Pressable>
        </View>

        {/* CURATED FOR YOU */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {t('curatedForYou')}
            </Text>
            <Text style={styles.sectionSubtitle}>
              {t('handpickedForYou')}
            </Text>
          </View>

          <Pressable
            onPress={() => router.push('/(tabs)/catalog')}
          >
            <Text style={styles.seeAll}>
              {t('seeAll')} ›
            </Text>
          </Pressable>
        </View>

        {filteredCars.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carCarousel}
          >
            {filteredCars.map((car) => (
              <Pressable
                key={car.id}
                style={styles.carCard}
                onPress={() => handleCarPress(car.id)}
              >
                <View style={styles.carImageContainer}>
                  <Image
                    source={{ uri: car.image }}
                    style={styles.carImage}
                    resizeMode="cover"
                  />

                  {car.featured && (
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredText}>
                        {t('featured')}
                      </Text>
                    </View>
                  )}

                  <Pressable
                    style={styles.favoriteButton}
                    onPress={() => handleFavoritePress(car)}
                  >
                    <Text
                      style={[
                        styles.favoriteIcon,
                        isFavorite(car.id) && styles.favoriteActive,
                      ]}
                    >
                      {isFavorite(car.id) ? '♥' : '♡'}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.carInfo}>
                  <Text style={styles.carBrand}>
                    {car.brand}
                  </Text>

                  <Text
                    style={styles.carModel}
                    numberOfLines={1}
                  >
                    {car.model}
                  </Text>

                  <View style={styles.carDetailsRow}>
                    <Text style={styles.carYear}>
                      {car.year}
                    </Text>
                    <View style={styles.smallDot} />
                    <Text style={styles.carCategory}>
                      {car.category}
                    </Text>
                  </View>

                  <View style={styles.carBottom}>
                    <Text style={styles.priceLabel}>
                      PRICE
                    </Text>
                    <Text style={styles.carPrice}>
                      {car.price}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              {t('noCarsFound')}
            </Text>
            <Text style={styles.emptySubtitle}>
              {t('tryAnotherSearch')}
            </Text>
            <Pressable
              onPress={() => {
                setSearch('');
                setSelectedCategory(null);
              }}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>
                {t('seeAll')}
              </Text>
            </Pressable>
          </View>
        )}

        {/* CATEGORIES */}
        <View style={styles.categorySection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                {t('categories')}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {t('explore')}
              </Text>
            </View>
          </View>

          <View style={styles.categoryGrid}>
            {categories.map((category) => {
              const active = selectedCategory === category.id;

              return (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    active && styles.categoryCardActive,
                  ]}
                  onPress={() => {
                    setSelectedCategory(
                      active ? null : category.id
                    );
                  }}
                >
                  <Text style={styles.categoryIcon}>
                    {category.icon}
                  </Text>

                  <Text
                    style={[
                      styles.categoryName,
                      active && styles.categoryNameActive,
                    ]}
                    numberOfLines={2}
                  >
                    {t(category.key)}
                  </Text>

                  <Text style={styles.categoryArrow}>›</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

     

             <View style={styles.bottomNote}>
          <View style={styles.onlineDot} />
          <Text style={styles.bottomNoteText}>
            {t('bottomNote')}
          </Text>
        </View>


                      {/* DEALERSHIP SHOWROOM */}
        <Pressable
          style={styles.dealershipCard}
          onPress={() => router.push('/dealership')}
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
            }}
            style={styles.dealershipImage}
            resizeMode="cover"
          />

          <View style={styles.dealershipOverlay}>
            <View style={styles.dealershipBadge}>
              <Text style={styles.dealershipBadgeText}>
                ✦ PREMIUM DEALERSHIP
              </Text>
            </View>

            <Text style={styles.dealershipTitle}>
              Discover Our Showroom
            </Text>

            <Text style={styles.dealershipSubtitle}>
              Explore exclusive vehicles and meet your personal advisor.
            </Text>

            <View style={styles.dealershipButton}>
              <Text style={styles.dealershipButtonText}>
                EXPLORE SHOWROOM
              </Text>
              <Text style={styles.dealershipArrow}>→</Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.push('/dealership')}
          style={{
            backgroundColor: colors.gold,
            padding: 15,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: colors.background,
              fontWeight: '900',
              fontSize: 13,
            }}
          >
            TEST — DEALERSHIP SCREEN 12
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStyles(colors: HomeColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 35,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      color: colors.text,
      fontSize: 21,
      fontWeight: '900',
      letterSpacing: 1.5,
    },
    logoGold: {
      color: colors.gold,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    locationIcon: {
      color: colors.gold,
      fontSize: 15,
      marginRight: 5,
    },
    location: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: '500',
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    notificationButton: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationIcon: {
      color: colors.text,
      fontSize: 22,
    },
    notificationDot: {
      position: 'absolute',
      top: 8,
      right: 9,
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.gold,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: colors.background,
      fontSize: 12,
      fontWeight: '900',
    },

    welcomeSection: {
      marginTop: 32,
      marginBottom: 23,
    },
    eyebrowRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 13,
    },
    goldDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.gold,
      marginRight: 8,
    },
    eyebrow: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1.6,
    },
    title: {
      color: colors.text,
      fontSize: 31,
      lineHeight: 39,
      fontWeight: '900',
      letterSpacing: -0.6,
    },
    goldText: {
      color: colors.gold,
    },
    subtitle: {
      color: colors.muted,
      fontSize: 12,
      lineHeight: 20,
      marginTop: 9,
    },

    searchContainer: {
      height: 57,
      backgroundColor: colors.card,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 14,
      paddingRight: 7,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors.cardLight,
    },
    searchIcon: {
      color: colors.muted,
      fontSize: 25,
      marginRight: 9,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      fontSize: 12,
    },
    clearSearch: {
      color: colors.muted,
      fontSize: 22,
      paddingHorizontal: 8,
    },
    filterButton: {
      width: 43,
      height: 43,
      borderRadius: 12,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterIcon: {
      color: colors.background,
      fontSize: 22,
    },

    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 19,
      fontWeight: '800',
    },
    sectionSubtitle: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 5,
    },
    seeAll: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: '800',
    },

    carCarousel: {
      paddingBottom: 8,
      gap: 14,
    },
    carCard: {
      width: 255,
      backgroundColor: colors.card,
      borderRadius: 17,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.cardLight,
    },
    carImageContainer: {
      height: 155,
      backgroundColor: colors.cardLight,
      position: 'relative',
    },
    carImage: {
      width: '100%',
      height: '100%',
    },
    featuredBadge: {
      position: 'absolute',
      top: 11,
      left: 11,
      backgroundColor: colors.gold,
      paddingHorizontal: 9,
      paddingVertical: 6,
      borderRadius: 7,
    },
    featuredText: {
      color: colors.background,
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 0.5,
    },
    favoriteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 34,
      height: 34,
      borderRadius: 11,
      backgroundColor: 'rgba(9,23,53,0.85)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    favoriteIcon: {
      color: '#FFFFFF',
      fontSize: 22,
    },
    favoriteActive: {
      color: '#F15B68',
    },
    carInfo: {
      padding: 13,
    },
    carBrand: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: '600',
    },
    carModel: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '900',
      marginTop: 4,
    },
    carDetailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 9,
      gap: 7,
    },
    carYear: {
      color: colors.muted,
      fontSize: 10,
    },
    smallDot: {
      width: 3,
      height: 3,
      borderRadius: 2,
      backgroundColor: colors.gold,
    },
    carCategory: {
      color: colors.muted,
      fontSize: 10,
    },
    carBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: colors.cardLight,
      marginTop: 12,
      paddingTop: 10,
    },
    priceLabel: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '800',
      letterSpacing: 1,
    },
    carPrice: {
      color: colors.gold,
      fontSize: 16,
      fontWeight: '900',
    },

    categorySection: {
      marginTop: 28,
    },
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: 11,
    },
    categoryCard: {
      width: '31.5%',
      minHeight: 105,
      paddingHorizontal: 9,
      paddingVertical: 12,
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.cardLight,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    categoryCardActive: {
      borderColor: colors.gold,
      backgroundColor: colors.cardLight,
    },
    categoryIcon: {
      fontSize: 20,
      color: colors.gold,
    },
    categoryName: {
      color: colors.text,
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '700',
      marginTop: 9,
    },
    categoryNameActive: {
      color: colors.gold,
    },
    categoryArrow: {
      position: 'absolute',
      right: 9,
      bottom: 9,
      color: colors.gold,
      fontSize: 16,
    },

    emptyState: {
      padding: 24,
      borderRadius: 16,
      backgroundColor: colors.card,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.cardLight,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '800',
    },
    emptySubtitle: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 7,
      textAlign: 'center',
    },
    resetButton: {
      marginTop: 14,
      paddingHorizontal: 18,
      paddingVertical: 9,
      borderRadius: 9,
      backgroundColor: colors.gold,
    },
    resetButtonText: {
      color: colors.background,
      fontSize: 11,
      fontWeight: '800',
    },

    bottomNote: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 28,
      gap: 8,
    },
    onlineDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.green,
    },
    bottomNoteText: {
      color: colors.muted,
      fontSize: 10,
    },


        dealershipCard: {
      height: 230,
      borderRadius: 20,
      overflow: 'hidden',
      marginTop: 25,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.cardLight,
    },
    dealershipImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    dealershipOverlay: {
      flex: 1,
      padding: 18,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(5, 12, 28, 0.62)',
    },
    dealershipBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 7,
      backgroundColor: colors.gold,
      marginBottom: 12,
    },
    dealershipBadgeText: {
      color: '#111827',
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 1,
    },
    dealershipTitle: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: '900',
    },
    dealershipSubtitle: {
      color: '#E5E7EB',
      fontSize: 11,
      lineHeight: 17,
      marginTop: 7,
      maxWidth: '90%',
    },
    dealershipButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.gold,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginTop: 15,
    },
    dealershipButtonText: {
      color: '#111827',
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 0.8,
    },
    dealershipArrow: {
      color: '#111827',
      fontSize: 18,
      fontWeight: '900',
    },
  });
}
