
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
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useAppTheme } from '@/context/theme-context';
import { useFavorites } from '@/context/favorites-context';
import { useLanguage } from '@/context/language-context';
import { cars } from '../../data/mock/cars';

type CatalogColors = ReturnType<typeof useAppTheme>['colors'];

const categories = ['All', 'Sports', 'Electric', 'SUV'] as const;
type Category = (typeof categories)[number];

const translations = {
  EN: {
    catalog: 'Car Catalog',
    subtitle: 'Discover your next drive',
    location: 'BEVERLY HILLS, CA',
    search: 'Search make, model or year',
    found: 'Vehicles Found',
    available: 'vehicles available',
    sort: 'Price (Low to High)',
    filters: 'Filters',
    all: 'All',
    sports: 'Sports',
    electric: 'Electric',
    suv: 'SUV',
    certified: 'Certified Pre-Owned',
    coupe: 'Coupe & SUV',
    featured: 'FEATURED',
    certifiedBadge: 'CERTIFIED PRE-OWNED',
    compare: 'Compare',
    testDrive: 'Test Drive',
    details: 'View Details',
    price: 'PRICE',
    locationLabel: 'LOCATION',
    year: 'YEAR',
    empty: 'No vehicles found',
    emptyText: 'Try changing your search or filters.',
    reset: 'Reset Search',
    compareTitle: 'Compare vehicles',
    compareAdded: 'Vehicle added to comparison',
    inquire: 'Inquire',
    selected: 'Selected for comparison',
  },
  RU: {
    catalog: 'Каталог автомобилей',
    subtitle: 'Найди свой следующий автомобиль',
    location: 'БЕВЕРЛИ-ХИЛЛЗ, КАЛИФОРНИЯ',
    search: 'Марка, модель или год',
    found: 'Найдено автомобилей',
    available: 'автомобилей доступно',
    sort: 'Сначала дешевле',
    filters: 'Фильтры',
    all: 'Все',
    sports: 'Спорткары',
    electric: 'Электро',
    suv: 'Внедорожники',
    certified: 'Проверенные авто',
    coupe: 'Купе и SUV',
    featured: 'РЕКОМЕНДУЕМ',
    certifiedBadge: 'ПРОВЕРЕННЫЙ АВТОМОБИЛЬ',
    compare: 'Сравнить',
    testDrive: 'Тест-драйв',
    details: 'Подробнее',
    price: 'ЦЕНА',
    locationLabel: 'ЛОКАЦИЯ',
    year: 'ГОД',
    empty: 'Автомобили не найдены',
    emptyText: 'Попробуй изменить поиск или фильтры.',
    reset: 'Сбросить поиск',
    compareTitle: 'Сравнение автомобилей',
    compareAdded: 'Автомобиль добавлен к сравнению',
    inquire: 'Запросить',
    selected: 'Выбран для сравнения',
  },
  TR: {
    catalog: 'Araç Kataloğu',
    subtitle: 'Bir sonraki aracını keşfet',
    location: 'BEVERLY HILLS, CA',
    search: 'Marka, model veya yıl ara',
    found: 'Bulunan Araçlar',
    available: 'araç mevcut',
    sort: 'Önce düşük fiyat',
    filters: 'Filtreler',
    all: 'Tümü',
    sports: 'Spor',
    electric: 'Elektrikli',
    suv: 'SUV',
    certified: 'Onaylı İkinci El',
    coupe: 'Coupe ve SUV',
    featured: 'ÖNE ÇIKAN',
    certifiedBadge: 'ONAYLI İKİNCİ EL',
    compare: 'Karşılaştır',
    testDrive: 'Test Sürüşü',
    details: 'Detayları Gör',
    price: 'FİYAT',
    locationLabel: 'KONUM',
    year: 'YIL',
    empty: 'Araç bulunamadı',
    emptyText: 'Aramanı veya filtrelerini değiştirmeyi dene.',
    reset: 'Aramayı Sıfırla',
    compareTitle: 'Araç karşılaştırma',
    compareAdded: 'Araç karşılaştırmaya eklendi',
    inquire: 'Bilgi Al',
    selected: 'Karşılaştırma için seçildi',
  },
  AZ: {
    catalog: 'Avtomobil Kataloqu',
    subtitle: 'Növbəti avtomobilini kəşf et',
    location: 'BEVERLY HILLS, CA',
    search: 'Marka, model və ya il axtar',
    found: 'Tapılan avtomobillər',
    available: 'avtomobil mövcuddur',
    sort: 'Əvvəlcə ucuz',
    filters: 'Filtrlər',
    all: 'Hamısı',
    sports: 'Sport',
    electric: 'Elektrik',
    suv: 'SUV',
    certified: 'Yoxlanılmış avtomobillər',
    coupe: 'Coupe və SUV',
    featured: 'SEÇİLMİŞ',
    certifiedBadge: 'YOXLANILMIŞ AVTOMOBİL',
    compare: 'Müqayisə',
    testDrive: 'Test sürüşü',
    details: 'Ətraflı bax',
    price: 'QİYMƏT',
    locationLabel: 'MƏKAN',
    year: 'İL',
    empty: 'Avtomobil tapılmadı',
    emptyText: 'Axtarışı və ya filtrləri dəyişməyi yoxla.',
    reset: 'Axtarışı sıfırla',
    compareTitle: 'Avtomobillərin müqayisəsi',
    compareAdded: 'Avtomobil müqayisəyə əlavə edildi',
    inquire: 'Sorğu göndər',
    selected: 'Müqayisə üçün seçildi',
  },
};

