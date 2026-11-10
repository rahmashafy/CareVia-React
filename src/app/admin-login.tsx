import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth } from '../firebaseAuth';

const ADMIN_UID = 'lz68LUbgHmT5P0dEbPs1DTuuZB32';

export default function AdminLoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Required', 'Please enter email and password.');
      return;
    }

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      if (result.user.uid !== ADMIN_UID) {
        await signOut(auth);
        Alert.alert('Access Denied', 'Only administrators can access this page.');
        return;
      }

      router.replace('/admin-dashboard');
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        'Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>Carevia</Text>

        <Text style={styles.title}>Admin Login</Text>

        <Text style={styles.subtitle}>
          Sign in to manage registered users.
        </Text>

        <Text style={styles.label}>Email Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter admin email"
          placeholderTextColor="#9BAEB0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#9BAEB0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing In...' : 'Login as Admin'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Secure Carevia Administration
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FAFA',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    padding: 28,
    borderRadius: 20,
    elevation: 4,
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#087F8C',
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#12343B',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#718184',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#12343B',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DCEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#12343B',
    backgroundColor: '#FAFDFD',
  },
  button: {
    height: 52,
    backgroundColor: '#087F8C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#829597',
    fontSize: 12,
    marginTop: 22,
  },
});