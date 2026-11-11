// src/screens/filters/index.tsx

import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// Используем относительные пути, чтобы не зависеть от alias @/
import { useAppTheme } from '../../context/theme-context';
import { useLanguage, Language } from '../../context/language-context';

type ThemeColors = {
  background: string;
  card: string;
  text: string;
  muted: string;
  gold: string;
  border: string;
};

const translations: Record<Language, Record<string, string>> = {
  EN: {
    title: 'Filters & Specifications',
    reset: 'Reset',
    priceRange: 'PRICE RANGE',
    bodyArchitecture: 'BODY ARCHITECTURE',
    condition: 'CONDITION & PROVENANCE',
    modelYear: 'MODEL YEAR',
    mileage: 'MILEAGE',
    powertrain: 'POWERTRAIN & INDUCTION',
    drivetrain: 'DRIVETRAIN ARCHITECTURE',
    exterior: 'EXTERIOR BESPOKE FINISH',
    interior: 'CABIN UPHOLSTERY & TRIM',
    minPrice: 'Min price',
    maxPrice: 'Max price',
    minYear: 'From',
    maxYear: 'To',
    any: 'Any',
    coupe: 'Coupe',
    suv: 'SUV',
    sedan: 'Sedan',
    convertible: 'Convertible',
    wagon: 'Wagon',
    certified: 'Certified',
    preOwned: 'Pre-Owned',
    new: 'New',
    hybrid: 'Plug-In Hybrid',
    electric: 'EV / Electric',
    petrol: 'Petrol',
    diesel: 'Diesel',
    awd: 'AWD / 4MATIC',
    rwd: 'RWD',
    fwd: 'FWD',
    show: 'Show Matching Vehicles',
    vehicles: 'vehicles',
    selected: 'selected',
    champagne: 'Champagne Gold',
    black: 'Obsidian Black',
    silver: 'Silver',
    blue: 'Electric Blue',
    white: 'Pearl White',
    cognac: 'Cognac Nappa Leather',
    carbon: 'Carbon Fiber & Alcantara',
    ebony: 'Ebony Leather',
    leather: 'Premium Leather',
    miles: 'mi',
  },

  RU: {
    title: 'Фильтры и характеристики',
    reset: 'Сбросить',
    priceRange: 'ДИАПАЗОН ЦЕН',
    bodyArchitecture: 'ТИП КУЗОВА',
    condition: 'СОСТОЯНИЕ И ПРОИСХОЖДЕНИЕ',
    modelYear: 'ГОД ВЫПУСКА',
    mileage: 'ПРОБЕГ',
    powertrain: 'ДВИГАТЕЛЬ И НАДДУВ',
    drivetrain: 'ТИП ПРИВОДА',
    exterior: 'ЦВЕТ КУЗОВА',
    interior: 'ОТДЕЛКА САЛОНА',
    minPrice: 'От',
    maxPrice: 'До',
    minYear: 'От',
    maxYear: 'До',
    any: 'Любой',
    coupe: 'Купе',
    suv: 'Внедорожник',
    sedan: 'Седан',
    convertible: 'Кабриолет',
    wagon: 'Универсал',
    certified: 'Проверенный',
    preOwned: 'С пробегом',
    new: 'Новый',
    hybrid: 'Plug-In Hybrid',
    electric: 'Электро',
    petrol: 'Бензин',
    diesel: 'Дизель',
    awd: 'Полный привод',
    rwd: 'Задний привод',
    fwd: 'Передний привод',
    show: 'Показать автомобили',
    vehicles: 'автомобилей',
    selected: 'выбрано',
    champagne: 'Шампань',
    black: 'Чёрный',
    silver: 'Серебристый',
    blue: 'Синий',
    white: 'Белый',
    cognac: 'Кожа Cognac Nappa',
    carbon: 'Карбон и Alcantara',
    ebony: 'Кожа Ebony',
    leather: 'Премиальная кожа',
    miles: 'км',
  },

  TR: {
    title: 'Filtreler ve Özellikler',
    reset: 'Sıfırla',
    priceRange: 'FİYAT ARALIĞI',
    bodyArchitecture: 'KASA TİPİ',
    condition: 'DURUM VE GEÇMİŞ',
    modelYear: 'MODEL YILI',
    mileage: 'KİLOMETRE',
    powertrain: 'MOTOR VE BESLEME',
    drivetrain: 'ÇEKİŞ SİSTEMİ',
    exterior: 'DIŞ RENK',
    interior: 'İÇ MEKÂN DÖŞEMESİ',
    minPrice: 'En az',
    maxPrice: 'En fazla',
    minYear: 'Başlangıç',
    maxYear: 'Bitiş',
    any: 'Tümü',
    coupe: 'Coupe',
    suv: 'SUV',
    sedan: 'Sedan',
    convertible: 'Cabrio',
    wagon: 'Station Wagon',
    certified: 'Onaylı',
    preOwned: 'İkinci El',
    new: 'Yeni',
    hybrid: 'Plug-In Hybrid',
    electric: 'Elektrikli',
    petrol: 'Benzin',
    diesel: 'Dizel',
    awd: 'AWD / 4MATIC',
    rwd: 'Arkadan İtiş',
    fwd: 'Önden Çekiş',
    show: 'Araçları Göster',
    vehicles: 'araç',
    selected: 'seçildi',
    champagne: 'Şampanya',
    black: 'Siyah',
    silver: 'Gümüş',
    blue: 'Mavi',
    white: 'İnci Beyazı',
    cognac: 'Cognac Nappa Deri',
    carbon: 'Karbon Fiber & Alcantara',
    ebony: 'Ebony Deri',
    leather: 'Premium Deri',
    miles: 'km',
  },

  AZ: {
    title: 'Filtrlər və xüsusiyyətlər',
    reset: 'Sıfırla',
    priceRange: 'QİYMƏT ARALIĞI',
    bodyArchitecture: 'KUZOV TİPİ',
    condition: 'VƏZİYYƏT VƏ TARİXÇƏ',
    modelYear: 'MODEL İLİ',
    mileage: 'YÜRÜŞ',
    powertrain: 'MÜHƏRRİK VƏ SİSTEM',
    drivetrain: 'ÖTÜRMƏ SİSTEMİ',
    exterior: 'XARİCİ RƏNG',
    interior: 'SALON ÜZLÜYÜ',
    minPrice: 'Min',
    maxPrice: 'Maks',
    minYear: 'Başlanğıc',
    maxYear: 'Son',
    any: 'Hamısı',
    coupe: 'Kupe',
    suv: 'SUV',
    sedan: 'Sedan',
    convertible: 'Kabriolet',
    wagon: 'Universal',
    certified: 'Yoxlanılmış',
    preOwned: 'İşlənmiş',
    new: 'Yeni',
    hybrid: 'Plug-In Hybrid',
    electric: 'Elektrik',
    petrol: 'Benzin',
    diesel: 'Dizel',
    awd: 'AWD / 4MATIC',
    rwd: 'Arxa ötürücü',
    fwd: 'Ön ötürücü',
    show: 'Avtomobilləri göstər',
    vehicles: 'avtomobil',
    selected: 'seçilib',
    champagne: 'Şampan',
    black: 'Qara',
    silver: 'Gümüşü',
    blue: 'Mavi',
    white: 'Mirvari ağ',
    cognac: 'Cognac Nappa dəri',
    carbon: 'Karbon və Alcantara',
    ebony: 'Ebony dəri',
    leather: 'Premium dəri',
    miles: 'km',
  },
};

