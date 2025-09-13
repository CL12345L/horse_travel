// Login-tilstand (mock) med AsyncStorage-lagring
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email }
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('currentUser');
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setReady(true);
      }
    })();
  }, []);

  // Log ind (tjekker mod lokal brugerliste)
  const signIn = async ({ email, password }) => {
    if (!email || !password) throw new Error('Angiv email og adgangskode');
    const usersRaw = (await AsyncStorage.getItem('users')) || '[]';
    const users = JSON.parse(usersRaw);
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) throw new Error('Bruger findes ikke eller adgangskode er forkert');
    await AsyncStorage.setItem('currentUser', JSON.stringify({ email: found.email }));
    setUser({ email: found.email });
  };

  // Opret ny bruger
  const signUp = async ({ email, password }) => {
    if (!email || !password) throw new Error('Udfyld email og adgangskode');
    const usersRaw = (await AsyncStorage.getItem('users')) || '[]';
    const users = JSON.parse(usersRaw);
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('Bruger findes allerede');
    const next = [...users, { email, password }];
    await AsyncStorage.setItem('users', JSON.stringify(next));
    await AsyncStorage.setItem('currentUser', JSON.stringify({ email }));
    setUser({ email });
  };

  // Log ud
  const signOut = async () => {
    await AsyncStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
