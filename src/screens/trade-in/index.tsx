
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { useAppTheme } from '../../context/theme-context';
import { useLanguage } from '../../context/language-context';

const BRAND_VALUES = {
  BMW: 55000,
  Mercedes: 65000,
  Porsche: 95000,
  Audi: 50000,
  Tesla: 60000,
  Toyota: 30000,
  Lexus: 45000,
  Other: 25000,
};

type Brand = keyof typeof BRAND_VALUES;
type ConditionId = 'excellent' | 'good' | 'fair' | 'poor';

const BRANDS = Object.keys(BRAND_VALUES) as Brand[];

const CONDITIONS: {
  id: ConditionId;
  multiplier: number;
}[] = [
  { id: 'excellent', multiplier: 1 },
  { id: 'good', multiplier: 0.9 },
  { id: 'fair', multiplier: 0.78 },
  { id: 'poor', multiplier: 0.6 },
];

const MILEAGE_OPTIONS = ['10000', '18500', '25000', '50000'];

const translations = {
  EN: {
    header: 'TRADE-IN',
    headerSubtitle: 'VEHICLE APPRAISAL',
    introEyebrow: 'AUTOMARKET EXCHANGE',
    title: 'Your car has',
    titleAccent: 'value.',
    description:
      'Discover your vehicle’s estimated trade-in value in a few simple steps.',
    progressTitle: 'APPRAISAL FLOW',
    step: 'Step 1 of 4',
    progress: ['Vehicle Info', 'Condition', 'Photos', 'Cash Offer'],
    vehicleIdentifier: 'Vehicle Identifier',
    vehicleIdentifierSubtitle: 'Start with your vehicle information',
    brand: 'Vehicle Brand',
    model: 'Vehicle Model',
    modelPlaceholder: 'e.g. 530i, C-Class, Model 3',
    year: 'Model Year',
    mileage: 'Mileage (KM)',
    vin: 'Vehicle Identification Number',
    vinPlaceholder: 'Enter your 17-character VIN',
    vinHelper:
      'Your VIN is usually located on the dashboard or driver’s door frame.',
    vinInfo:
      'VIN is used here only for the local appraisal demo. No external verification is performed.',
    decode: 'Decode Vehicle Registry',
    decodeTitle: 'Vehicle Registry',
    decodeMessage:
      'VIN format accepted. External vehicle registry is not connected in this demo.',
    currentMileage: 'Current Mileage',
    mileageSubtitle: 'Precision odometer reading',
    liveData: 'LOCAL DATA',
    miles: 'KM',
    conditionTitle: 'Vehicle Condition',
    conditionSubtitle: 'Select the overall condition',
    conditions: {
      excellent: {
        title: 'Excellent',
        subtitle: 'Like new, no issues',
        tag: 'TOP MARKET',
      },
      good: {
        title: 'Good / Daily Driven',
        subtitle: 'Normal usage with minor wear',
        tag: 'STANDARD',
      },
      fair: {
        title: 'Fair',
        subtitle: 'Visible wear, needs attention',
        tag: 'NEEDS TLC',
      },
      poor: {
        title: 'Needs Repair',
        subtitle: 'Mechanical or body issues',
        tag: 'REPAIR',
      },
    },
    selected: 'SELECTED',
    photosTitle: 'Vehicle Photos',
    photosSubtitle: 'Photos can help with a more accurate appraisal',
    addPhotos: 'Studio Appraisal Capture',
    photosDescription:
      'Capture front, rear, interior and exterior photos of your vehicle.',
    photosComingSoon: 'PHOTO UPLOAD — COMING IN A LATER STEP',
    photoFront: 'Front View',
    photoRear: 'Rear View',
    photoInterior: 'Interior',
    photoSide: 'Side View',
    estimateTitle: 'YOUR ESTIMATED VALUE',
    vehicle: 'VEHICLE',
    estimateYear: 'YEAR',
    estimateDisclaimer:
      'Illustrative estimate based on demo formulas. Not a verified market valuation or guaranteed offer.',
    getOffer: 'Get Trade-In Offer',
    calculate: 'Calculate Estimated Value',
    recalculate: 'Recalculate Value',
    footer: 'AUTOMARKET · PREMIUM AUTOMOTIVE EXPERIENCE',
    reset: 'Reset',
    alerts: {
      missingTitle: 'Missing information',
      missingModel: 'Please enter your vehicle model.',
      invalidVinTitle: 'Invalid VIN',
      invalidVin: 'Please enter a valid 17-character VIN.',
      invalidYearTitle: 'Invalid year',
      invalidYear: 'Please enter a valid vehicle year.',
      invalidMileageTitle: 'Invalid mileage',
      invalidMileage: 'Please enter a valid vehicle mileage.',
      offerTitle: 'Trade-In Estimate',
      offerMessage:
        'Your estimated value is ready. This is a local demo estimate, not a real purchase offer.',
      ok: 'OK',
    },
  },

  RU: {
    header: 'TRADE-IN',
    headerSubtitle: 'ОЦЕНКА АВТОМОБИЛЯ',
    introEyebrow: 'AUTOMARKET EXCHANGE',
    title: 'Твой автомобиль имеет',
    titleAccent: 'ценность.',
    description:
      'Узнай примерную стоимость своего автомобиля для обмена за несколько простых шагов.',
    progressTitle: 'ЭТАПЫ ОЦЕНКИ',
    step: 'Шаг 1 из 4',
    progress: ['Данные авто', 'Состояние', 'Фото', 'Предложение'],
    vehicleIdentifier: 'Данные автомобиля',
    vehicleIdentifierSubtitle: 'Начни с информации о своём автомобиле',
    brand: 'Марка автомобиля',
    model: 'Модель автомобиля',
    modelPlaceholder: 'Например, 530i, C-Class, Model 3',
    year: 'Год выпуска',
    mileage: 'Пробег (КМ)',
    vin: 'Идентификационный номер VIN',
    vinPlaceholder: 'Введи VIN из 17 символов',
    vinHelper:
      'VIN обычно находится на приборной панели или на стойке водительской двери.',
    vinInfo:
      'VIN используется только для локальной демонстрационной оценки. Внешняя проверка не выполняется.',
    decode: 'Расшифровать VIN',
    decodeTitle: 'Реестр автомобилей',
    decodeMessage:
      'Формат VIN принят. Внешняя база автомобилей в демоверсии не подключена.',
    currentMileage: 'Текущий пробег',
    mileageSubtitle: 'Точное показание одометра',
    liveData: 'ЛОКАЛЬНЫЕ ДАННЫЕ',
    miles: 'КМ',
    conditionTitle: 'Состояние автомобиля',
    conditionSubtitle: 'Выбери общее состояние автомобиля',
    conditions: {
      excellent: {
        title: 'Отличное',
        subtitle: 'Как новый, без проблем',
        tag: 'ВЫСОКАЯ ОЦЕНКА',
      },
      good: {
        title: 'Хорошее / На каждый день',
        subtitle: 'Обычная эксплуатация, небольшой износ',
        tag: 'СТАНДАРТ',
      },
      fair: {
        title: 'Среднее',
        subtitle: 'Видимый износ, требуется внимание',
        tag: 'ТРЕБУЕТ ВНИМАНИЯ',
      },
      poor: {
        title: 'Требует ремонта',
        subtitle: 'Есть механические или кузовные проблемы',
        tag: 'РЕМОНТ',
      },
    },
    selected: 'ВЫБРАНО',
    photosTitle: 'Фотографии автомобиля',
    photosSubtitle: 'Фотографии помогут точнее оценить автомобиль',
    addPhotos: 'Фотооценка автомобиля',
    photosDescription:
      'Сделай фотографии передней и задней частей, салона и экстерьера.',
    photosComingSoon: 'ЗАГРУЗКА ФОТО — БУДЕТ ДОБАВЛЕНА ПОЗЖЕ',
    photoFront: 'Спереди',
    photoRear: 'Сзади',
    photoInterior: 'Салон',
    photoSide: 'Сбоку',
    estimateTitle: 'ПРИМЕРНАЯ СТОИМОСТЬ',
    vehicle: 'АВТОМОБИЛЬ',
    estimateYear: 'ГОД',
    estimateDisclaimer:
      'Ориентировочная оценка на основе демонстрационной формулы. Это не подтверждённая рыночная стоимость и не предложение о покупке.',
    getOffer: 'Получить предложение',
    calculate: 'Рассчитать стоимость',
    recalculate: 'Пересчитать стоимость',
    footer: 'AUTOMARKET · ПРЕМИАЛЬНЫЙ АВТОМОБИЛЬНЫЙ ОПЫТ',
    reset: 'Сбросить',
    alerts: {
      missingTitle: 'Не хватает данных',
      missingModel: 'Пожалуйста, введи модель автомобиля.',
      invalidVinTitle: 'Неверный VIN',
      invalidVin: 'Введи корректный VIN из 17 символов.',
      invalidYearTitle: 'Неверный год',
      invalidYear: 'Введи корректный год выпуска автомобиля.',
      invalidMileageTitle: 'Неверный пробег',
      invalidMileage: 'Введи корректное значение пробега.',
      offerTitle: 'Оценка Trade-In',
      offerMessage:
        'Предварительная стоимость рассчитана. Это локальная демонстрационная оценка, а не реальное предложение о покупке.',
      ok: 'ОК',
    },
  },

  TR: {
    header: 'TRADE-IN',
    headerSubtitle: 'ARAÇ DEĞERLEME',
    introEyebrow: 'AUTOMARKET EXCHANGE',
    title: 'Aracınızın bir',
    titleAccent: 'değeri var.',
    description:
      'Birkaç kolay adımda aracınızın tahmini takas değerini öğrenin.',
    progressTitle: 'DEĞERLEME AŞAMALARI',
    step: 'Adım 1 / 4',
    progress: ['Araç Bilgileri', 'Durum', 'Fotoğraflar', 'Teklif'],
    vehicleIdentifier: 'Araç Bilgileri',
    vehicleIdentifierSubtitle: 'Araç bilgilerinizi girerek başlayın',
    brand: 'Araç Markası',
    model: 'Araç Modeli',
    modelPlaceholder: 'Örn. 530i, C-Class, Model 3',
    year: 'Model Yılı',
    mileage: 'Kilometre (KM)',
    vin: 'Araç Kimlik Numarası',
    vinPlaceholder: '17 karakterli VIN girin',
    vinHelper:
      'VIN genellikle gösterge panelinde veya sürücü kapısının çerçevesinde bulunur.',
    vinInfo:
      'VIN yalnızca yerel demo değerlemesi için kullanılır. Harici doğrulama yapılmaz.',
    decode: 'Araç Kaydını Çözümle',
    decodeTitle: 'Araç Kaydı',
    decodeMessage:
      'VIN formatı kabul edildi. Harici araç kayıt sistemi bu demoda bağlı değildir.',
    currentMileage: 'Mevcut Kilometre',
    mileageSubtitle: 'Hassas kilometre göstergesi',
    liveData: 'YEREL VERİ',
    miles: 'KM',
    conditionTitle: 'Araç Durumu',
    conditionSubtitle: 'Aracınızın genel durumunu seçin',
    conditions: {
      excellent: {
        title: 'Mükemmel',
        subtitle: 'Yeni gibi, sorunsuz',
        tag: 'EN İYİ DEĞER',
      },
      good: {
        title: 'İyi / Günlük Kullanım',
        subtitle: 'Normal kullanım, küçük izler',
        tag: 'STANDART',
      },
      fair: {
        title: 'Orta',
        subtitle: 'Görünür aşınma, bakım gerekebilir',
        tag: 'BAKIM GEREKLİ',
      },
      poor: {
        title: 'Onarım Gerekli',
        subtitle: 'Mekanik veya kaporta sorunları',
        tag: 'ONARIM',
      },
    },
    selected: 'SEÇİLDİ',
    photosTitle: 'Araç Fotoğrafları',
    photosSubtitle: 'Fotoğraflar daha doğru değerleme sağlayabilir',
    addPhotos: 'Araç Fotoğraf Değerlemesi',
    photosDescription:
      'Ön, arka, iç ve dış araç fotoğraflarını çekin.',
    photosComingSoon: 'FOTOĞRAF YÜKLEME — DAHA SONRA EKLENECEK',
    photoFront: 'Ön Görünüm',
    photoRear: 'Arka Görünüm',
    photoInterior: 'İç Mekan',
    photoSide: 'Yan Görünüm',
    estimateTitle: 'TAHMİNİ ARAÇ DEĞERİ',
    vehicle: 'ARAÇ',
    estimateYear: 'YIL',
    estimateDisclaimer:
      'Demo formülüne dayalı tahmini değerdir. Doğrulanmış piyasa değeri veya garanti edilmiş teklif değildir.',
    getOffer: 'Takas Teklifi Al',
    calculate: 'Tahmini Değeri Hesapla',
    recalculate: 'Değeri Yeniden Hesapla',
    footer: 'AUTOMARKET · PREMIUM OTOMOTİV DENEYİMİ',
    reset: 'Sıfırla',
    alerts: {
      missingTitle: 'Eksik bilgi',
      missingModel: 'Lütfen araç modelini girin.',
      invalidVinTitle: 'Geçersiz VIN',
      invalidVin: 'Lütfen 17 karakterli geçerli bir VIN girin.',
      invalidYearTitle: 'Geçersiz yıl',
      invalidYear: 'Lütfen geçerli bir model yılı girin.',
      invalidMileageTitle: 'Geçersiz kilometre',
      invalidMileage: 'Lütfen geçerli kilometre bilgisini girin.',
      offerTitle: 'Trade-In Değerlemesi',
      offerMessage:
        'Tahmini değeriniz hazır. Bu yerel bir demo değerlemesidir, gerçek bir satın alma teklifi değildir.',
      ok: 'Tamam',
    },
  },

  AZ: {
    header: 'TRADE-IN',
    headerSubtitle: 'AVTOMOBİLİN QİYMƏTLƏNDİRİLMƏSİ',
    introEyebrow: 'AUTOMARKET EXCHANGE',
    title: 'Avtomobilinizin',
    titleAccent: 'dəyəri var.',
    description:
      'Bir neçə sadə addımda avtomobilinizin təxmini dəyişmə dəyərini öyrənin.',
    progressTitle: 'QİYMƏTLƏNDİRMƏ MƏRHƏLƏLƏRİ',
    step: 'Addım 1 / 4',
    progress: ['Avtomobil məlumatı', 'Vəziyyət', 'Şəkillər', 'Təklif'],
    vehicleIdentifier: 'Avtomobil məlumatları',
    vehicleIdentifierSubtitle: 'Avtomobiliniz haqqında məlumatları daxil edin',
    brand: 'Avtomobil markası',
    model: 'Avtomobil modeli',
    modelPlaceholder: 'Məsələn, 530i, C-Class, Model 3',
    year: 'Buraxılış ili',
    mileage: 'Yürüş (KM)',
    vin: 'Avtomobilin identifikasiya nömrəsi',
    vinPlaceholder: '17 simvolluq VIN daxil edin',
    vinHelper:
      'VIN adətən cihaz panelində və ya sürücü qapısının çərçivəsində yerləşir.',
    vinInfo:
      'VIN yalnız yerli demo qiymətləndirməsi üçün istifadə olunur. Xarici yoxlama aparılmır.',
    decode: 'VIN məlumatlarını yoxla',
    decodeTitle: 'Avtomobil reyestri',
    decodeMessage:
      'VIN formatı qəbul edildi. Xarici avtomobil reyestri bu demoda qoşulmayıb.',
    currentMileage: 'Cari yürüş',
    mileageSubtitle: 'Dəqiq odometr göstəricisi',
    liveData: 'YERLİ MƏLUMAT',
    miles: 'KM',
    conditionTitle: 'Avtomobilin vəziyyəti',
    conditionSubtitle: 'Avtomobilin ümumi vəziyyətini seçin',
    conditions: {
      excellent: {
        title: 'Əla',
        subtitle: 'Yeni kimi, problemsiz',
        tag: 'YÜKSƏK QİYMƏT',
      },
      good: {
        title: 'Yaxşı / Gündəlik istifadə',
        subtitle: 'Normal istifadə, kiçik izlər',
        tag: 'STANDART',
      },
      fair: {
        title: 'Orta',
        subtitle: 'Görünən aşınma, diqqət tələb edir',
        tag: 'DİQQƏT LAZIMDIR',
      },
      poor: {
        title: 'Təmir tələb olunur',
        subtitle: 'Mexaniki və ya kuzov problemləri',
        tag: 'TƏMİR',
      },
    },
    selected: 'SEÇİLİB',
    photosTitle: 'Avtomobil şəkilləri',
    photosSubtitle: 'Şəkillər daha dəqiq qiymətləndirməyə kömək edə bilər',
    addPhotos: 'Avtomobilin foto qiymətləndirilməsi',
    photosDescription:
      'Avtomobilin ön, arxa, salon və yan görünüşlərinin şəklini çəkin.',
    photosComingSoon: 'ŞƏKİL YÜKLƏMƏ — SONRA ƏLAVƏ OLUNACAQ',
    photoFront: 'Ön görünüş',
    photoRear: 'Arxa görünüş',
    photoInterior: 'Salon',
    photoSide: 'Yan görünüş',
    estimateTitle: 'TƏXMİNİ DƏYƏR',
    vehicle: 'AVTOMOBİL',
    estimateYear: 'İL',
    estimateDisclaimer:
      'Demo formuluna əsaslanan təxmini qiymətdir. Təsdiqlənmiş bazar qiyməti və ya zəmanətli təklif deyil.',
    getOffer: 'Trade-In təklifi al',
    calculate: 'Təxmini dəyəri hesabla',
    recalculate: 'Yenidən hesabla',
    footer: 'AUTOMARKET · PREMIUM AVTOMOBİL TƏCRÜBƏSİ',
    reset: 'Sıfırla',
    alerts: {
      missingTitle: 'Məlumat çatışmır',
      missingModel: 'Zəhmət olmasa avtomobil modelini daxil edin.',
      invalidVinTitle: 'Yanlış VIN',
      invalidVin: '17 simvolluq düzgün VIN daxil edin.',
      invalidYearTitle: 'Yanlış il',
      invalidYear: 'Düzgün buraxılış ilini daxil edin.',
      invalidMileageTitle: 'Yanlış yürüş',
      invalidMileage: 'Düzgün yürüş məlumatını daxil edin.',
      offerTitle: 'Trade-In qiymətləndirməsi',
      offerMessage:
        'Təxmini dəyər hesablandı. Bu, yerli demo qiymətləndirməsidir, real alış təklifi deyil.',
      ok: 'Bağla',
    },
  },
};

