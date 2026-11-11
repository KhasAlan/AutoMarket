import { useBookings } from '../../context/bookings-context';
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { scheduleBookingNotifications } from '@/utils/notifications';

import { cars } from '../../data/mock/cars';
import { useAppTheme } from '../../context/theme-context';
import { useLanguage } from '../../context/language-context';

const translations = {
  EN: {
    brand: 'AUTOMARKET',
    title: 'Book a Test Drive',
    subtitle: 'Experience your next vehicle in person.',
    selected: 'SELECTED VEHICLE',
    available: 'AVAILABLE',
    date: 'Select Date',
    month: 'October 2026',
    time: 'Select Time Slot',
    morning: 'MORNING',
    afternoon: 'AFTERNOON',
    evening: 'EVENING',
    timezone: 'All times are in local showroom time',
    experience: 'Test Drive Experience',
    vip: 'Dealership VIP Lounge',
    vipDesc: 'Enjoy a premium welcome at our exclusive showroom.',
    delivery: 'White-Glove Delivery',
    deliveryDesc: 'Have your selected vehicle delivered to your location.',
    standard: 'Standard Test Drive',
    standardDesc: 'Experience the vehicle with our specialist.',
    verification: 'Driver Verification & Details',
    verified: 'Verified',
    license: 'Driver License Number',
    licensePlaceholder: 'Enter license number',
    fullName: 'Full Legal Name',
    namePlaceholder: 'Enter your full name',
    phone: 'Contact Phone',
    phonePlaceholder: '+994 50 000 00 00',
    email: 'Email Address',
    emailPlaceholder: 'your@email.com',
    confirmLicense: 'I confirm that I hold a valid driver license.',
    button: 'Confirm Test Drive',
    note: 'Demo booking. No real reservation will be sent.',
    missing: 'Missing information',
    nameError: 'Please enter your full name.',
    phoneError: 'Please enter your phone number.',
    dateError: 'Please select a date.',
    timeError: 'Please select a time slot.',
    licenseError: 'Please confirm your valid driver license.',
    success: 'Booking Confirmed!',
    successDesc: 'Your test drive request has been prepared.',
    vehicle: 'YOUR VEHICLE',
    dateLabel: 'DATE',
    timeLabel: 'TIME',
    contact: 'CONTACT',
    backHome: 'Back to Home',
    backVehicle: 'Back to Vehicle',
    demo: 'Demo confirmation — no real booking was sent.',
    carNotFound: 'Car not found',
    goBack: 'Go back',
  },
  RU: {
    brand: 'AUTOMARKET',
    title: 'Запись на тест-драйв',
    subtitle: 'Познакомьтесь со своим будущим автомобилем лично.',
    selected: 'ВЫБРАННЫЙ АВТОМОБИЛЬ',
    available: 'ДОСТУПЕН',
    date: 'Выберите дату',
    month: 'Октябрь 2026',
    time: 'Выберите время',
    morning: 'УТРО',
    afternoon: 'ДЕНЬ',
    evening: 'ВЕЧЕР',
    timezone: 'Время указано по часовому поясу автосалона',
    experience: 'Формат тест-драйва',
    vip: 'VIP-зона автосалона',
    vipDesc: 'Премиальный приём в нашем эксклюзивном автосалоне.',
    delivery: 'Доставка с особым сервисом',
    deliveryDesc: 'Доставим выбранный автомобиль по вашему адресу.',
    standard: 'Стандартный тест-драйв',
    standardDesc: 'Оцените автомобиль вместе с нашим специалистом.',
    verification: 'Проверка водителя и данные',
    verified: 'Проверено',
    license: 'Номер водительского удостоверения',
    licensePlaceholder: 'Введите номер удостоверения',
    fullName: 'Полное имя',
    namePlaceholder: 'Введите ваше полное имя',
    phone: 'Контактный телефон',
    phonePlaceholder: '+994 50 000 00 00',
    email: 'Электронная почта',
    emailPlaceholder: 'your@email.com',
    confirmLicense: 'Подтверждаю наличие действующего водительского удостоверения.',
    button: 'Подтвердить запись',
    note: 'Демонстрационная запись. Реальное бронирование не отправляется.',
    missing: 'Не хватает данных',
    nameError: 'Введите ваше полное имя.',
    phoneError: 'Введите номер телефона.',
    dateError: 'Выберите дату.',
    timeError: 'Выберите время.',
    licenseError: 'Подтвердите наличие действующих водительских прав.',
    success: 'Запись подтверждена!',
    successDesc: 'Ваша заявка на тест-драйв подготовлена.',
    vehicle: 'ВАШ АВТОМОБИЛЬ',
    dateLabel: 'ДАТА',
    timeLabel: 'ВРЕМЯ',
    contact: 'КОНТАКТ',
    backHome: 'На главную',
    backVehicle: 'К автомобилю',
    demo: 'Демонстрационное подтверждение — реальная запись не отправлена.',
    carNotFound: 'Автомобиль не найден',
    goBack: 'Назад',
  },
  TR: {
    brand: 'AUTOMARKET',
    title: 'Test Sürüşü Rezervasyonu',
    subtitle: 'Gelecekteki aracınızı yakından deneyimleyin.',
    selected: 'SEÇİLEN ARAÇ',
    available: 'MÜSAİT',
    date: 'Tarih Seçin',
    month: 'Ekim 2026',
    time: 'Saat Aralığı Seçin',
    morning: 'SABAH',
    afternoon: 'ÖĞLEDEN SONRA',
    evening: 'AKŞAM',
    timezone: 'Tüm saatler showroom yerel saatine göredir',
    experience: 'Test Sürüşü Deneyimi',
    vip: 'VIP Bayi Salonu',
    vipDesc: 'Özel showroomumuzda premium karşılama.',
    delivery: 'Özel Teslimat',
    deliveryDesc: 'Seçtiğiniz aracı belirttiğiniz konuma getirelim.',
    standard: 'Standart Test Sürüşü',
    standardDesc: 'Aracı uzmanımız eşliğinde deneyimleyin.',
    verification: 'Sürücü Doğrulama ve Bilgileri',
    verified: 'Doğrulandı',
    license: 'Ehliyet Numarası',
    licensePlaceholder: 'Ehliyet numarasını girin',
    fullName: 'Ad Soyad',
    namePlaceholder: 'Adınızı ve soyadınızı girin',
    phone: 'Telefon Numarası',
    phonePlaceholder: '+994 50 000 00 00',
    email: 'E-posta Adresi',
    emailPlaceholder: 'your@email.com',
    confirmLicense: 'Geçerli bir sürücü belgesine sahip olduğumu onaylıyorum.',
    button: 'Rezervasyonu Onayla',
    note: 'Demo rezervasyonu. Gerçek bir rezervasyon gönderilmez.',
    missing: 'Eksik bilgi',
    nameError: 'Lütfen adınızı ve soyadınızı girin.',
    phoneError: 'Lütfen telefon numaranızı girin.',
    dateError: 'Lütfen bir tarih seçin.',
    timeError: 'Lütfen bir saat seçin.',
    licenseError: 'Lütfen geçerli ehliyetinizi onaylayın.',
    success: 'Rezervasyon Onaylandı!',
    successDesc: 'Test sürüşü talebiniz hazırlandı.',
    vehicle: 'ARACINIZ',
    dateLabel: 'TARİH',
    timeLabel: 'SAAT',
    contact: 'İLETİŞİM',
    backHome: 'Ana Sayfaya Dön',
    backVehicle: 'Araca Geri Dön',
    demo: 'Demo onayı — gerçek rezervasyon gönderilmedi.',
    carNotFound: 'Araç bulunamadı',
    goBack: 'Geri dön',
  },
  AZ: {
    brand: 'AUTOMARKET',
    title: 'Test Sürüşü üçün Qeydiyyat',
    subtitle: 'Gələcək avtomobilinizi yaxından sınaqdan keçirin.',
    selected: 'SEÇİLMİŞ AVTOMOBİL',
    available: 'MÖVCUDDUR',
    date: 'Tarix seçin',
    month: 'Oktyabr 2026',
    time: 'Saatı seçin',
    morning: 'SƏHƏR',
    afternoon: 'GÜNDÜZ',
    evening: 'AXŞAM',
    timezone: 'Bütün saatlar salonun yerli vaxtı ilə göstərilir',
    experience: 'Test Sürüşü Təcrübəsi',
    vip: 'VIP Avtosalon',
    vipDesc: 'Eksklüziv salonumuzda premium qarşılama.',
    delivery: 'Xüsusi Çatdırılma',
    deliveryDesc: 'Seçdiyiniz avtomobili ünvanınıza çatdıraq.',
    standard: 'Standart Test Sürüşü',
    standardDesc: 'Avtomobili mütəxəssisimizlə birlikdə sınayın.',
    verification: 'Sürücü Yoxlanışı və Məlumatlar',
    verified: 'Təsdiqlənib',
    license: 'Sürücülük vəsiqəsinin nömrəsi',
    licensePlaceholder: 'Vəsiqə nömrəsini daxil edin',
    fullName: 'Tam Ad Soyad',
    namePlaceholder: 'Tam adınızı daxil edin',
    phone: 'Əlaqə Telefonu',
    phonePlaceholder: '+994 50 000 00 00',
    email: 'E-poçt ünvanı',
    emailPlaceholder: 'your@email.com',
    confirmLicense: 'Etibarlı sürücülük vəsiqəm olduğunu təsdiq edirəm.',
    button: 'Qeydiyyatı Təsdiqlə',
    note: 'Demo qeydiyyatı. Real rezervasiya göndərilmir.',
    missing: 'Məlumat çatışmır',
    nameError: 'Tam adınızı daxil edin.',
    phoneError: 'Telefon nömrənizi daxil edin.',
    dateError: 'Tarix seçin.',
    timeError: 'Saat seçin.',
    licenseError: 'Etibarlı sürücülük vəsiqənizi təsdiqləyin.',
    success: 'Qeydiyyat Təsdiqləndi!',
    successDesc: 'Test sürüşü müraciətiniz hazırlanıb.',
    vehicle: 'AVTOMOBİLİNİZ',
    dateLabel: 'TARİX',
    timeLabel: 'SAAT',
    contact: 'ƏLAQƏ',
    backHome: 'Ana Səhifəyə',
    backVehicle: 'Avtomobilə qayıt',
    demo: 'Demo təsdiqi — real rezervasiya göndərilməyib.',
    carNotFound: 'Avtomobil tapılmadı',
    goBack: 'Geri qayıt',
  },
};

