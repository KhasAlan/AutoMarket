import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppTheme } from '@/context/theme-context';

type ProfileColors = ReturnType<typeof useAppTheme>['colors'];

const profileCar = {
  brand: 'Porsche',
  model: '911 Carrera S',
  year: '2022',
  mileage: '18,450 mi',
  color: 'Agate Grey',
  price: '$91,250',
  image:
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
};

const menuItems = [
  {
    icon: '▤',
    title: 'Financing & Pre-Approvals',
    subtitle: 'Tier 1 Approved • $150,000 Credit Line',
    route: '/financial-dashboard' as const,
  },
  {
    icon: '▣',
    title: 'Scheduled Test Drives & Showroom',
    subtitle: '1 Upcoming • Wed Oct 16, 2:30 PM',
    route: '/book-test-drive' as const,
  },
  {
    icon: '♡',
    title: 'Saved Vehicles & Search Alerts',
    subtitle: '4 Cars Tracked • Daily Market Digest',
    route: '/(tabs)/favorites' as const,
  },
  {
    icon: '▧',
    title: 'Documents & Contracts Vault',
    subtitle: 'Title • Lease Agreement • ID Verified',
    route: null,
  },
  {
    icon: '♧',
    title: 'Concierge Support & Dealership',
    subtitle: 'Dedicated Beverly Hills Private Client Liaison',
    route: '/dealership' as const,
  },
];

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  const openDocuments = () => {
    Alert.alert(
      'Documents & Contracts',
      'Your documents and contracts will be available here.'
    );
  };

  const signOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => router.replace('/(auth)/welcome'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>AutoMarket</Text>
            <Text style={styles.headerSubtitle}>
              BEVERLY HILLS, CA
            </Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              style={styles.headerIcon}
              onPress={() => router.push('/settings')}
            >
              <Text style={styles.headerIconText}>⚙</Text>
            </Pressable>

            <Pressable
              style={styles.avatar}
              onPress={() => router.push('/settings')}
            >
              <Text style={styles.avatarText}>AV</Text>
            </Pressable>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
              }}
              style={styles.profileImage}
            />

            <View style={styles.profileInfo}>
              <View style={styles.vipBadge}>
                <Text style={styles.vipBadgeText}>
                  ★ VIP SOVEREIGN MEMBER
                </Text>
              </View>

              <Text style={styles.name}>Alex Vance</Text>
              <Text style={styles.email}>alex.vance@automarket.com</Text>
              <Text style={styles.location}>⌖ Beverly Hills, CA</Text>
            </View>
          </View>

          <Pressable
            style={styles.conciergeButton}
            onPress={() => router.push('/live-dealer-chat')}
          >
            <View style={styles.onlineDot} />
            <Text style={styles.conciergeText}>
              DEDICATED PRIVATE BANKER ACTIVE
            </Text>
            <Text style={styles.inquireText}>Inquire ›</Text>
          </Pressable>
        </View>

        {/* Statistics */}
        <View style={styles.statsGrid}>
          <Pressable
            style={styles.statCard}
            onPress={() => router.push('/filters')}
          >
            <Text style={styles.statLabel}>SEARCHES</Text>
            <Text style={styles.statValue}>3 Active</Text>
            <Text style={styles.statSubtitle}>Saved Filters</Text>
          </Pressable>

          <Pressable
            style={styles.statCard}
            onPress={() => router.push('/(tabs)/favorites')}
          >
            <Text style={styles.statLabel}>WATCHLIST</Text>
            <Text style={styles.statValue}>4 Cars</Text>
            <Text style={styles.statSubtitle}>2 Price Drops</Text>
          </Pressable>

          <Pressable
            style={styles.statCard}
            onPress={() => router.push('/book-test-drive')}
          >
            <Text style={styles.statLabel}>TEST DRIVE</Text>
            <Text style={styles.statValueGreen}>1 Confirmed</Text>
            <Text style={styles.statSubtitle}>Wed, Oct 16</Text>
          </Pressable>

          <Pressable
            style={styles.statCard}
            onPress={() => router.push('/trade-in')}
          >
            <Text style={styles.statLabel}>TRADE IN EQUITY</Text>
            <Text style={styles.statValueGold}>$91.2k</Text>
            <Text style={styles.statSubtitleGreen}>
              +4.2% / mo
            </Text>
          </Pressable>
        </View>

        {/* Virtual Garage */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>MY VIRTUAL GARAGE</Text>
            <Text style={styles.sectionSubtitle}>1 Vehicle Owned</Text>
          </View>

          <Pressable
            style={styles.addVehicleButton}
            onPress={() =>
              Alert.alert(
                'Add Vehicle',
                'Vehicle registration will be available here.'
              )
            }
          >
            <Text style={styles.addVehicleText}>+ Add Vehicle</Text>
          </Pressable>
        </View>

        <View style={styles.garageCard}>
          <View style={styles.primaryBadge}>
            <Text style={styles.primaryBadgeText}>
              ★ PRIMARY GARAGE CAR
            </Text>
          </View>

          <Image
            source={{ uri: profileCar.image }}
            style={styles.carImage}
            resizeMode="cover"
          />

          <View style={styles.carEquityRow}>
            <View>
              <Text style={styles.smallLabel}>REAL-TIME EQUITY</Text>
              <Text style={styles.equityValue}>
                $91,250 <Text style={styles.positive}>+4.2%</Text>
              </Text>
            </View>

            <View style={styles.nextService}>
              <Text style={styles.smallLabel}>NEXT SERVICE</Text>
              <Text style={styles.nextServiceValue}>In 1,550 mi</Text>
            </View>
          </View>

          <View style={styles.carInfo}>
            <Text style={styles.carName}>
              {profileCar.year} {profileCar.brand} {profileCar.model}
            </Text>

            <Text style={styles.carDetails}>
              {profileCar.mileage} • {profileCar.color}
            </Text>

            <Text style={styles.vin}>
              VIN: WP0AB2A9... 
            </Text>
          </View>

          <View style={styles.marketValue}>
            <View>
              <Text style={styles.smallLabel}>
                MARKET VALUATION TREND (6-mo)
              </Text>
              <Text style={styles.positive}>
                Peak Market Liquidity
              </Text>
            </View>
            <Text style={styles.chartLine}>⌁⌁⌁⌁⌁</Text>
          </View>

          <Pressable
            style={styles.buyoutButton}
            onPress={() => router.push('/trade-in')}
          >
            <Text style={styles.buyoutText}>
              ▣ Request Instant Buyout ({profileCar.price})
            </Text>
          </Pressable>

          <View style={styles.garageActions}>
            <Pressable
              style={styles.garageAction}
              onPress={() => openDocuments()}
            >
              <Text style={styles.garageActionText}>
                ▤ Service Records (4)
              </Text>
            </Pressable>

            <Pressable
              style={styles.garageAction}
              onPress={() => router.push('/financial-dashboard')}
            >
              <Text style={styles.garageActionText}>
                ▣ Telemetry Hub
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Account & Portfolio */}
        <Text style={styles.sectionTitle}>
          ACCOUNT & PORTFOLIO
        </Text>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable
              key={item.title}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 &&
                  styles.lastMenuItem,
              ]}
              onPress={() => {
                if (item.route) {
                  router.push(item.route);
                } else {
                  openDocuments();
                }
              }}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>{item.icon}</Text>
              </View>

              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>
                  {item.subtitle}
                </Text>
              </View>

              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.footerSettings}>
              ⚙ App Preferences
            </Text>
          </Pressable>

          <Pressable onPress={signOut}>
            <Text style={styles.signOut}>⇥ Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStyles(colors: ProfileColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: 18,
      paddingTop: 10,
      paddingBottom: 35,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 18,
    },
    logo: {
      color: colors.text,
      fontSize: 19,
      fontWeight: '900',
      letterSpacing: 1,
    },
    headerSubtitle: {
      color: colors.muted,
      fontSize: 9,
      letterSpacing: 1.5,
      marginTop: 3,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    headerIcon: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIconText: {
      color: colors.gold,
      fontSize: 19,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.cardLight,
      borderWidth: 1,
      borderColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: '800',
    },
    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 13,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 13,
    },
    profileTop: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImage: {
      width: 68,
      height: 68,
      borderRadius: 14,
      marginRight: 13,
    },
    profileInfo: {
      flex: 1,
    },
    vipBadge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.gold,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginBottom: 5,
    },
    vipBadgeText: {
      color: colors.background,
      fontSize: 8,
      fontWeight: '900',
    },
    name: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '800',
    },
    email: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 3,
    },
    location: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 4,
    },
    conciergeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardLight,
      padding: 10,
      borderRadius: 10,
      marginTop: 13,
    },
    onlineDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.green,
      marginRight: 7,
    },
    conciergeText: {
      color: colors.text,
      fontSize: 8,
      fontWeight: '700',
      flex: 1,
    },
    inquireText: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '700',
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 9,
      marginBottom: 20,
    },
    statCard: {
      width: '48%',
      flexGrow: 1,
      backgroundColor: colors.card,
      borderRadius: 13,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      minHeight: 88,
    },
    statLabel: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 0.7,
      marginBottom: 7,
    },
    statValue: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
    },
    statValueGreen: {
      color: colors.green,
      fontSize: 14,
      fontWeight: '800',
    },
    statValueGold: {
      color: colors.gold,
      fontSize: 17,
      fontWeight: '900',
    },
    statSubtitle: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 4,
    },
    statSubtitleGreen: {
      color: colors.green,
      fontSize: 9,
      marginTop: 4,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 11,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 0.7,
      marginBottom: 9,
    },
    sectionSubtitle: {
      color: colors.muted,
      fontSize: 10,
      marginTop: -5,
    },
    addVehicleButton: {
      backgroundColor: colors.cardLight,
      paddingHorizontal: 11,
      paddingVertical: 8,
      borderRadius: 9,
      borderWidth: 1,
      borderColor: colors.border,
    },
    addVehicleText: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: '700',
    },
    garageCard: {
      backgroundColor: colors.card,
      borderRadius: 17,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 20,
    },
    primaryBadge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.cardLight,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 7,
      marginBottom: 9,
    },
    primaryBadgeText: {
      color: colors.gold,
      fontSize: 8,
      fontWeight: '900',
    },
    carImage: {
      width: '100%',
      height: 155,
      borderRadius: 11,
    },
    carEquityRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    smallLabel: {
      color: colors.muted,
      fontSize: 8,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    equityValue: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
      marginTop: 4,
    },
    positive: {
      color: colors.green,
      fontSize: 10,
      fontWeight: '800',
    },
    nextService: {
      alignItems: 'flex-end',
    },
    nextServiceValue: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '700',
      marginTop: 5,
    },
    carInfo: {
      paddingTop: 11,
    },
    carName: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
    },
    carDetails: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 5,
    },
    vin: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 5,
    },
    marketValue: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.cardLight,
      borderRadius: 9,
      padding: 10,
      marginTop: 11,
    },
    chartLine: {
      color: colors.green,
      fontSize: 24,
      fontWeight: '900',
    },
    buyoutButton: {
      backgroundColor: colors.gold,
      borderRadius: 10,
      paddingVertical: 13,
      alignItems: 'center',
      marginTop: 12,
    },
    buyoutText: {
      color: colors.background,
      fontSize: 11,
      fontWeight: '900',
    },
    garageActions: {
      flexDirection: 'row',
      gap: 9,
      marginTop: 10,
    },
    garageAction: {
      flex: 1,
      backgroundColor: colors.cardLight,
      borderRadius: 9,
      paddingVertical: 11,
      alignItems: 'center',
    },
    garageActionText: {
      color: colors.text,
      fontSize: 9,
      fontWeight: '700',
    },
    menuContainer: {
      backgroundColor: colors.card,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 11,
      marginTop: 3,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 13,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastMenuItem: {
      borderBottomWidth: 0,
    },
    menuIcon: {
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: colors.cardLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    menuIconText: {
      color: colors.gold,
      fontSize: 17,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '800',
    },
    menuSubtitle: {
      color: colors.muted,
      fontSize: 9,
      marginTop: 4,
    },
    menuArrow: {
      color: colors.gold,
      fontSize: 22,
      marginLeft: 5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 19,
      marginBottom: 10,
    },
    footerSettings: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: '700',
    },
    signOut: {
      color: '#F15B68',
      fontSize: 11,
      fontWeight: '800',
    },
  });
}