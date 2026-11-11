
import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { useBookings } from '../../context/bookings-context';
import { useAppTheme } from '../../context/theme-context';
import { useLanguage } from '../../context/language-context';

const translations = {
  EN: {
    title: 'My Bookings',
    subtitle: 'Manage your upcoming appointments',
    emptyTitle: 'No bookings yet',
    emptyText: 'Your test drives and showroom visits will appear here.',
    testDrive: 'TEST DRIVE',
    showroom: 'SHOWROOM VISIT',
    confirmed: 'CONFIRMED',
    vehicle: 'Vehicle',
    date: 'DATE',
    time: 'TIME',
    location: 'LOCATION',
    contact: 'CONTACT',
    cancel: 'Cancel booking',
    cancelTitle: 'Cancel booking',
    cancelMessage: 'Are you sure you want to cancel this booking?',
    no: 'Keep booking',
    yes: 'Cancel',
  },
  RU: {
    title: 'Мои записи',
    subtitle: 'Управляйте предстоящими встречами',
    emptyTitle: 'Пока нет записей',
    emptyText: 'Здесь будут отображаться ваши тест-драйвы и визиты в автосалон.',
    testDrive: 'ТЕСТ-ДРАЙВ',
    showroom: 'ВИЗИТ В АВТОСАЛОН',
    confirmed: 'ПОДТВЕРЖДЕНО',
    vehicle: 'Автомобиль',
    date: 'ДАТА',
    time: 'ВРЕМЯ',
    location: 'МЕСТО',
    contact: 'КОНТАКТ',
    cancel: 'Отменить запись',
    cancelTitle: 'Отменить запись',
    cancelMessage: 'Вы действительно хотите отменить эту запись?',
    no: 'Оставить',
    yes: 'Отменить',
  },
  TR: {
    title: 'Rezervasyonlarım',
    subtitle: 'Yaklaşan randevularınızı yönetin',
    emptyTitle: 'Henüz rezervasyon yok',
    emptyText: 'Test sürüşleriniz ve showroom ziyaretleriniz burada görünecek.',
    testDrive: 'TEST SÜRÜŞÜ',
    showroom: 'SHOWROOM ZİYARETİ',
    confirmed: 'ONAYLANDI',
    vehicle: 'Araç',
    date: 'TARİH',
    time: 'SAAT',
    location: 'KONUM',
    contact: 'İLETİŞİM',
    cancel: 'Rezervasyonu iptal et',
    cancelTitle: 'Rezervasyonu iptal et',
    cancelMessage: 'Bu rezervasyonu iptal etmek istediğinizden emin misiniz?',
    no: 'Vazgeç',
    yes: 'İptal et',
  },
  AZ: {
    title: 'Mənim Qeydiyyatlarım',
    subtitle: 'Qarşıdakı görüşlərinizi idarə edin',
    emptyTitle: 'Hələ qeydiyyat yoxdur',
    emptyText: 'Test sürüşləriniz və salon ziyarətləriniz burada görünəcək.',
    testDrive: 'TEST SÜRÜŞÜ',
    showroom: 'SALON ZİYARƏTİ',
    confirmed: 'TƏSDİQLƏNİB',
    vehicle: 'Avtomobil',
    date: 'TARİX',
    time: 'SAAT',
    location: 'MƏKAN',
    contact: 'ƏLAQƏ',
    cancel: 'Qeydiyyatı ləğv et',
    cancelTitle: 'Qeydiyyatı ləğv et',
    cancelMessage: 'Bu qeydiyyatı ləğv etmək istədiyinizə əminsiniz?',
    no: 'Xeyr',
    yes: 'Ləğv et',
  },
};

export default function BookingsScreen() {
  const { bookings, removeBooking } = useBookings();
  const { colors } = useAppTheme();
  const { language } = useLanguage();

  const t = translations[language];

  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t.title}</Text>
        <Text style={styles.subtitle}>{t.subtitle}</Text>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>◷</Text>
          <Text style={styles.emptyTitle}>{t.emptyTitle}</Text>
          <Text style={styles.emptyText}>{t.emptyText}</Text>
        </View>
      ) : (
        bookings.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.cardHeader}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>
                  {booking.type === 'test-drive'
                    ? t.testDrive
                    : t.showroom}
                </Text>
              </View>

              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{t.confirmed}</Text>
              </View>
            </View>

            {booking.carName ? (
              <Text style={styles.carName}>{booking.carName}</Text>
            ) : null}

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>{t.date}</Text>
                <Text style={styles.value}>{booking.date}</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.label}>{t.time}</Text>
                <Text style={styles.value}>{booking.time}</Text>
              </View>
            </View>

            <View style={styles.locationBlock}>
              <Text style={styles.label}>{t.location}</Text>
              <Text style={styles.value}>{booking.location}</Text>
            </View>

            <View style={styles.locationBlock}>
              <Text style={styles.label}>{t.contact}</Text>
              <Text style={styles.value}>{booking.name}</Text>
              <Text style={styles.mutedValue}>{booking.phone}</Text>
            </View>

            <Pressable
              style={styles.cancelButton}
              onPress={() => removeBooking(booking.id)}
            >
              <Text style={styles.cancelText}>{t.cancel}</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
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
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    header: {
      marginTop: 15,
      marginBottom: 25,
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
    emptyCard: {
      minHeight: 230,
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
    },
    emptyIcon: {
      color: colors.gold,
      fontSize: 42,
      marginBottom: 15,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '800',
    },
    emptyText: {
      color: colors.muted,
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 19,
      marginTop: 8,
    },
    bookingCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 15,
      padding: 16,
      marginBottom: 15,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    typeBadge: {
      backgroundColor: colors.dark,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 6,
    },
    typeText: {
      color: colors.gold,
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 0.7,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.green,
    },
    statusText: {
      color: colors.green,
      fontSize: 8,
      fontWeight: '900',
    },
    carName: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '900',
      marginTop: 17,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 15,
    },
    detailRow: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    detailItem: {
      flex: 1,
    },
    label: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 0.8,
      marginBottom: 6,
    },
    value: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '700',
    },
    locationBlock: {
      marginBottom: 15,
    },
    mutedValue: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 4,
    },
    cancelButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 9,
      minHeight: 42,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 3,
    },
    cancelText: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: '700',
    },
  });
}