const TIME_GROUPS = [
  {
    key: 'morning',
    times: ['09:00 AM', '10:30 AM', '11:30 AM'],
  },
  {
    key: 'afternoon',
    times: ['01:00 PM', '02:30 PM', '04:00 PM'],
  },
  {
    key: 'evening',
    times: ['05:00 PM', '06:00 PM'],
  },
];

const EXPERIENCE_OPTIONS = [
  { id: 'vip', icon: '✦' },
  { id: 'delivery', icon: '⌖' },
  { id: 'standard', icon: '◈' },
];

const LOCALES = {
  EN: 'en-US',
  RU: 'ru-RU',
  TR: 'tr-TR',
  AZ: 'az-AZ',
} as const;

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function BookTestDriveScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const car = cars.find((item) => String(item.id) === String(id));

  const { colors, activeTheme } = useAppTheme();
  const { language } = useLanguage();
  const { addBooking } = useBookings();
  const t = translations[language];

  const styles = useMemo(
    () => createStyles(colors),
    [colors]
  );

  const dates = useMemo(() => {
    const today = new Date();

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return date;
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState(
    getDateKey(dates[1])
  );
  const [selectedTime, setSelectedTime] = useState('');
  const [experience, setExperience] = useState('vip');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [license, setLicense] = useState('');
  const [licenseConfirmed, setLicenseConfirmed] = useState(false);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const locale = LOCALES[language];

  const formattedDate = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
        locale,
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }
      )
    : '';

  const showError = (message: string) => {
    Alert.alert(t.missing, message);
  };