type AppColors = {
  background: string;
  card: string;
  cardLight: string;
  gold: string;
  text: string;
  muted: string;
  border: string;
  green: string;
  dark: string;
};

export default function TradeInScreen() {
  const { colors, activeTheme } = useAppTheme();
  const { language } = useLanguage();

  const t = translations[language];
  const styles = createStyles(colors, activeTheme);
  const isDark = activeTheme === 'dark';

  const [brand, setBrand] = useState<Brand>('BMW');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2022');
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState<ConditionId>('good');
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const resetForm = () => {
    setBrand('BMW');
    setModel('');
    setYear('2022');
    setVin('');
    setMileage('');
    setCondition('good');
    setEstimatedValue(null);
  };

  const calculateValue = () => {
    const numericYear = Number(year);
    const numericMileage = Number(mileage);

    if (!model.trim()) {
      Alert.alert(t.alerts.missingTitle, t.alerts.missingModel);
      return;
    }

    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin.trim())) {
      Alert.alert(t.alerts.invalidVinTitle, t.alerts.invalidVin);
      return;
    }

    if (
      !Number.isInteger(numericYear) ||
      numericYear < 1990 ||
      numericYear > new Date().getFullYear()
    ) {
      Alert.alert(t.alerts.invalidYearTitle, t.alerts.invalidYear);
      return;
    }

    if (
      !mileage.trim() ||
      !Number.isFinite(numericMileage) ||
      numericMileage < 0
    ) {
      Alert.alert(t.alerts.invalidMileageTitle, t.alerts.invalidMileage);
      return;
    }

    const baseValue = BRAND_VALUES[brand];
    const age = new Date().getFullYear() - numericYear;

    const ageMultiplier = Math.max(0.25, 1 - age * 0.075);
    const mileageMultiplier = Math.max(
      0.45,
      1 - numericMileage / 250000,
    );

    const conditionMultiplier =
      CONDITIONS.find((item) => item.id === condition)?.multiplier ?? 0.9;

    const result = Math.round(
      baseValue *
        ageMultiplier *
        mileageMultiplier *
        conditionMultiplier,
    );

    setEstimatedValue(result);
  };

  const handleDecode = () => {
    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin.trim())) {
      Alert.alert(t.alerts.invalidVinTitle, t.alerts.invalidVin);
      return;
    }

    Alert.alert(t.decodeTitle, t.decodeMessage);
  };

  const handleOffer = () => {
    Alert.alert(
      t.alerts.offerTitle,
      t.alerts.offerMessage,
      [
        {
          text: t.alerts.ok,
          onPress: () => setEstimatedValue(null),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{t.header}</Text>
            <Text style={styles.headerSubtitle}>{t.headerSubtitle}</Text>
          </View>

          <Pressable style={styles.headerButton} onPress={resetForm}>
            <Text style={styles.resetIcon}>↻</Text>
          </Pressable>
        </View>

        {/* INTRO */}
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>{t.introEyebrow}</Text>

          <Text style={styles.title}>
            {t.title}{'\n'}
            <Text style={styles.goldText}>{t.titleAccent}</Text>
          </Text>

          <Text style={styles.description}>{t.description}</Text>
        </View>

        {/* PROGRESS */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>{t.progressTitle}</Text>
            <Text style={styles.progressPercent}>{t.step}</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.progressLabels}>
            {t.progress.map((item, index) => (
              <Text
                key={item}
                style={
                  index === 0
                    ? styles.activeProgressLabel
                    : styles.progressLabel
                }
              >
                {item}
              </Text>
            ))}
          </View>
        </View>

        {/* VEHICLE IDENTIFIER */}
        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View style={styles.sectionNumber}>
              <Text style={styles.sectionNumberText}>01</Text>
            </View>

            <View style={styles.sectionHeadingText}>
              <Text style={styles.sectionTitle}>
                {t.vehicleIdentifier}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {t.vehicleIdentifierSubtitle}
              </Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>{t.brand}</Text>

          <View style={styles.brandGrid}>
            {BRANDS.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.brandOption,
                  brand === item && styles.brandOptionSelected,
                ]}
                onPress={() => {
                  setBrand(item);
                  setEstimatedValue(null);
                }}
              >
                <Text
                  style={[
                    styles.brandText,
                    brand === item && styles.brandTextSelected,
                  ]}
                >
                  {item === 'Mercedes' ? 'Mercedes-Benz' : item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.inputLabel}>{t.model}</Text>

          <TextInput
            style={styles.input}
            placeholder={t.modelPlaceholder}
            placeholderTextColor={colors.muted}
            value={model}
            onChangeText={(value) => {
              setModel(value);
              setEstimatedValue(null);
            }}
          />

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>{t.year}</Text>
              <TextInput
                style={styles.input}
                placeholder="2022"
                placeholderTextColor={colors.muted}
                keyboardType="number-pad"
                maxLength={4}
                value={year}
                onChangeText={(value) => {
                  setYear(value);
                  setEstimatedValue(null);
                }}
              />
            </View>

            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>{t.mileage}</Text>
              <TextInput
                style={styles.input}
                placeholder="18450"
                placeholderTextColor={colors.muted}
                keyboardType="number-pad"
                value={mileage}
                onChangeText={(value) => {
                  setMileage(value);
                  setEstimatedValue(null);
                }}
              />
            </View>
          </View>

          <Text style={styles.inputLabel}>{t.vin}</Text>

          <TextInput
            style={styles.input}
            placeholder={t.vinPlaceholder}
            placeholderTextColor={colors.muted}
            autoCapitalize="characters"
            maxLength={17}
            value={vin}
            onChangeText={(value) => {
              setVin(value.toUpperCase());
              setEstimatedValue(null);
            }}
          />

          <Text style={styles.helperText}>{t.vinHelper}</Text>

          <View style={styles.vinInfo}>
            <Text style={styles.infoIcon}>ⓘ</Text>
            <Text style={styles.vinInfoText}>{t.vinInfo}</Text>
          </View>

          <Pressable
            style={styles.decodeButton}
            onPress={handleDecode}
          >
            <Text style={styles.decodeButtonText}>
              ↻  {t.decode}
            </Text>
            <Text style={styles.decodeArrow}>→</Text>
          </Pressable>
        </View>

        {/* CURRENT MILEAGE */}
        <View style={styles.mileageCard}>
          <View style={styles.mileageHeader}>
            <View>
              <Text style={styles.mileageTitle}>
                {t.currentMileage}
              </Text>
              <Text style={styles.mileageSubtitle}>
                {t.mileageSubtitle}
              </Text>
            </View>

            <Text style={styles.mileageStatus}>{t.liveData}</Text>
          </View>

          <View style={styles.mileageValueRow}>
            <Text style={styles.mileageValue}>
              {mileage
                ? Number(mileage).toLocaleString('en-US')
                : '0'}
            </Text>
            <Text style={styles.mileageUnit}>{t.miles}</Text>
          </View>

          <View style={styles.mileageChips}>
            {MILEAGE_OPTIONS.map((value) => (
              <Pressable
                key={value}
                style={[
                  styles.mileageChip,
                  mileage === value && styles.mileageChipSelected,
                ]}
                onPress={() => {
                  setMileage(value);
                  setEstimatedValue(null);
                }}
              >
                <Text
                  style={[
                    styles.mileageChipText,
                    mileage === value && styles.mileageChipTextSelected,
                  ]}
                >
                  {Number(value).toLocaleString('en-US')}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* CONDITION */}
        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View style={styles.sectionNumber}>
              <Text style={styles.sectionNumberText}>02</Text>
            </View>

            <View style={styles.sectionHeadingText}>
              <Text style={styles.sectionTitle}>
                {t.conditionTitle}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {t.conditionSubtitle}
              </Text>
            </View>
          </View>

          {CONDITIONS.map((item) => {
            const selected = condition === item.id;
            const conditionText = t.conditions[item.id];

            return (
              <Pressable
                key={item.id}
                style={[
                  styles.conditionCard,
                  selected && styles.conditionCardSelected,
                ]}
                onPress={() => {
                  setCondition(item.id);
                  setEstimatedValue(null);
                }}
              >
                <View style={styles.conditionRadio}>
                  {selected && (
                    <View style={styles.conditionRadioInner} />
                  )}
                </View>

                <View style={styles.conditionInfo}>
                  <View style={styles.conditionTitleRow}>
                    <Text
                      style={[
                        styles.conditionTitle,
                        selected && styles.goldText,
                      ]}
                    >
                      {conditionText.title}
                    </Text>

                    <Text
                      style={[
                        styles.conditionTag,
                        selected && styles.conditionTagSelected,
                      ]}
                    >
                      {conditionText.tag}
                    </Text>
                  </View>

                  <Text style={styles.conditionSubtitle}>
                    {conditionText.subtitle}
                  </Text>
                </View>

                {selected && (
                  <Text style={styles.selectedText}>{t.selected}</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* VEHICLE PHOTOS */}
        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View style={styles.sectionNumber}>
              <Text style={styles.sectionNumberText}>03</Text>
            </View>

            <View style={styles.sectionHeadingText}>
              <Text style={styles.sectionTitle}>{t.photosTitle}</Text>
              <Text style={styles.sectionSubtitle}>
                {t.photosSubtitle}
              </Text>
            </View>
          </View>

          <View style={styles.photoCard}>
            <View style={styles.photoHeader}>
              <View style={styles.photoHeaderIcon}>
                <Text style={styles.photoIcon}>▧</Text>
              </View>

              <View style={styles.photoHeaderText}>
                <Text style={styles.photoTitle}>{t.addPhotos}</Text>
                <Text style={styles.photoDescription}>
                  {t.photosDescription}
                </Text>
              </View>
            </View>

            <View style={styles.photoGrid}>
              {[t.photoFront, t.photoRear, t.photoInterior, t.photoSide].map(
                (item, index) => (
                  <View key={item} style={styles.photoPlaceholder}>
                    <Text style={styles.photoPlaceholderIcon}>
                      {index === 2 ? '▤' : '▧'}
                    </Text>
                    <Text style={styles.photoPlaceholderText}>
                      {item}
                    </Text>
                  </View>
                ),
              )}
            </View>

            <Text style={styles.photoComingSoon}>
              {t.photosComingSoon}
            </Text>
          </View>
        </View>

        {/* ESTIMATE */}
        {estimatedValue !== null && (
          <View style={styles.estimateCard}>
            <Text style={styles.estimateEyebrow}>
              {t.estimateTitle}
            </Text>

            <Text style={styles.estimateValue}>
              ${estimatedValue.toLocaleString('en-US')}
            </Text>

            <View style={styles.estimateDivider} />

            <View style={styles.estimateBottom}>
              <View style={styles.estimateColumn}>
                <Text style={styles.estimateSmallLabel}>
                  {t.vehicle}
                </Text>
                <Text style={styles.estimateSmallValue}>
                  {brand === 'Mercedes' ? 'Mercedes-Benz' : brand} {model}
                </Text>
              </View>

              <View>
                <Text style={styles.estimateSmallLabel}>
                  {t.estimateYear}
                </Text>
                <Text style={styles.estimateSmallValue}>{year}</Text>
              </View>
            </View>

            <Text style={styles.estimateDisclaimer}>
              {t.estimateDisclaimer}
            </Text>

            <Pressable
              style={styles.offerButton}
              onPress={handleOffer}
            >
              <Text style={styles.offerButtonText}>{t.getOffer}</Text>
              <Text style={styles.offerArrow}>→</Text>
            </Pressable>
          </View>
        )}

        {/* CALCULATE */}
        <Pressable
          style={styles.calculateButton}
          onPress={calculateValue}
        >
          <Text style={styles.calculateButtonText}>
            {estimatedValue === null ? t.calculate : t.recalculate}
          </Text>
          <Text style={styles.calculateArrow}>→</Text>
        </Pressable>

        <Text style={styles.footerText}>{t.footer}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(
  colors: AppColors,
  activeTheme: 'light' | 'dark',
) {
  const isDark = activeTheme === 'dark';

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 35,
    },
    header: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerButton: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backIcon: {
      color: colors.text,
      fontSize: 31,
      lineHeight: 35,
    },
    resetIcon: {
      color: colors.gold,
      fontSize: 24,
    },
    headerCenter: {
      alignItems: 'center',
    },
    headerTitle: {
      color: colors.gold,
      fontSize: 12,
      fontWeight: '800',
      letterSpacing: 2,
    },
    headerSubtitle: {
      color: colors.muted,
      fontSize: 9,
      letterSpacing: 1,
      marginTop: 4,
    },
    intro: {
      marginTop: 24,
      marginBottom: 22,
    },
    eyebrow: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 2,
      marginBottom: 12,
    },
    title: {
      color: colors.text,
      fontSize: 36,
      fontWeight: '800',
      lineHeight: 43,
    },
    goldText: {
      color: colors.gold,
    },
    description: {
      color: colors.muted,
      fontSize: 13,
      lineHeight: 21,
      marginTop: 10,
    },
    progressCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 16,
      marginBottom: 28,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 13,
    },
    progressTitle: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 1.3,
    },
    progressPercent: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '700',
    },
    progressTrack: {
      height: 5,
      borderRadius: 5,
      backgroundColor: colors.cardLight,
      overflow: 'hidden',
    },
    progressFill: {
      width: '25%',
      height: '100%',
      backgroundColor: colors.gold,
      borderRadius: 5,
    },
    progressLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 11,
    },
    activeProgressLabel: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '700',
    },
    progressLabel: {
      color: colors.muted,
      fontSize: 9,
    },
    section: {
      marginBottom: 30,
    },
    sectionHeading: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
    },
    sectionHeadingText: {
      flex: 1,
    },
    sectionNumber: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: isDark ? '#302A20' : '#F4EBD9',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    sectionNumberText: {
      color: colors.gold,
      fontSize: 12,
      fontWeight: '800',
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '800',
    },
    sectionSubtitle: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 4,
    },
    inputLabel: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '700',
      marginBottom: 9,
      marginTop: 15,
    },
    input: {
      height: 52,
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      color: colors.text,
      fontSize: 13,
    },
    brandGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 9,
    },
    brandOption: {
      paddingHorizontal: 13,
      paddingVertical: 11,
      borderRadius: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    brandOptionSelected: {
      backgroundColor: isDark ? '#302A20' : '#F4EBD9',
      borderColor: colors.gold,
    },
    brandText: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: '600',
    },
    brandTextSelected: {
      color: colors.gold,
    },
    inputRow: {
      flexDirection: 'row',
      gap: 12,
    },
    inputHalf: {
      flex: 1,
    },
    helperText: {
      color: colors.muted,
      fontSize: 10,
      lineHeight: 16,
      marginTop: 9,
    },
    vinInfo: {
      backgroundColor: isDark ? '#14283A' : '#E8EFF8',
      borderRadius: 11,
      padding: 12,
      flexDirection: 'row',
      marginTop: 15,
    },
    infoIcon: {
      color: colors.gold,
      fontSize: 17,
      marginRight: 9,
    },
    vinInfoText: {
      flex: 1,
      color: isDark ? '#B8C6D9' : '#52647D',
      fontSize: 10,
      lineHeight: 16,
    },
    decodeButton: {
      height: 48,
      backgroundColor: isDark ? '#203967' : '#E8EFF8',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginTop: 15,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    decodeButtonText: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '800',
    },
    decodeArrow: {
      color: colors.gold,
      fontSize: 18,
      position: 'absolute',
      right: 15,
    },
    mileageCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 30,
    },
    mileageHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    mileageTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
    },
    mileageSubtitle: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 5,
    },
    mileageStatus: {
      color: colors.green,
      fontSize: 9,
      fontWeight: '800',
    },
    mileageValueRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: 17,
    },
    mileageValue: {
      color: colors.text,
      fontSize: 32,
      fontWeight: '800',
    },
    mileageUnit: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: '700',
      marginLeft: 9,
      marginBottom: 6,
    },
    mileageChips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 17,
    },
    mileageChip: {
      backgroundColor: colors.cardLight,
      borderRadius: 9,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      paddingVertical: 9,
    },
    mileageChipSelected: {
      backgroundColor: isDark ? '#302A20' : '#F4EBD9',
      borderColor: colors.gold,
    },
    mileageChipText: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: '700',
    },
    mileageChipTextSelected: {
      color: colors.gold,
    },
    conditionCard: {
      minHeight: 76,
      borderRadius: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 13,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    conditionCardSelected: {
      borderColor: colors.gold,
      backgroundColor: isDark ? '#1C2636' : '#F8F2E7',
    },
    conditionRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    conditionRadioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.gold,
    },
    conditionInfo: {
      flex: 1,
    },
    conditionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 7,
    },
    conditionTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '700',
    },
    conditionTag: {
      color: colors.muted,
      fontSize: 7,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    conditionTagSelected: {
      color: colors.green,
    },
    conditionSubtitle: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 5,
    },
    selectedText: {
      color: colors.gold,
      fontSize: 8,
      fontWeight: '800',
      letterSpacing: 0.5,
      marginLeft: 5,
    },
    photoCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: 'dashed',
      padding: 16,
    },
    photoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    photoHeaderIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: isDark ? '#302A20' : '#F4EBD9',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    photoIcon: {
      color: colors.gold,
      fontSize: 25,
    },
    photoHeaderText: {
      flex: 1,
    },
    photoTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '700',
    },
    photoDescription: {
      color: colors.muted,
      fontSize: 10,
      lineHeight: 15,
      marginTop: 5,
    },
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 9,
      marginTop: 17,
    },
    photoPlaceholder: {
      width: '48%',
      minHeight: 76,
      flexGrow: 1,
      backgroundColor: colors.cardLight,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    photoPlaceholderIcon: {
      color: colors.gold,
      fontSize: 22,
      marginBottom: 5,
    },
    photoPlaceholderText: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: '700',
    },
    photoComingSoon: {
      color: colors.gold,
      fontSize: 8,
      fontWeight: '800',
      letterSpacing: 0.7,
      marginTop: 16,
      textAlign: 'center',
    },
    estimateCard: {
      backgroundColor: isDark ? '#142B2B' : '#E8F4EF',
      borderWidth: 1,
      borderColor: colors.green,
      borderRadius: 18,
      padding: 18,
      marginBottom: 20,
    },
    estimateEyebrow: {
      color: colors.green,
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 1.5,
    },
    estimateValue: {
      color: colors.text,
      fontSize: 34,
      fontWeight: '800',
      marginTop: 10,
    },
    estimateDivider: {
      height: 1,
      backgroundColor: isDark ? '#31514B' : '#B8D9CC',
      marginVertical: 16,
    },
    estimateBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    estimateColumn: {
      flex: 1,
    },
    estimateSmallLabel: {
      color: isDark ? '#9DB9B0' : '#55776B',
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 1,
    },
    estimateSmallValue: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '700',
      marginTop: 5,
    },
    estimateDisclaimer: {
      color: isDark ? '#A8BEB5' : '#55776B',
      fontSize: 9,
      lineHeight: 15,
      marginTop: 17,
    },
    offerButton: {
      minHeight: 48,
      backgroundColor: colors.gold,
      borderRadius: 11,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 38,
      marginTop: 17,
    },
    offerButtonText: {
      color: isDark ? '#080F1E' : '#FFFFFF',
      fontSize: 12,
      fontWeight: '800',
      textAlign: 'center',
    },
    offerArrow: {
      color: isDark ? '#080F1E' : '#FFFFFF',
      fontSize: 19,
      position: 'absolute',
      right: 15,
    },
    calculateButton: {
      minHeight: 57,
      backgroundColor: colors.gold,
      borderRadius: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 45,
    },
    calculateButtonText: {
      color: isDark ? '#080F1E' : '#FFFFFF',
      fontSize: 13,
      fontWeight: '800',
      textAlign: 'center',
    },
    calculateArrow: {
      color: isDark ? '#080F1E' : '#FFFFFF',
      fontSize: 21,
      position: 'absolute',
      right: 18,
    },
    footerText: {
      color: colors.muted,
      fontSize: 9,
      textAlign: 'center',
      letterSpacing: 1.1,
      marginTop: 25,
    },
  });
}