const PAINT_COLORS = [
  { id: 'black', color: '#17191F' },
  { id: 'champagne', color: '#D8B86C' },
  { id: 'silver', color: '#BFC5CE' },
  { id: 'blue', color: '#315EFB' },
  { id: 'white', color: '#F4F4F1' },
];

const INTERIOR_OPTIONS = [
  'cognac',
  'carbon',
  'ebony',
  'leather',
];

interface FilterOptionGroupProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  rightLabel?: string;
  colors: ThemeColors;
}

function FilterOptionGroup({
  title,
  options,
  selected,
  onToggle,
  rightLabel,
  colors,
}: FilterOptionGroupProps) {
  return (
    <View style={groupStyles.container}>
      <View style={groupStyles.heading}>
        <Text style={[groupStyles.title, { color: colors.gold }]}>
          {title}
        </Text>

        {rightLabel ? (
          <Text style={[groupStyles.rightLabel, { color: colors.muted }]}>
            {rightLabel}
          </Text>
        ) : null}
      </View>

      <View style={groupStyles.options}>
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <Pressable
              key={option}
              onPress={() => onToggle(option)}
              style={[
                groupStyles.option,
                {
                  backgroundColor: isSelected ? colors.gold : colors.card,
                  borderColor: isSelected ? colors.gold : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  groupStyles.optionText,
                  {
                    color: isSelected ? '#17191F' : colors.text,
                  },
                ]}
              >
                {option}
              </Text>

              {isSelected ? (
                <Text style={groupStyles.checkmark}>✓</Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const groupStyles = StyleSheet.create({
  container: {
    marginBottom: 3,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  title: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  rightLabel: {
    fontSize: 10,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  optionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  checkmark: {
    color: '#17191F',
    fontSize: 13,
    fontWeight: '900',
  },
});

export default function FiltersScreen() {
  const { colors } = useAppTheme();
  const { language } = useLanguage();

  const t = translations[language] ?? translations.EN;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [bodyTypes, setBodyTypes] = useState<string[]>([
    'Coupe',
    'SUV',
  ]);

  const [condition, setCondition] = useState('Certified');

  const [engineTypes, setEngineTypes] = useState<string[]>([
    'Plug-In Hybrid',
  ]);

  const [drivetrain, setDrivetrain] = useState('AWD / 4MATIC');
  const [paint, setPaint] = useState('champagne');
  const [interior, setInterior] = useState('cognac');

  const [minPrice, setMinPrice] = useState('45000');
  const [maxPrice, setMaxPrice] = useState('250000');
  const [minYear, setMinYear] = useState('2021');
  const [maxYear, setMaxYear] = useState('2025');
  const [mileage, setMileage] = useState('25000');

  const toggleValue = (
    value: string,
    current: string[],
    setter: (values: string[]) => void,
  ) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const resetFilters = () => {
    setBodyTypes([]);
    setCondition('');
    setEngineTypes([]);
    setDrivetrain('');
    setPaint('');
    setInterior('');
    setMinPrice('');
    setMaxPrice('');
    setMinYear('');
    setMaxYear('');
    setMileage('');
  };

  const selectedCount = [
    bodyTypes.length,
    condition ? 1 : 0,
    engineTypes.length,
    drivetrain ? 1 : 0,
    paint ? 1 : 0,
    interior ? 1 : 0,
    minPrice || maxPrice ? 1 : 0,
    minYear || maxYear ? 1 : 0,
    mileage ? 1 : 0,
  ].reduce((total, value) => total + value, 0);

  const formatPrice = (value: string) => {
    const number = Number(value);

    if (!number || Number.isNaN(number)) {
      return '';
    }

    return number.toLocaleString('en-US');
  };

  const pricePresets = [
    { label: 'Under $75k', min: '0', max: '75000' },
    { label: '$75k – $150k', min: '75000', max: '150000' },
    { label: '$150k – $250k', min: '150000', max: '250000' },
    { label: 'Exotic ($250k+)', min: '250000', max: '1000000' },
  ];

  const mileageOptions = [
    { label: 'Under 10,000', value: '10000' },
    { label: 'Under 25,000', value: '25000' },
    { label: 'Under 50,000', value: '50000' },
    { label: 'Any', value: '' },
  ];

  const renderSectionTitle = (title: string) => (
    <Text style={styles.sectionLabel}>{title}</Text>
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={[styles.backArrow, { color: colors.text }]}>
              ‹
            </Text>
          </Pressable>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.brand}>AUTOMARKET</Text>
            <Text style={styles.headerTitle}>{t.title}</Text>
          </View>

          <Pressable onPress={resetFilters}>
            <Text style={styles.reset}>{t.reset}</Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* SUMMARY */}
          <View style={styles.summary}>
            <View>
              <Text style={styles.summaryTitle}>{t.title}</Text>
              <Text style={styles.summarySubtitle}>
                {selectedCount} {t.selected}
              </Text>
            </View>

            <Text style={styles.summaryIcon}>☷</Text>
          </View>

          {/* PRICE RANGE */}
          <View style={styles.section}>
            {renderSectionTitle(t.priceRange)}

            <View style={styles.priceLabels}>
              <Text style={styles.priceValue}>
                ${formatPrice(minPrice) || '0'}
              </Text>

              <Text style={styles.priceValue}>
                ${formatPrice(maxPrice) || 'Any'}
              </Text>
            </View>

            <View style={styles.priceInputs}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputCaption}>{t.minPrice}</Text>
                <TextInput
                  value={minPrice}
                  onChangeText={setMinPrice}
                  keyboardType="numeric"
                  placeholder="45,000"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputCaption}>{t.maxPrice}</Text>
                <TextInput
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                  keyboardType="numeric"
                  placeholder="250,000"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.presetGrid}>
              {pricePresets.map((preset) => {
                const isSelected =
                  minPrice === preset.min && maxPrice === preset.max;

                return (
                  <Pressable
                    key={preset.label}
                    onPress={() => {
                      setMinPrice(preset.min);
                      setMaxPrice(preset.max);
                    }}
                    style={[
                      styles.preset,
                      isSelected && styles.presetSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.presetText,
                        isSelected && styles.presetTextSelected,
                      ]}
                    >
                      {preset.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.separator} />

          {/* BODY TYPE */}
          <View style={styles.section}>
            <FilterOptionGroup
              title={t.bodyArchitecture}
              options={[
                'Coupe',
                'SUV',
                'Sedan',
                'Convertible',
                'Wagon',
              ]}
              selected={bodyTypes}
              onToggle={(value) =>
                toggleValue(value, bodyTypes, setBodyTypes)
              }
              colors={colors}
            />
          </View>

          <View style={styles.separator} />

          {/* CONDITION */}
          <View style={styles.section}>
            <FilterOptionGroup
              title={t.condition}
              options={['Certified', 'Pre-Owned', 'New']}
              selected={condition ? [condition] : []}
              onToggle={setCondition}
              rightLabel="Verified vehicles"
              colors={colors}
            />
          </View>

          <View style={styles.separator} />

          {/* YEAR AND MILEAGE */}
          <View style={styles.section}>
            {renderSectionTitle(t.modelYear)}

            <View style={styles.twoColumns}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputCaption}>{t.minYear}</Text>
                <TextInput
                  value={minYear}
                  onChangeText={setMinYear}
                  keyboardType="numeric"
                  placeholder="2021"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputCaption}>{t.maxYear}</Text>
                <TextInput
                  value={maxYear}
                  onChangeText={setMaxYear}
                  keyboardType="numeric"
                  placeholder="2025"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.mileageHeader}>
              <Text style={styles.sectionLabel}>{t.mileage}</Text>
              <Text style={styles.mileageValue}>
                {mileage
                  ? `${formatPrice(mileage)} ${t.miles}`
                  : t.any}
              </Text>
            </View>

            <View style={styles.presetGrid}>
              {mileageOptions.map((option) => {
                const isSelected = mileage === option.value;

                return (
                  <Pressable
                    key={option.label}
                    onPress={() => setMileage(option.value)}
                    style={[
                      styles.preset,
                      isSelected && styles.presetSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.presetText,
                        isSelected && styles.presetTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.separator} />

          {/* POWERTRAIN */}
          <View style={styles.section}>
            <FilterOptionGroup
              title={t.powertrain}
              options={[
                'EV / Electric',
                'Plug-In Hybrid',
                'Turbocharged',
                'Naturally Aspirated',
                'Diesel',
              ]}
              selected={engineTypes}
              onToggle={(value) =>
                toggleValue(value, engineTypes, setEngineTypes)
              }
              colors={colors}
            />
          </View>

          <View style={styles.separator} />

          {/* DRIVETRAIN */}
          <View style={styles.section}>
            <FilterOptionGroup
              title={t.drivetrain}
              options={['AWD / 4MATIC', 'RWD', 'FWD']}
              selected={drivetrain ? [drivetrain] : []}
              onToggle={setDrivetrain}
              colors={colors}
            />
          </View>

          <View style={styles.separator} />

          {/* EXTERIOR */}
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionLabel}>{t.exterior}</Text>

              <Text style={styles.selectedColor}>
                {paint ? t[paint] || t.any : t.any}
              </Text>
            </View>

            <View style={styles.colorRow}>
              {PAINT_COLORS.map((item) => {
                const isSelected = paint === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setPaint(item.id)}
                    style={[
                      styles.colorOuter,
                      isSelected && styles.colorOuterSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.colorCircle,
                        { backgroundColor: item.color },
                      ]}
                    />

                    {isSelected ? (
                      <Text
                        style={[
                          styles.colorCheck,
                          {
                            color:
                              item.id === 'white' ? '#17191F' : '#FFFFFF',
                          },
                        ]}
                      >
                        ✓
                      </Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, styles.interiorTitle]}>
              {t.interior}
            </Text>

            {INTERIOR_OPTIONS.map((option) => {
              const isSelected = interior === option;

              const dotColor =
                option === 'cognac'
                  ? '#A66B42'
                  : option === 'carbon'
                    ? '#343943'
                    : option === 'ebony'
                      ? '#17191F'
                      : '#C9B9A0';

              return (
                <Pressable
                  key={option}
                  onPress={() => setInterior(option)}
                  style={styles.interiorOption}
                >
                  <View style={styles.interiorLeft}>
                    <View
                      style={[
                        styles.interiorDot,
                        { backgroundColor: dotColor },
                      ]}
                    />

                    <Text style={styles.interiorText}>
                      {t[option]}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.radioOuter,
                      isSelected && styles.radioOuterSelected,
                    ]}
                  >
                    {isSelected ? (
                      <View style={styles.radioInner} />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>

        {/* BOTTOM ACTION */}
        <View style={styles.footer}>
          <Pressable
            onPress={() => router.back()}
            style={styles.showButton}
          >
            <Text style={styles.showButtonText}>{t.show}</Text>

            <View style={styles.countBadge}>
              <Text style={styles.countText}>142</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      minHeight: 64,
      paddingHorizontal: 17,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
    },
    backArrow: {
      fontSize: 31,
      lineHeight: 34,
      marginTop: -3,
    },
    headerTitleContainer: {
      flex: 1,
      marginLeft: 12,
    },
    brand: {
      color: colors.gold,
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 2,
    },
    headerTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
      marginTop: 3,
    },
    reset: {
      color: colors.gold,
      fontSize: 12,
      fontWeight: '700',
    },
    scrollContent: {
      paddingHorizontal: 17,
      paddingTop: 15,
      paddingBottom: 20,
    },
    summary: {
      backgroundColor: colors.card,
      borderRadius: 13,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 22,
      borderWidth: 1,
      borderColor: colors.border,
    },
    summaryTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '800',
    },
    summarySubtitle: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 4,
    },
    summaryIcon: {
      color: colors.gold,
      fontSize: 24,
      fontWeight: '700',
    },
    section: {
      marginBottom: 19,
    },
    priceLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      marginBottom: 12,
    },
    priceValue: {
      color: colors.gold,
      fontSize: 14,
      fontWeight: '800',
    },
    priceInputs: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 12,
    },
    twoColumns: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 12,
    },
    inputWrapper: {
      flex: 1,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 11,
      paddingVertical: 7,
    },
    inputCaption: {
      color: colors.muted,
      fontSize: 9,
      marginBottom: 3,
    },
    input: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '700',
      padding: 0,
      minHeight: 25,
    },
    presetGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 7,
    },
    preset: {
      flex: 1,
      minWidth: '46%',
      minHeight: 35,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 7,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 9,
    },
    presetSelected: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },
    presetText: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '600',
      textAlign: 'center',
    },
    presetTextSelected: {
      color: '#17191F',
      fontWeight: '800',
    },
    separator: {
      height: 1,
      backgroundColor: colors.border,
      marginBottom: 20,
    },
    sectionLabel: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 1,
    },
    mileageHeader: {
      marginTop: 20,
      marginBottom: 11,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    mileageValue: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: '700',
    },
    sectionHeading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    selectedColor: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '600',
    },
    colorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 3,
    },
    colorOuter: {
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorOuterSelected: {
      borderColor: colors.gold,
      borderWidth: 2,
    },
    colorCircle: {
      width: 23,
      height: 23,
      borderRadius: 12,
    },
    colorCheck: {
      position: 'absolute',
      fontSize: 13,
      fontWeight: '900',
    },
    interiorTitle: {
      marginBottom: 12,
    },
    interiorOption: {
      minHeight: 42,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    interiorLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    interiorDot: {
      width: 13,
      height: 13,
      borderRadius: 7,
    },
    interiorText: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '600',
    },
    radioOuter: {
      width: 19,
      height: 19,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioOuterSelected: {
      borderColor: colors.gold,
    },
    radioInner: {
      width: 9,
      height: 9,
      borderRadius: 5,
      backgroundColor: colors.gold,
    },
    footer: {
      paddingHorizontal: 17,
      paddingTop: 12,
      paddingBottom: 12,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    showButton: {
      minHeight: 49,
      borderRadius: 11,
      backgroundColor: colors.gold,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
    showButtonText: {
      color: '#17191F',
      fontSize: 13,
      fontWeight: '900',
    },
    countBadge: {
      minWidth: 27,
      height: 24,
      paddingHorizontal: 6,
      borderRadius: 8,
      backgroundColor: '#17191F',
      alignItems: 'center',
      justifyContent: 'center',
    },
    countText: {
      color: '#E4C16F',
      fontSize: 11,
      fontWeight: '900',
    },
  });
}