const handleBooking = () => {
  if (!car) return;

  if (!name.trim()) return showError(t.nameError);
  if (!phone.trim()) return showError(t.phoneError);
  if (!selectedDate) return showError(t.dateError);
  if (!selectedTime) return showError(t.timeError);
  if (!licenseConfirmed) return showError(t.licenseError);

  const newBooking = {
    id: Date.now().toString(),
    type: 'test-drive' as const,
    date: selectedDate,
    time: selectedTime,
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    carId: String(car.id),
    carName: `${car.brand} ${car.model}`,
    experience,
    location: car.location,
    status: 'confirmed' as const,
  };

addBooking(newBooking);

scheduleBookingNotifications(
  selectedDate,
  selectedTime,
  `${car.brand} ${car.model}`,
);

setIsConfirmed(true);
};

  if (!car) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>{t.carNotFound}</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>{t.goBack}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (isConfirmed) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
        <ScrollView contentContainerStyle={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successCheck}>✓</Text>
          </View>

          <Text style={styles.successTitle}>{t.success}</Text>
          <Text style={styles.successSubtitle}>{t.successDesc}</Text>

          <View style={styles.confirmationCard}>
            <Text style={styles.confirmationLabel}>{t.vehicle}</Text>
            <Text style={styles.confirmationCar}>
              {car.brand} {car.model}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.confirmationLabel}>{t.dateLabel}</Text>
            <Text style={styles.confirmationValue}>{formattedDate}</Text>

            <View style={styles.divider} />

            <Text style={styles.confirmationLabel}>{t.timeLabel}</Text>
            <Text style={styles.confirmationValue}>{selectedTime}</Text>

            <View style={styles.divider} />

            <Text style={styles.confirmationLabel}>{t.contact}</Text>
            <Text style={styles.confirmationValue}>{phone}</Text>
          </View>

          <Text style={styles.demoNote}>{t.demo}</Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.primaryButtonText}>{t.backHome}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>{t.backVehicle}</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.screen}>
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backArrow}>‹</Text>
            </Pressable>

            <View style={styles.headerCenter}>
              <Text style={styles.brand}>{t.brand}</Text>
              <Text style={styles.headerTitle}>{t.title}</Text>
            </View>

            <View style={styles.headerRight}>
              <Text style={styles.headerIcon}>◉</Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* SELECTED VEHICLE */}
            <View style={styles.carCard}>
              <Image
                source={{ uri: car.image }}
                style={styles.carImage}
                resizeMode="cover"
              />

              <View style={styles.carInfo}>
                <Text style={styles.carEyebrow}>{t.selected}</Text>
                <Text style={styles.carName} numberOfLines={2}>
                  {car.brand} {car.model}
                </Text>
                <Text style={styles.carLocation}>
                  {car.location}
                </Text>
                <View style={styles.carMeta}>
                  <Text style={styles.carMetaText}>{car.year}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.carMetaText}>{car.category}</Text>
                </View>
              </View>

              <View style={styles.availableBadge}>
                <View style={styles.availableDot} />
                <Text style={styles.availableText}>{t.available}</Text>
              </View>
            </View>

            {/* DATE */}
            <View style={styles.section}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>{t.date}</Text>
                <Text style={styles.monthText}>
                  {dates[0].toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
              </View>

              <View style={styles.dateRow}>
                {dates.map((date) => {
                  const key = getDateKey(date);
                  const selected = selectedDate === key;

                  return (
                    <Pressable
                      key={key}
                      onPress={() => setSelectedDate(key)}
                      style={[
                        styles.dateItem,
                        selected && styles.dateItemSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dateWeekday,
                          selected && styles.selectedDateText,
                        ]}
                      >
                        {date.toLocaleDateString(locale, {
                          weekday: 'short',
                        }).toUpperCase()}
                      </Text>

                      <Text
                        style={[
                          styles.dateNumber,
                          selected && styles.selectedDateText,
                        ]}
                      >
                        {date.getDate()}
                      </Text>

                      {selected && <View style={styles.dateDot} />}
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* TIME */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.time}</Text>

              {TIME_GROUPS.map((group) => (
                <View key={group.key} style={styles.timeGroup}>
                  <Text style={styles.groupLabel}>
                    {t[group.key as keyof typeof t]}
                  </Text>

                  <View style={styles.timeRow}>
                    {group.times.map((time) => {
                      const selected = selectedTime === time;

                      return (
                        <Pressable
                          key={time}
                          onPress={() => setSelectedTime(time)}
                          style={[
                            styles.timeSlot,
                            selected && styles.timeSlotSelected,
                          ]}
                        >
                          <Text
                            style={[
                              styles.timeText,
                              selected && styles.timeTextSelected,
                            ]}
                          >
                            {time}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}

              <Text style={styles.timezone}>{t.timezone}</Text>
            </View>

            {/* EXPERIENCE */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.experience}</Text>

              {EXPERIENCE_OPTIONS.map((option) => {
                const selected = experience === option.id;

                const title =
                  option.id === 'vip'
                    ? t.vip
                    : option.id === 'delivery'
                      ? t.delivery
                      : t.standard;

                const description =
                  option.id === 'vip'
                    ? t.vipDesc
                    : option.id === 'delivery'
                      ? t.deliveryDesc
                      : t.standardDesc;

                return (
                  <Pressable
                    key={option.id}
                    onPress={() => setExperience(option.id)}
                    style={[
                      styles.experienceCard,
                      selected && styles.experienceCardSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.experienceIcon,
                        selected && styles.experienceIconSelected,
                      ]}
                    >
                      <Text style={styles.experienceIconText}>
                        {option.icon}
                      </Text>
                    </View>

                    <View style={styles.experienceInfo}>
                      <Text style={styles.experienceTitle}>{title}</Text>
                      <Text style={styles.experienceDescription}>
                        {description}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.radio,
                        selected && styles.radioSelected,
                      ]}
                    >
                      {selected && <View style={styles.radioInner} />}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {/* DRIVER VERIFICATION */}
            <View style={styles.section}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>{t.verification}</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>{t.verified}</Text>
                </View>
              </View>

              <View style={styles.verificationCard}>
                <View style={styles.licenseHeader}>
                  <Text style={styles.licenseIcon}>▣</Text>
                  <View style={styles.licenseHeaderText}>
                    <Text style={styles.licenseTitle}>{t.license}</Text>
                    <Text style={styles.licenseStatus}>{t.verified}</Text>
                  </View>
                  <Text style={styles.licenseCheck}>✓</Text>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder={t.licensePlaceholder}
                  placeholderTextColor={colors.muted}
                  value={license}
                  onChangeText={setLicense}
                />

                <Pressable
                  style={styles.confirmLicenseRow}
                  onPress={() => setLicenseConfirmed(!licenseConfirmed)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      licenseConfirmed && styles.checkboxSelected,
                    ]}
                  >
                    {licenseConfirmed && (
                      <Text style={styles.checkboxCheck}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.confirmLicenseText}>
                    {t.confirmLicense}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>{t.fullName}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t.namePlaceholder}
                  placeholderTextColor={colors.muted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />

                <Text style={styles.inputLabel}>{t.phone}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t.phonePlaceholder}
                  placeholderTextColor={colors.muted}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />

                <Text style={styles.inputLabel}>{t.email}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t.emailPlaceholder}
                  placeholderTextColor={colors.muted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* LOCATION */}
            <View style={styles.locationCard}>
              <Text style={styles.locationIcon}>⌖</Text>
              <View style={styles.locationInfo}>
                <Text style={styles.locationTitle}>
                  {car.location}
                </Text>
                <Text style={styles.locationSubtitle}>
                  AutoMarket Showroom
                </Text>
              </View>
              <Text style={styles.locationArrow}>›</Text>
            </View>

            {/* CONFIRM */}
            <Pressable
              style={styles.primaryButton}
              onPress={handleBooking}
            >
              <Text style={styles.primaryButtonText}>{t.button}</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>

            <Text style={styles.footerNote}>{t.note}</Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyles(colors: {
  background: string;
  card: string;
  cardLight: string;
  gold: string;
  text: string;
  muted: string;
  border: string;
  green: string;
  dark: string;
}) {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingHorizontal: 17,
      paddingBottom: 35,
    },
    header: {
      height: 65,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 17,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 11,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backArrow: {
      color: colors.text,
      fontSize: 30,
      lineHeight: 34,
      marginTop: -3,
    },
    headerCenter: {
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
      fontSize: 14,
      fontWeight: '800',
      marginTop: 3,
    },
    headerRight: {
      width: 36,
      alignItems: 'center',
    },
    headerIcon: {
      color: colors.gold,
      fontSize: 22,
    },
    carCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 10,
      marginTop: 17,
      marginBottom: 23,
    },
    carImage: {
      width: 100,
      height: 78,
      borderRadius: 9,
      backgroundColor: colors.cardLight,
    },
    carInfo: {
      flex: 1,
      marginLeft: 11,
      marginRight: 5,
    },
    carEyebrow: {
      color: colors.gold,
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 1,
    },
    carName: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '800',
      marginTop: 5,
    },
    carLocation: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 4,
    },
    carMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    carMetaText: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: '600',
    },
    metaDot: {
      color: colors.gold,
      marginHorizontal: 5,
    },
    availableBadge: {
      position: 'absolute',
      right: 9,
      top: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.dark,
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 5,
    },
    availableDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: colors.green,
      marginRight: 4,
    },
    availableText: {
      color: colors.green,
      fontSize: 7,
      fontWeight: '900',
    },
    section: {
      marginBottom: 23,
    },
    sectionHeading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 13,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
    },
    monthText: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '700',
    },
    dateRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 6,
    },
    dateItem: {
      flex: 1,
      height: 68,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateItemSelected: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },
    dateWeekday: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '800',
    },
    dateNumber: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '900',
      marginTop: 5,
    },
    selectedDateText: {
      color: '#17191F',
    },
    dateDot: {
      position: 'absolute',
      bottom: 5,
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#17191F',
    },
    timeGroup: {
      marginTop: 14,
    },
    groupLabel: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1,
      marginBottom: 9,
    },
    timeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    timeSlot: {
      flex: 1,
      minWidth: '28%',
      height: 40,
      borderRadius: 9,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeSlotSelected: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },
    timeText: {
      color: colors.text,
      fontSize: 10,
      fontWeight: '700',
    },
    timeTextSelected: {
      color: '#17191F',
    },
    timezone: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 11,
    },
    experienceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      marginTop: 10,
      backgroundColor: colors.card,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: colors.border,
    },
    experienceCardSelected: {
      borderColor: colors.gold,
      backgroundColor: colors.cardLight,
    },
    experienceIcon: {
      width: 37,
      height: 37,
      borderRadius: 9,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    experienceIconSelected: {
      backgroundColor: colors.gold,
    },
    experienceIconText: {
      color: colors.gold,
      fontSize: 19,
      fontWeight: '800',
    },
    experienceInfo: {
      flex: 1,
    },
    experienceTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '800',
    },
    experienceDescription: {
      color: colors.muted,
      fontSize: 9,
      lineHeight: 14,
      marginTop: 4,
    },
    radio: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 1.5,
      borderColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },
    radioSelected: {
      borderColor: colors.gold,
    },
    radioInner: {
      width: 9,
      height: 9,
      borderRadius: 5,
      backgroundColor: colors.gold,
    },
    verifiedBadge: {
      backgroundColor: colors.dark,
      borderRadius: 6,
      paddingHorizontal: 9,
      paddingVertical: 5,
    },
    verifiedText: {
      color: colors.green,
      fontSize: 9,
      fontWeight: '800',
    },
    verificationCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 13,
    },
    licenseHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    licenseIcon: {
      color: colors.gold,
      fontSize: 22,
      marginRight: 10,
    },
    licenseHeaderText: {
      flex: 1,
    },
    licenseTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '800',
    },
    licenseStatus: {
      color: colors.green,
      fontSize: 9,
      marginTop: 3,
    },
    licenseCheck: {
      color: colors.green,
      fontSize: 20,
      fontWeight: '900',
    },
    formGroup: {
      marginTop: 15,
    },
    inputLabel: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: '700',
      marginBottom: 7,
      marginTop: 13,
    },
    input: {
      height: 46,
      borderRadius: 9,
      backgroundColor: colors.dark,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      color: colors.text,
      fontSize: 12,
    },
    confirmLicenseRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 13,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 9,
    },
    checkboxSelected: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },
    checkboxCheck: {
      color: '#17191F',
      fontSize: 12,
      fontWeight: '900',
    },
    confirmLicenseText: {
      flex: 1,
      color: colors.muted,
      fontSize: 9,
      lineHeight: 14,
    },
    locationCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 11,
      padding: 13,
      marginBottom: 18,
    },
    locationIcon: {
      color: colors.gold,
      fontSize: 23,
      marginRight: 11,
    },
    locationInfo: {
      flex: 1,
    },
    locationTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '800',
    },
    locationSubtitle: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 4,
    },
    locationArrow: {
      color: colors.gold,
      fontSize: 23,
    },
    primaryButton: {
      minHeight: 52,
      backgroundColor: colors.gold,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    primaryButtonText: {
      color: '#17191F',
      fontSize: 12,
      fontWeight: '900',
    },
    buttonArrow: {
      position: 'absolute',
      right: 17,
      color: '#17191F',
      fontSize: 20,
      fontWeight: '800',
    },
    footerNote: {
      color: colors.muted,
      textAlign: 'center',
      fontSize: 9,
      lineHeight: 14,
      marginTop: 12,
    },
    errorContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorTitle: {
      color: colors.text,
      fontSize: 19,
      fontWeight: '800',
    },
    backText: {
      color: colors.gold,
      marginTop: 15,
      fontWeight: '700',
    },
    successContainer: {
      flexGrow: 1,
      padding: 22,
      justifyContent: 'center',
    },
    successIcon: {
      width: 76,
      height: 76,
      borderRadius: 38,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.green,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 22,
    },
    successCheck: {
      color: colors.green,
      fontSize: 38,
      fontWeight: '800',
    },
    successTitle: {
      color: colors.text,
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
    },
    successSubtitle: {
      color: colors.muted,
      fontSize: 12,
      textAlign: 'center',
      marginTop: 9,
      marginBottom: 25,
    },
    confirmationCard: {
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 17,
      marginBottom: 15,
    },
    confirmationLabel: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1,
    },
    confirmationCar: {
      color: colors.gold,
      fontSize: 17,
      fontWeight: '900',
      marginTop: 6,
    },
    confirmationValue: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '700',
      marginTop: 6,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 13,
    },
    demoNote: {
      color: colors.muted,
      fontSize: 10,
      textAlign: 'center',
      marginBottom: 18,
    },
    secondaryButton: {
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    secondaryButtonText: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '700',
    },
  });
}
