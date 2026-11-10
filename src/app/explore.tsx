import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HERO SECTION */}
        <View style={styles.hero}>

          <View style={styles.heroContent}>
            <View style={styles.labelBadge}>
              <Text style={styles.label}>ABOUT CAREVIA</Text>
            </View>

            <Text style={styles.title}>
              Caring For You,
              {'\n'}
              <Text style={styles.highlight}>
                Every Step of the Way.
              </Text>
            </Text>

            <Text style={styles.description}>
              We believe everyone deserves simple, accessible
              and reliable healthcare.
            </Text>
          </View>

          {/* Doctor Image */}
          <View style={styles.doctorCard}>
            <View style={styles.imageCircle} />

            <Image
              source={require('@/assets/images/doctor.png')}
              style={styles.doctorImage}
              resizeMode="contain"
            />

            <View style={styles.imageBadge}>
              <Text style={styles.badgeIcon}>🩺</Text>
              <Text style={styles.badgeText}>
                Your Health. Our Priority.
              </Text>
            </View>
          </View>

        </View>

        {/* MISSION & VISION */}
        <View style={styles.purposeSection}>

          <Text style={styles.sectionLabel}>
            OUR PURPOSE
          </Text>

          <Text style={styles.sectionTitle}>
            What Guides Us
          </Text>

          {/* Mission */}
          <View style={styles.infoCard}>

            <View style={styles.iconCircle}>
              <Text style={styles.cardIcon}>🎯</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                Our Mission
              </Text>

              <Text style={styles.cardDescription}>
                Our mission is to make healthcare services easier
                to access through a simple and user-friendly
                digital platform.
              </Text>
            </View>

          </View>

          {/* Vision */}
          <View style={styles.infoCard}>

            <View style={styles.iconCircle}>
              <Text style={styles.cardIcon}>🌟</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                Our Vision
              </Text>

              <Text style={styles.cardDescription}>
                We aim to create a future where everyone can
                connect with healthcare professionals conveniently
                and experience better healthcare access.
              </Text>
            </View>

          </View>

        </View>

        {/* VALUES SECTION */}
        <View style={styles.valuesSection}>

          <Text style={styles.sectionLabel}>
            WHAT MATTERS TO US
          </Text>

          <Text style={styles.sectionTitle}>
            Why Choose Carevia?
          </Text>

          {/* Value 1 */}
          <View style={styles.valueCard}>

            <View style={styles.valueIconBox}>
              <Text style={styles.valueIcon}>❤️</Text>
            </View>

            <View style={styles.valueContent}>
              <Text style={styles.valueTitle}>
                Patient First
              </Text>

              <Text style={styles.valueDescription}>
                Your healthcare needs always matter.
              </Text>
            </View>

          </View>

          {/* Value 2 */}
          <View style={styles.valueCard}>

            <View style={styles.valueIconBox}>
              <Text style={styles.valueIcon}>⚡</Text>
            </View>

            <View style={styles.valueContent}>
              <Text style={styles.valueTitle}>
                Easy Access
              </Text>

              <Text style={styles.valueDescription}>
                Simple and convenient digital experiences.
              </Text>
            </View>

          </View>

          {/* Value 3 */}
          <View style={styles.valueCard}>

            <View style={styles.valueIconBox}>
              <Text style={styles.valueIcon}>🤝</Text>
            </View>

            <View style={styles.valueContent}>
              <Text style={styles.valueTitle}>
                Trust & Care
              </Text>

              <Text style={styles.valueDescription}>
                Building a better healthcare experience.
              </Text>
            </View>

          </View>

        </View>

        {/* CLOSING BANNER */}
        <View style={styles.closingBanner}>

          <View style={styles.closingIcon}>
  <Image
    source={require('@/assets/images/stethoscope.png')}
    style={styles.stethoscopeImage}
    resizeMode="contain"
  />
</View>

          <View style={styles.closingContent}>
            <Text style={styles.closingTitle}>
              Better Care,
              {'\n'}
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
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 20,
  },

  // Hero Section
  hero: {
    backgroundColor: '#DDF4F2',
    borderRadius: 24,
    padding: 22,
    overflow: 'hidden',
  },

  heroContent: {
    zIndex: 2,
  },

  labelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(8,127,140,0.10)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  label: {
    color: '#087F8C',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.4,
  },

  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#12343B',
    lineHeight: 39,
    marginTop: 18,
  },

  highlight: {
    color: '#087F8C',
  },

  description: {
    color: '#557276',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 15,
  },

  // Doctor Image Card
  doctorCard: {
    height: 225,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 20,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  imageCircle: {
    position: 'absolute',
    width: 185,
    height: 185,
    borderRadius: 100,
    backgroundColor: '#C4EAE6',
  },

  doctorImage: {
    width: 205,
    height: 185,
    zIndex: 2,
  },

  imageBadge: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 25,
  },

  badgeIcon: {
    fontSize: 16,
    marginRight: 7,
  },

  badgeText: {
    color: '#087F8C',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Mission & Vision
  purposeSection: {
    marginTop: 32,
  },

  sectionLabel: {
    color: '#087F8C',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  sectionTitle: {
    color: '#12343B',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 9,
    marginBottom: 18,
  },

  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 18,
    padding: 19,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E1F0EE',
    flexDirection: 'row',
    alignItems: 'flex-start',

    shadowColor: '#12343B',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#DDF4F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  cardIcon: {
    fontSize: 25,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: '#12343B',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cardDescription: {
    color: '#718184',
    fontSize: 13,
    lineHeight: 21,
  },

  // Values Section
  valuesSection: {
    marginTop: 24,
  },

  valueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8F1F0',
  },

  valueIconBox: {
    width: 48,
    height: 48,
    backgroundColor: '#DDF4F2',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  valueIcon: {
    fontSize: 24,
  },

  valueContent: {
    flex: 1,
  },

  valueTitle: {
    color: '#12343B',
    fontSize: 15,
    fontWeight: 'bold',
  },

  valueDescription: {
    color: '#718184',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },

  // Closing Banner
  closingBanner: {
    backgroundColor: '#DDF4F2',
    padding: 20,
    borderRadius: 20,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },

  closingIcon: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  closingHeart: {
    fontSize: 32,
  },

  stethoscopeImage: {
  width: 55,
  height: 55,
},

  closingContent: {
    flex: 1,
  },

  closingTitle: {
    color: '#12343B',
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 26,
  },

  closingDescription: {
    color: '#557276',
    fontSize: 12,
    marginTop: 7,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  footerLogo: {
    color: '#087F8C',
    fontSize: 26,
    fontWeight: 'bold',
  },

  footerText: {
    color: '#607D80',
    fontSize: 12,
    marginTop: 6,
  },

  copyright: {
    color: '#829597',
    fontSize: 10,
    marginTop: 15,
  },

});