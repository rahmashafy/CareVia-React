import { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import {
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { auth } from '../firebaseAuth';
import { db } from '../firebaseConfig';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');
  const [isLoading, setIsLoading] = useState(false);

  // Registration Function
  const handleRegister = async () => {
    setMessage('');

    // Check empty fields
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setMessage('Please fill in all fields.');
      setMessageType('error');
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    // Phone validation
    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phonePattern = /^(?:0\d{9}|\+94\d{9})$/;

    if (!phonePattern.test(cleanPhone)) {
      setMessage('Please enter a valid Sri Lankan phone number.');
      setMessageType('error');
      return;
    }

    // Password validation
    if (password.length < 8) {
      setMessage('Password must contain at least 8 characters.');
      setMessageType('error');
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    // Firebase Registration
    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      // Save user's name in Firebase Authentication
      await updateProfile(userCredential.user, {
        displayName: fullName.trim(),
      });

      // Save user details in Firestore
      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          userId: userCredential.user.uid,
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: cleanPhone,
          createdAt: serverTimestamp(),
        }
      );

      // Success Message
      setMessage('Account created successfully! Welcome to Carevia.');
      setMessageType('success');

      // Clear form after successful registration
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.error('Firebase Registration Error:', error);

      const firebaseError = error as {
        code?: string;
        message?: string;
      };

      if (firebaseError.code === 'auth/email-already-in-use') {
        setMessage('This email is already registered.');
      } else if (firebaseError.code === 'permission-denied') {
        setMessage('Firestore permission denied. Please check database rules.');
      } else {
        setMessage(
          `Registration failed: ${
            firebaseError.code || firebaseError.message || 'Unknown error'
          }`
        );
      }

      setMessageType('error');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          {/* Heading */}
          <View style={styles.heading}>
            <Text style={styles.title}>Create Your Account</Text>

            <Text style={styles.subtitle}>
              Join Carevia and take the first step towards
              better healthcare.
            </Text>
          </View>

          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#9BAEB0"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#9BAEB0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Phone */}
          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#9BAEB0"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#9BAEB0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#9BAEB0"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {/* Firebase Message */}
          {message ? (
            <Text
              style={
                messageType === 'success'
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {message}
            </Text>
          ) : null}

          {/* Create Account Button */}
          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.disabledButton,
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footerText}>
            Your Health. Our Priority.
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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 35,
  },

  card: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5F0F0',
    shadowColor: '#12343B',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },

  heading: {
    marginBottom: 28,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#12343B',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#718184',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#12343B',
    marginBottom: 8,
  },

  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#FAFDFD',
    borderWidth: 1,
    borderColor: '#DCEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#12343B',
    marginBottom: 20,
  },

  errorMessage: {
    color: '#D93025',
    fontSize: 13,
    marginBottom: 15,
    lineHeight: 20,
  },

  successMessage: {
    color: '#087F8C',
    fontSize: 13,
    marginBottom: 15,
    lineHeight: 20,
  },

  button: {
    backgroundColor: '#087F8C',
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerText: {
    color: '#829597',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 22,
  },

});