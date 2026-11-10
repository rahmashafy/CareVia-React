import { useRouter } from 'expo-router';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HERO SECTION */}
        <View style={styles.hero}>

          {/* Medical Decoration */}
<View style={styles.medicalDecoration}>
  <Text style={styles.medicalIcon}>🩺</Text>
</View>

<View style={styles.ecgDecoration}>
  <Text style={styles.ecgText}>♡  HEALTH CARE</Text>
</View>

          <View style={styles.heroContent}>

            <Text style={styles.heroLabel}>
              YOUR HEALTH, OUR PRIORITY
            </Text>

            <Text style={styles.heroTitle}>
              Care That{'\n'}
              Comes First.
            </Text>

            <Text style={styles.heroDescription}>
              Your journey to better healthcare starts here.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.buttonText}>
                Get Started →
              </Text>
            </TouchableOpacity>

          </View>

          <Image
            source={require('@/assets/images/doctor.png')}
            style={styles.doctorImage}
            resizeMode="contain"
          />

        </View>

        {/* QUICK ACTION CARDS */}
        <View style={styles.quickCards}>

          <View style={styles.quickCard}>
            <View style={styles.quickIcon}>
              <Text style={styles.iconText}>📅</Text>
            </View>

            <Text style={styles.quickTitle}>
              Easy
            </Text>

            <Text style={styles.quickDescription}>
              Appointment Requests
            </Text>
          </View>

          <View style={styles.quickCard}>
            <View style={styles.quickIcon}>
              <Text style={styles.iconText}>📋</Text>
            </View>

            <Text style={styles.quickTitle}>
              Simple
            </Text>

            <Text style={styles.quickDescription}>
              Booking Experience
            </Text>
          </View>

        </View>

        {/* SERVICES SECTION */}
        <View style={styles.servicesSection}>

          <Text style={styles.sectionLabel}>
            OUR SERVICES
          </Text>

          <Text style={styles.sectionTitle}>
            Healthcare Made Simple
          </Text>

          <View style={styles.serviceCards}>

            <View style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>👨‍⚕️</Text>

              <Text style={styles.serviceTitle}>
                Find Doctors
              </Text>

              <Text style={styles.serviceDescription}>
                Connect with trusted doctors
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>📅</Text>

              <Text style={styles.serviceTitle}>
                Appointment
              </Text>

              <Text style={styles.serviceDescription}>
                Request with ease
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>🛡️</Text>

              <Text style={styles.serviceTitle}>
                Safe & Secure
              </Text>

              <Text style={styles.serviceDescription}>
                Your data is protected
              </Text>
            </View>

          </View>
        </View>

        {/* CLOSING BANNER */}
        <View style={styles.closingBanner}>

          <View style={styles.medicalVisual}>
  <Text style={styles.stethoscope}>🩺</Text>
  

  <View style={styles.heartbeat}>
    <View style={styles.pulseLine} />
    <View style={styles.pulseUp} />
    <View style={styles.pulseDown} />
    <View style={styles.pulseLine} />
  </View>
</View>

          <View style={styles.closingContent}>
            <Text style={styles.closingTitle}>
              Better Care,{'\n'}
              Brighter Tomorrow.
            </Text>

            <Text style={styles.closingDescription}>
              Your health matters to us.
            </Text>
          </View>

        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>
            Carevia
          </Text>

          <Text style={styles.footerText}>
            Care That Comes First
          </Text>

          <Text style={styles.copyright}>
            © 2026 Carevia. All Rights Reserved.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F2FAFA',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 25,
  },

  // Hero Section
  hero: {
    backgroundColor: '#DDF4F2',
    borderRadius: 24,
    minHeight: 390,
    padding: 22,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },

  heroContent: {
    width: '70%',
    zIndex: 2,
  },

  heroLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#087F8C',
    marginBottom: 17,
  },

  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#12343B',
    lineHeight: 40,
  },

  heroDescription: {
    fontSize: 14,
    color: '#42666A',
    lineHeight: 22,
    marginTop: 18,
  },

  primaryButton: {
    backgroundColor: '#087F8C',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 22,
    alignSelf: 'flex-start',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  doctorImage: {
    position: 'absolute',
    width: 155,
    height: 235,
    right: -5,
    bottom: 0,
  },

  // Quick Cards
  quickCards: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },

  quickCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 17,
    minHeight: 175,
    justifyContent: 'center',
    elevation: 2,
  },

  quickIcon: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: '#DDF4F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  iconText: {
    fontSize: 29,
  },

  quickTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#12343B',
  },

  quickDescription: {
    fontSize: 13,
    color: '#557276',
    lineHeight: 20,
    marginTop: 5,
  },

  // Services
  servicesSection: {
    marginTop: 32,
  },

  sectionLabel: {
    color: '#087F8C',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#12343B',
    marginTop: 8,
    marginBottom: 18,
  },

  serviceCards: {
    flexDirection: 'row',
    gap: 9,
  },

  serviceCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 10,
    minHeight: 165,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  serviceIcon: {
    fontSize: 29,
    marginBottom: 12,
  },

  serviceTitle: {
    color: '#12343B',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  serviceDescription: {
    color: '#718184',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 6,
  },

  // Closing Banner
  closingBanner: {
    backgroundColor: '#DDF4F2',
    borderRadius: 20,
    padding: 18,
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },

  medicalVisual: {
  width: 85,
  height: 85,
  backgroundColor: '#C8EEEA',
  borderRadius: 45,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15,
},

stethoscope: {
  fontSize: 38,
},

heartbeat: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 3,
},

pulseLine: {
  width: 10,
  height: 2,
  backgroundColor: '#087F8C',
},

pulseUp: {
  width: 8,
  height: 2,
  backgroundColor: '#087F8C',
  transform: [{ rotate: '-45deg' }],
},

pulseDown: {
  width: 8,
  height: 2,
  backgroundColor: '#087F8C',
  transform: [{ rotate: '45deg' }],
},

  closingContent: {
    flex: 1,
  },

  closingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#12343B',
    lineHeight: 27,
  },

  closingDescription: {
    fontSize: 12,
    color: '#557276',
    marginTop: 8,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  footerLogo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#087F8C',
  },

  footerText: {
    fontSize: 12,
    color: '#607D80',
    marginTop: 5,
  },

  copyright: {
    color: '#829597',
    fontSize: 10,
    marginTop: 15,
  },

  medicalDecoration: {
  position: 'absolute',
  top: 20,
  right: 20,
  width: 65,
  height: 65,
  borderRadius: 35,
  backgroundColor: '#BFE9E6',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 3,
},

medicalIcon: {
  fontSize: 35,
},

ecgDecoration: {
  position: 'absolute',
  top: 105,
  right: 18,
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 20,
  zIndex: 3,
},

ecgText: {
  color: '#087F8C',
  fontSize: 10,
  fontWeight: 'bold',
  letterSpacing: 1,
},

});