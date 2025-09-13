
// Appens data-store: kladde og historik for transporter
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransportContext = createContext();

// Start-værdier til en tom formular
const initialDraft = {
  horses: '',
  origin: '',
  ownerName: '',
  ownerAddress: '',
  ownerPhone: '',
  from: '',
  to: '',
  departure: '',
  time: '',
  durationHrs: '',
  durationMin: ''
};

export const TransportProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  // Kladde til formularen (Ny tur)
  const [draft, setDraft] = useState({ ...initialDraft });
  // Liste over oprettede transporter
  const [transports, setTransports] = useState([]);

  // Indlæs gemte transporter én gang
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('ht_transports');
        if (raw) setTransports(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  // Gem transporter når de ændres
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('ht_transports', JSON.stringify(transports));
      } catch {}
    })();
  }, [transports]);

  const addVehicle = (v) => setVehicles(prev => [...prev, v]);            // (evt. fremtid)
  const saveDraft = (d) => setDraft(prev => ({ ...prev, ...d }));         // opdater kladde
  const clearDraft = () => setDraft({ ...initialDraft });                 // nulstil kladde
  const addTransport = (t) => setTransports(prev => [ { id: Date.now().toString(), ...t }, ...prev ]); // tilføj tur
  const removeTransport = (id) => setTransports(prev => prev.filter(t => t.id !== id));               // slet tur

  return (
    <TransportContext.Provider value={{ vehicles, addVehicle, draft, saveDraft, clearDraft, initialDraft, transports, addTransport, removeTransport }}>
      {children}
    </TransportContext.Provider>
  );
};

export const useTransport = () => useContext(TransportContext);
