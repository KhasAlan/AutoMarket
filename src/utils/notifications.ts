
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function scheduleBookingNotifications(
  date: string,
  time: string,
  carName: string,
) {
  const permission = await Notifications.requestPermissionsAsync();

  if (!permission.granted) {
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('bookings', {
      name: 'Booking reminders',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }

  const channelId =
    Platform.OS === 'android' ? 'bookings' : undefined;

  // Уведомление о подтверждении
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Booking Confirmed!',
      body: `Your test drive with ${carName} is confirmed.`,
      sound: 'default',
      ...(channelId ? { channelId } : {}),
    },
    trigger: null,
  });

  // Преобразуем дату и время бронирования
  const [year, month, day] = date.split('-').map(Number);

  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const bookingDate = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
  );

  // Напоминание за 24 часа,
  // либо за 15 минут, если бронирование скоро
  let reminderDate = new Date(
    bookingDate.getTime() - 24 * 60 * 60 * 1000,
  );

  if (reminderDate.getTime() <= Date.now()) {
    reminderDate = new Date(
      bookingDate.getTime() - 15 * 60 * 1000,
    );
  }

  if (reminderDate.getTime() > Date.now()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your Test Drive is Coming!',
        body: `Get ready for your ${carName} experience.`,
        sound: 'default',
        ...(channelId ? { channelId } : {}),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminderDate,
        ...(channelId ? { channelId } : {}),
      },
    });
  }
}
