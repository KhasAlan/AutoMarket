
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useBookings } from '../../context/bookings-context';

import {
  chatAdvisor,
  chatVehicle,
  initialMessages,
  quickReplies,
  testDriveDetails,
} from '../../data/mock/live-chat';

type Message = {
  id: string;
  text: string;
  time: string;
  sender: 'advisor' | 'user';
};

const COLORS = {
  background: '#080D18',
  card: '#111D32',
  cardLight: '#192944',
  gold: '#D6AD60',
  white: '#FFFFFF',
  gray: '#929BAA',
  border: '#29364B',
  green: '#35C98A',
};

export default function LiveDealerChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [messageText, setMessageText] = useState('');
  const { addBooking } = useBookings();

  const showDemo = (feature: string) => {
    Alert.alert(
      feature,
      'This feature is available in the local demo version.',
      [{ text: 'OK' }],
    );
  };

  const handleConfirmSlot = () => {
  addBooking({
    id: Date.now().toString(),
    type: 'test-drive',
    date: testDriveDetails.date,
    time: testDriveDetails.time,
    name: 'VIP Client',
    phone: '—',
    carName: testDriveDetails.vehicle,
    experience: testDriveDetails.duration,
    location: 'Porsche Center Baku',
    status: 'confirmed',
  });

  router.push('/booking-confirmation');
};

  const sendMessage = (text?: string) => {
    const content = (text ?? messageText).trim();

    if (!content) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: content,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      sender: 'user',
    };

    setMessages((previous) => [...previous, newMessage]);
    setMessageText('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <View style={styles.headerAdvisor}>
            <Image
              source={{ uri: chatAdvisor.image }}
              style={styles.headerAvatar}
            />

            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>Julian Vance</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online Now</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.headerButton}
            onPress={() => showDemo('Call Advisor')}
          >
            <Text style={styles.headerAction}>☎</Text>
          </Pressable>

          <Pressable
            style={styles.headerButton}
            onPress={() => showDemo('Advisor Information')}
          >
            <Text style={styles.headerAction}>ⓘ</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ADVISOR PROFILE */}
          <View style={styles.profileCard}>
            <View style={styles.profileTop}>
              <Image
                source={{ uri: chatAdvisor.image }}
                style={styles.profileAvatar}
              />

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {chatAdvisor.name}
                </Text>
                <Text style={styles.profileRole}>
                  {chatAdvisor.role}
                </Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>
                    ✦ {chatAdvisor.badge}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.secureRow}>
              <Text style={styles.secureIcon}>🔒</Text>
              <Text style={styles.secureText}>
                Direct encrypted link with Porsche Beverly Hills
              </Text>
            </View>
          </View>

          {/* VEHICLE CARD */}
          <View style={styles.vehicleCard}>
            <Image
              source={{ uri: chatVehicle.image }}
              style={styles.vehicleImage}
              resizeMode="cover"
            />

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleLabel}>YOUR SELECTED VEHICLE</Text>
              <Text style={styles.vehicleName}>
                {chatVehicle.year} {chatVehicle.brand}
              </Text>
              <Text style={styles.vehicleModel}>
                {chatVehicle.model}
              </Text>
              <Text style={styles.vehiclePrice}>
                {chatVehicle.price}
              </Text>
            </View>
          </View>

          {/* CHAT TITLE */}
          <View style={styles.chatDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>TODAY</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* MESSAGES */}
          {messages.map((message) => {
            const isUser = message.sender === 'user';

            return (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  isUser && styles.userMessageRow,
                ]}
              >
                {!isUser && (
                  <Image
                    source={{ uri: chatAdvisor.image }}
                    style={styles.messageAvatar}
                  />
                )}

                <View
                  style={[
                    styles.messageContent,
                    isUser && styles.userMessageContent,
                  ]}
                >
                  <View
                    style={[
                      styles.messageBubble,
                      isUser && styles.userBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        isUser && styles.userMessageText,
                      ]}
                    >
                      {message.text}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.messageTime,
                      isUser && styles.userMessageTime,
                    ]}
                  >
                    {message.time}
                    {isUser ? '  ✓✓' : ''}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* TEST DRIVE BOOKING */}
          <View style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <View style={styles.bookingIconBox}>
                <Text style={styles.bookingIcon}>🚘</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.bookingLabel}>
                  {testDriveDetails.title}
                </Text>
                <Text style={styles.bookingVehicle}>
                  {testDriveDetails.vehicle}
                </Text>
              </View>

              <View style={styles.pendingBadge}>
                <Text style={styles.pendingText}>PROPOSED</Text>
              </View>
            </View>

            <View style={styles.bookingDivider} />

            <View style={styles.bookingDetail}>
              <Text style={styles.detailLabel}>DATE</Text>
              <Text style={styles.detailValue}>
                {testDriveDetails.date}
              </Text>
            </View>

            <View style={styles.bookingDetail}>
              <Text style={styles.detailLabel}>TIME</Text>
              <Text style={styles.detailValue}>
                {testDriveDetails.time}
              </Text>
            </View>

            <View style={styles.bookingDetail}>
              <Text style={styles.detailLabel}>DURATION</Text>
              <Text style={styles.detailValue}>
                {testDriveDetails.duration}
              </Text>
            </View>

            <View style={styles.bookingDetail}>
              <Text style={styles.detailLabel}>ROUTE</Text>
              <Text style={styles.detailValue}>
                {testDriveDetails.route}
              </Text>
            </View>

            <Pressable
              style={styles.confirmButton}
              onPress={handleConfirmSlot}
            >
              <Text style={styles.confirmButtonText}>
                Confirm Slot
              </Text>
              <Text style={styles.confirmArrow}>→</Text>
            </Pressable>
          </View>

          {/* QUICK REPLIES */}
          <Text style={styles.quickTitle}>QUICK REPLIES</Text>

          <View style={styles.quickReplies}>
            {quickReplies.map((reply) => (
              <Pressable
                key={reply}
                style={styles.quickReply}
                onPress={() => sendMessage(reply)}
              >
                <Text style={styles.quickReplyText}>{reply}</Text>
                <Text style={styles.quickArrow}>→</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.footerNote}>
            Your personal automotive concierge is here to assist.
          </Text>
        </ScrollView>

        {/* MESSAGE INPUT */}
        <View style={styles.inputContainer}>
          <Pressable
            style={styles.attachButton}
            onPress={() => showDemo('Attachments')}
          >
            <Text style={styles.attachText}>＋</Text>
          </Pressable>

          <TextInput
            style={styles.messageInput}
            placeholder="Type a message to Julian..."
            placeholderTextColor={COLORS.gray}
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
          />

          <Pressable
            style={styles.sendButton}
            onPress={() => sendMessage()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 8,
  },
  headerButton: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 34,
  },
  headerAction: {
    color: COLORS.gold,
    fontSize: 17,
  },
  headerAdvisor: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 37,
    height: 37,
    borderRadius: 20,
  },
  headerInfo: {
    marginLeft: 9,
  },
  headerName: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 5,
  },
  onlineText: {
    color: COLORS.green,
    fontSize: 9,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 25,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 27,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },
  profileRole: {
    color: COLORS.gray,
    fontSize: 10,
    marginTop: 4,
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#3A3020',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginTop: 6,
  },
  verifiedText: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: '900',
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  secureIcon: {
    fontSize: 12,
    marginRight: 7,
  },
  secureText: {
    color: COLORS.gray,
    fontSize: 9,
    flex: 1,
  },
  vehicleCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  vehicleImage: {
    width: 115,
    height: 115,
  },
  vehicleInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  vehicleLabel: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  vehicleName: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 7,
  },
  vehicleModel: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 3,
  },
  vehiclePrice: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 7,
  },
  chatDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.gray,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
    gap: 8,
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 27,
    height: 27,
    borderRadius: 15,
  },
  messageContent: {
    maxWidth: '83%',
    alignItems: 'flex-start',
  },
  userMessageContent: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    backgroundColor: COLORS.cardLight,
    padding: 12,
    borderRadius: 14,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: COLORS.gold,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 4,
  },
  messageText: {
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 19,
  },
  userMessageText: {
    color: COLORS.background,
    fontWeight: '600',
  },
  messageTime: {
    color: COLORS.gray,
    fontSize: 8,
    marginTop: 5,
    marginHorizontal: 3,
  },
  userMessageTime: {
    textAlign: 'right',
  },
  bookingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.gold,
    marginTop: 8,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingIconBox: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: COLORS.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bookingIcon: {
    fontSize: 20,
  },
  bookingLabel: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  bookingVehicle: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 5,
  },
  pendingBadge: {
    backgroundColor: '#3A3020',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
  },
  pendingText: {
    color: COLORS.gold,
    fontSize: 7,
    fontWeight: '900',
  },
  bookingDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 13,
  },
  bookingDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  detailLabel: {
    color: COLORS.gray,
    fontSize: 9,
    fontWeight: '700',
  },
  detailValue: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  confirmButton: {
    height: 43,
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    flexDirection: 'row',
  },
  confirmButtonText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '900',
  },
  confirmArrow: {
    position: 'absolute',
    right: 14,
    color: COLORS.background,
    fontSize: 18,
  },
  quickTitle: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 23,
    marginBottom: 11,
  },
  quickReplies: {
    gap: 9,
  },
  quickReply: {
    minHeight: 43,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickReplyText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '600',
  },
  quickArrow: {
    color: COLORS.gold,
    fontSize: 16,
  },
  footerNote: {
    color: COLORS.gray,
    textAlign: 'center',
    fontSize: 9,
    marginTop: 20,
  },
  inputContainer: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 9,
  },
  attachButton: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachText: {
    color: COLORS.gold,
    fontSize: 23,
  },
  messageInput: {
    flex: 1,
    height: 42,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 13,
    color: COLORS.white,
    fontSize: 11,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    color: COLORS.background,
    fontSize: 17,
  },
});
