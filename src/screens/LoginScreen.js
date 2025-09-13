// Simpelt login/opret-konto (mock) gemt lokalt
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { GlobalStyle as g } from '../styles/styles';
import { useAuth } from '../store/AuthContext';

export default function LoginScreen(){
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' eller 'signup'

  // Håndter login
  const onLogin = async () => {
    try {
      setLoading(true);
      await signIn({ email, password });
    } catch (e) {
      Alert.alert('Login fejlede', e.message || 'Prøv igen');
    } finally {
      setLoading(false);
    }
  };

  // Håndter opret konto
  const onSignup = async () => {
    try {
      setLoading(true);
      await signUp({ email, password });
    } catch (e) {
      Alert.alert('Opret bruger fejlede', e.message || 'Prøv igen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[g.screen, g.centered] }>
      <View style={[g.card, g.pv24] }>
        <Text style={g.title}>{mode === 'login' ? 'Log ind' : 'Opret konto'}</Text>
        <Text style={g.subtitle}>Brug en valgfri email og adgangskode</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={g.input}
        />
        <TextInput
          placeholder="Adgangskode"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={g.input}
        />
        {mode === 'login' ? (
          <PrimaryButton title={loading ? 'Logger ind…' : 'Log ind'} onPress={onLogin} />
        ) : (
          <PrimaryButton title={loading ? 'Opretter…' : 'Opret konto'} onPress={onSignup} />
        )}
        <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'signup' : 'login')} accessibilityRole="button">
          <Text style={g.link}>
            {mode === 'login' ? 'Har du ikke en konto? Opret konto' : 'Har du allerede en konto? Log ind'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
