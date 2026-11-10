
import { Link, Slot, usePathname } from 'expo-router';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

type RoutePath = '/' | '/explore' | '/register' | '/admin-login';

export default function AppTabs() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  const isMobile = width <= 600;

  return (
    <View style={styles.page}>

      {/* Header */}
      <View style={styles.navbar}>
        <View>
          <Text style={styles.logo}>Carevia</Text>
          <Text style={styles.tagline}>
            Your Health, Our Priority
          </Text>
        </View>

        {/* Desktop Navigation */}
        {!isMobile && (
          <View style={styles.navLinks}>
            <NavItem href="/" label="Home" active={pathname === '/'} />

            <NavItem
              href="/explore"
              label="About"
              active={pathname === '/explore'}
            />

            <NavItem
              href="/register"
              label="Register"
              active={pathname === '/register'}
            />

            <NavItem
              href="/admin-login"
              label="Login"
              active={pathname === '/admin-login'}
            />
          </View>
        )}
      </View>

      {/* Page Content */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <View style={styles.bottomNav}>

          <NavItem
            href="/"
            label="Home"
            icon="⌂"
            active={pathname === '/'}
          />

          <NavItem
            href="/explore"
            label="About"
            icon="ⓘ"
            active={pathname === '/explore'}
          />

          <NavItem
            href="/register"
            label="Register"
            icon="＋"
            active={pathname === '/register'}
          />

          <NavItem
            href="/admin-login"
            label="Login"
            icon="↪"
            active={pathname === '/admin-login'}
          />

        </View>
      )}

    </View>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: RoutePath;
  label: string;
  icon?: string;
  active: boolean;
}) {
  return (
    <Link href={href} asChild>
      <Pressable
        style={
          icon
            ? styles.mobileNavItem
            : StyleSheet.flatten([
                styles.navButton,
                active ? styles.activeButton : undefined,
              ])
        }
      >

        {/* Icon with Glass Effect */}
        {icon && (
          <View
            style={StyleSheet.flatten([
              styles.iconCircle,
              active ? styles.activeIconCircle : undefined,
            ])}
          >
            <Text
              style={StyleSheet.flatten([
                styles.navIcon,
                active ? styles.activeNavIcon : undefined,
              ])}
            >
              {icon}
            </Text>
          </View>
        )}

        {/* Navigation Label */}
        <Text
          style={
            icon
              ? styles.mobileNavText
              : StyleSheet.flatten([
                  styles.navText,
                  active ? styles.activeText : undefined,
                ])
          }
        >
          {label}
        </Text>

      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({

  page: {
    flex: 1,
    backgroundColor: '#F2FAFA',
  },

  navbar: {
    minHeight: 75,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E3EEEE',
  },

  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#087F8C',
  },

  tagline: {
    fontSize: 10,
    color: '#607D80',
    marginTop: 3,
  },

  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },

  activeButton: {
    backgroundColor: '#087F8C',
  },

  navText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#12343B',
  },

  activeText: {
    color: '#FFFFFF',
  },

  content: {
    flex: 1,
  },

  // Bottom Navigation
  bottomNav: {
    height: 78,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderTopColor: '#E3EEEE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 5,
  },

  mobileNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  // Normal Icon
  iconCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  // Active Glass Circle
  activeIconCircle: {
    backgroundColor: 'rgba(8,127,140,0.10)',
    borderColor: 'rgba(8,127,140,0.20)',

    shadowColor: '#087F8C',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 9,

    elevation: 3,
  },

  navIcon: {
    fontSize: 23,
    color: '#91A5A7',
  },

  // Active Icon
  activeNavIcon: {
    color: '#087F8C',
    fontWeight: 'bold',
    textShadowColor: 'rgba(8,127,140,0.20)',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 7,
  },

  // Labels
  mobileNavText: {
    fontSize: 11,
    marginTop: 3,
    color: '#829597',
    fontWeight: '500',
  },

});