export default function CatalogScreen() {
  const { colors } = useAppTheme();
  const { language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  const styles = useMemo(() => getStyles(colors), [colors]);
  const tr = translations[language];

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<Category>('All');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [sortAscending, setSortAscending] = useState(true);

  const filteredCars = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = cars.filter((car) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        String(car.category).toLowerCase().includes(
          selectedCategory.toLowerCase()
        );

      const matchesSearch =
        !normalizedSearch ||
        `${car.brand} ${car.model} ${car.year}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    return [...result].sort((a, b) => {
      const priceA = Number(String(a.price).replace(/[^0-9.]/g, ''));
      const priceB = Number(String(b.price).replace(/[^0-9.]/g, ''));

      if (!Number.isFinite(priceA) || !Number.isFinite(priceB)) {
        return 0;
      }

      return sortAscending ? priceA - priceB : priceB - priceA;
    });
  }, [search, selectedCategory, sortAscending]);

  const openCarDetails = (id: string) => {
    router.push({
      pathname: '/car-details/[id]',
      params: { id },
    });
  };


  const handleFavorite = (car: (typeof cars)[number]) => {
  toggleFavorite(car);
};

  const handleCompare = (id: string) => {
    setCompareIds((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      if (previous.length >= 2) {
        Alert.alert(
          tr.compareTitle,
          language === 'RU'
            ? 'Можно выбрать не более двух автомобилей.'
            : language === 'TR'
              ? 'En fazla iki araç seçebilirsin.'
              : language === 'AZ'
                ? 'Ən çox iki avtomobil seçə bilərsən.'
                : 'You can select up to two vehicles.'
        );
        return previous;
      }

      Alert.alert(tr.compareTitle, tr.compareAdded);
      return [...previous, id];
    });
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
  };

  const categoryLabels: Record<Category, string> = {
    All: tr.all,
    Sports: tr.sports,
    Electric: tr.electric,
    SUV: tr.suv,
  };

  const getImageSource = (image: string): ImageSourcePropType => ({
    uri: image,
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoMarkText}>A</Text>
            </View>

            <View>
              <Text style={styles.logoText}>AutoMarket</Text>
              <Text style={styles.logoSubtitle}>PREMIUM AUTOMOTIVE</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.locationBlock}>
              <Text style={styles.locationCaption}>YOUR LOCATION</Text>
              <Text style={styles.locationText}>{tr.location}</Text>
            </View>

            <Pressable
              style={styles.headerIcon}
              onPress={() =>
                Alert.alert(
                  'AutoMarket',
                  language === 'RU'
                    ? 'Уведомлений пока нет.'
                    : 'No new notifications.'
                )
              }
            >
              <Text style={styles.headerIconText}>♧</Text>
              <View style={styles.notificationDot} />
            </Pressable>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
          </View>
        </View>

        {/* TITLE */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.screenTitle}>{tr.catalog}</Text>
            <Text style={styles.screenSubtitle}>{tr.subtitle}</Text>
          </View>

          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE INVENTORY</Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder={tr.search}
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            returnKeyType="search"
          />

          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Text style={styles.clearSearch}>✕</Text>
            </Pressable>
          )}

          <Pressable
            style={styles.filterButton}
            onPress={() => router.push('/(tabs)/filters')}
          >
            <Text style={styles.filterButtonIcon}>☷</Text>
            <Text style={styles.filterButtonText}>{tr.filters}</Text>
          </Pressable>
        </View>

        {/* CATEGORY CHIPS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  active && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    active && styles.categoryChipTextActive,
                  ]}
                >
                  {categoryLabels[category]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickFilters}
        >
          <View style={styles.quickFilterChip}>
            <Text style={styles.quickFilterText}>✦ {tr.coupe}</Text>
            <Text style={styles.quickFilterClose}>×</Text>
          </View>

          <View style={styles.quickFilterChip}>
            <Text style={styles.quickFilterText}>✓ {tr.certified}</Text>
            <Text style={styles.quickFilterClose}>×</Text>
          </View>

          <Pressable
            style={styles.addFilterChip}
            onPress={() => router.push('/(tabs)/filters')}
          >
            <Text style={styles.addFilterText}>＋ Add</Text>
          </Pressable>
        </ScrollView>

        {/* RESULTS HEADER */}
        <View style={styles.resultsHeader}>
          <View>
            <Text style={styles.resultsTitle}>
              {filteredCars.length} {tr.found}
            </Text>
            <Text style={styles.resultsSubtitle}>
              {filteredCars.length} {tr.available}
            </Text>
          </View>

          <Pressable
            style={styles.sortButton}
            onPress={() => setSortAscending((value) => !value)}
          >
            <Text style={styles.sortIcon}>↕</Text>
            <Text style={styles.sortText}>
              {sortAscending ? tr.sort : 'Price (High to Low)'}
            </Text>
            <Text style={styles.sortArrow}>⌄</Text>
          </Pressable>
        </View>

        {/* VEHICLE LIST */}
        <View style={styles.vehicleList}>
          {filteredCars.map((car) => {
            const favorite = isFavorite(car.id);
            const selected = compareIds.includes(car.id);

            return (
              <View key={car.id} style={styles.vehicleCard}>
                <Pressable
                  style={styles.imageContainer}
                  onPress={() => openCarDetails(car.id)}
                >
                  <Image
                    source={getImageSource(car.image)}
                    style={styles.vehicleImage}
                    resizeMode="cover"
                  />

                  <View style={styles.imageOverlay} />

                  {car.featured && (
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>
                        ✦ {tr.featured}
                      </Text>
                    </View>
                  )}

                  <Pressable
                    style={styles.favoriteButton}
                    onPress={() => handleFavorite(car)}
                  >
                    <Text
                      style={[
                        styles.favoriteIcon,
                        favorite && styles.favoriteIconActive,
                      ]}
                    >
                      {favorite ? '♥' : '♡'}
                    </Text>
                  </Pressable>

                  <View style={styles.imageCounter}>
                    <Text style={styles.imageCounterText}>◉ 01 / 08</Text>
                  </View>
                </Pressable>

                <View style={styles.vehicleInfo}>
                  <View style={styles.vehicleTopLine}>
                    <View style={styles.vehicleNameBlock}>
                      <Text style={styles.vehicleBrand}>
                        {car.year} {car.brand}
                      </Text>
                      <Text style={styles.vehicleModel}>{car.model}</Text>
                    </View>

                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓ VERIFIED</Text>
                    </View>
                  </View>

                  <View style={styles.vehicleMeta}>
                    <Text style={styles.metaText}>
                      ◈ {car.category}
                    </Text>
                    <Text style={styles.metaSeparator}>•</Text>
                    <Text style={styles.metaText}>
                      ⌖ {car.location}
                    </Text>
                  </View>

                  <View style={styles.vehicleDivider} />

                  <View style={styles.priceRow}>
                    <View>
                      <Text style={styles.priceCaption}>{tr.price}</Text>
                      <Text style={styles.priceValue}>
                        {String(car.price)}
                      </Text>
                    </View>

                    <View style={styles.yearBlock}>
                      <Text style={styles.priceCaption}>{tr.year}</Text>
                      <Text style={styles.yearValue}>{car.year}</Text>
                    </View>
                  </View>

                  <View style={styles.cardActions}>
                    <Pressable
                      style={[
                        styles.compareButton,
                        selected && styles.compareButtonSelected,
                      ]}
                      onPress={() => handleCompare(car.id)}
                    >
                      <Text style={styles.compareButtonText}>
                        {selected ? '✓' : '⇄'} {tr.compare}
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.testDriveButton}
                      onPress={() => router.push('/book-test-drive')}
                    >
                      <Text style={styles.testDriveButtonText}>
                        {tr.testDrive} →
                      </Text>
                    </Pressable>
                  </View>

                  <Pressable
                    style={styles.detailsButton}
                    onPress={() => openCarDetails(car.id)}
                  >
                    <Text style={styles.detailsButtonText}>
                      {tr.details}
                    </Text>
                    <Text style={styles.detailsArrow}>↗</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>

        {/* EMPTY STATE */}
        {filteredCars.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>⌕</Text>
            <Text style={styles.emptyTitle}>{tr.empty}</Text>
            <Text style={styles.emptySubtitle}>{tr.emptyText}</Text>

            <Pressable
              style={styles.resetButton}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>{tr.reset}</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

function getStyles(colors: CatalogColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 8,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
    },
    logoMark: {
      width: 35,
      height: 35,
      borderRadius: 10,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoMarkText: {
      color: '#101827',
      fontSize: 22,
      fontWeight: '900',
      fontStyle: 'italic',
    },
    logoText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '900',
      letterSpacing: 0.2,
    },
    logoSubtitle: {
      color: colors.muted,
      fontSize: 7,
      fontWeight: '800',
      letterSpacing: 1.2,
      marginTop: 2,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
    },
    locationBlock: {
      alignItems: 'flex-end',
      marginRight: 2,
    },
    locationCaption: {
      color: colors.muted,
      fontSize: 7,
      fontWeight: '800',
      letterSpacing: 0.8,
      marginBottom: 3,
    },
    locationText: {
      color: colors.text,
      fontSize: 8,
      fontWeight: '800',
    },
    headerIcon: {
      width: 31,
      height: 31,
      borderRadius: 10,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIconText: {
      color: colors.text,
      fontSize: 19,
    },
    notificationDot: {
      position: 'absolute',
      top: 6,
      right: 7,
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.gold,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: '#101827',
      fontSize: 13,
      fontWeight: '900',
    },

    titleSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18,
    },
    screenTitle: {
      color: colors.text,
      fontSize: 23,
      fontWeight: '900',
      letterSpacing: -0.5,
    },
    screenSubtitle: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 4,
    },
    liveBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 7,
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    liveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.green,
    },
    liveText: {
      color: colors.gold,
      fontSize: 7,
      fontWeight: '900',
      letterSpacing: 0.5,
    },

    searchContainer: {
      height: 51,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 13,
      paddingLeft: 12,
      paddingRight: 5,
      marginBottom: 15,
    },
    searchIcon: {
      color: colors.gold,
      fontSize: 24,
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      fontSize: 11,
      paddingVertical: 0,
    },
    clearSearch: {
      color: colors.muted,
      fontSize: 16,
      paddingHorizontal: 8,
    },
    filterButton: {
      height: 39,
      backgroundColor: colors.gold,
      borderRadius: 9,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      gap: 5,
    },
    filterButtonIcon: {
      color: '#101827',
      fontSize: 17,
      fontWeight: '900',
    },
    filterButtonText: {
      color: '#101827',
      fontSize: 10,
      fontWeight: '900',
    },

    categoryScroll: {
      gap: 8,
      paddingBottom: 13,
    },
    categoryChip: {
      paddingHorizontal: 16,
      height: 34,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryChipActive: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },
    categoryChipText: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: '800',
    },
    categoryChipTextActive: {
      color: '#101827',
    },

    quickFilters: {
      gap: 7,
      paddingBottom: 20,
    },
    quickFilterChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.card,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    quickFilterText: {
      color: colors.text,
      fontSize: 9,
      fontWeight: '700',
    },
    quickFilterClose: {
      color: colors.muted,
      fontSize: 14,
    },
    addFilterChip: {
      borderWidth: 1,
      borderColor: colors.gold,
      borderStyle: 'dashed',
      borderRadius: 8,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    addFilterText: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '800',
    },

    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    resultsTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
    },
    resultsSubtitle: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 3,
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 9,
      paddingVertical: 9,
    },
    sortIcon: {
      color: colors.gold,
      fontSize: 14,
    },
    sortText: {
      color: colors.text,
      fontSize: 9,
      fontWeight: '700',
    },
    sortArrow: {
      color: colors.muted,
      fontSize: 13,
    },

    vehicleList: {
      gap: 15,
    },
    vehicleCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    imageContainer: {
      height: 190,
      position: 'relative',
      backgroundColor: colors.background,
    },
    vehicleImage: {
      width: '100%',
      height: '100%',
    },
    imageOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(5, 12, 24, 0.10)',
    },
    featuredBadge: {
      position: 'absolute',
      top: 12,
      left: 12,
      backgroundColor: colors.gold,
      borderRadius: 6,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },
    featuredBadgeText: {
      color: '#101827',
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 0.5,
    },
    favoriteButton: {
      position: 'absolute',
      top: 10,
      right: 11,
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: 'rgba(10, 18, 32, 0.78)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    favoriteIcon: {
      color: '#FFFFFF',
      fontSize: 21,
    },
    favoriteIconActive: {
      color: '#F05B65',
    },
    imageCounter: {
      position: 'absolute',
      bottom: 10,
      right: 11,
      backgroundColor: 'rgba(10, 18, 32, 0.8)',
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 5,
    },
    imageCounterText: {
      color: '#FFFFFF',
      fontSize: 8,
      fontWeight: '800',
    },

    vehicleInfo: {
      padding: 13,
    },
    vehicleTopLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    vehicleNameBlock: {
      flex: 1,
    },
    vehicleBrand: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
    vehicleModel: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '900',
      marginTop: 3,
    },
    verifiedBadge: {
      backgroundColor: 'rgba(53, 183, 121, 0.12)',
      borderWidth: 1,
      borderColor: 'rgba(53, 183, 121, 0.3)',
      borderRadius: 5,
      paddingHorizontal: 7,
      paddingVertical: 5,
      marginLeft: 8,
    },
    verifiedText: {
      color: colors.green,
      fontSize: 7,
      fontWeight: '900',
    },
    vehicleMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      marginTop: 9,
    },
    metaText: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: '600',
    },
    metaSeparator: {
      color: colors.gold,
      fontSize: 10,
    },
    vehicleDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    priceCaption: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '800',
      letterSpacing: 0.8,
    },
    priceValue: {
      color: colors.gold,
      fontSize: 21,
      fontWeight: '900',
      marginTop: 4,
    },
    yearBlock: {
      alignItems: 'flex-end',
      paddingRight: 4,
    },
    yearValue: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
      marginTop: 5,
    },

    cardActions: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 14,
    },
    compareButton: {
      flex: 1,
      height: 39,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    compareButtonSelected: {
      borderColor: colors.gold,
      backgroundColor: 'rgba(214, 173, 96, 0.12)',
    },
    compareButtonText: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '800',
    },
    testDriveButton: {
      flex: 1.2,
      height: 39,
      borderRadius: 8,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    testDriveButtonText: {
      color: '#101827',
      fontSize: 10,
      fontWeight: '900',
    },
    detailsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      marginTop: 10,
      paddingVertical: 7,
    },
    detailsButtonText: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: '800',
    },
    detailsArrow: {
      color: colors.gold,
      fontSize: 13,
    },

    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 55,
    },
    emptyIcon: {
      color: colors.gold,
      fontSize: 42,
      marginBottom: 12,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '900',
    },
    emptySubtitle: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 7,
      textAlign: 'center',
    },
    resetButton: {
      marginTop: 18,
      backgroundColor: colors.gold,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 9,
    },
    resetButtonText: {
      color: '#101827',
      fontSize: 11,
      fontWeight: '900',
    },
    bottomSpace: {
      height: 25,
    },
  });
}
