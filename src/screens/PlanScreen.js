
// Transportdokument ("Ny tur"): indsamler alle nødvendige felter
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { GlobalStyle as g } from '../styles/styles';
import { useTransport } from '../store/TransportContext';

export default function PlanScreen({ navigation }){
  const { draft, initialDraft, saveDraft, clearDraft, addTransport } = useTransport();
  const [form, setForm] = useState({ ...initialDraft });

  // Hjælp til at opdatere felt i state
  const set = (k,v) => setForm(prev => ({ ...prev, [k]: v }));

  // Gem transporten og gå til Historik
  const onSave = () => {
    if(!form.horses || !form.origin || !form.ownerName || !form.ownerAddress || !form.ownerPhone || !form.from || !form.to) {
      return Alert.alert('Manglende felter', 'Udfyld antal heste, oprindelse, ejer (navn, adresse, telefon), afgangssted og bestemmelsessted');
    }
    const payload = {
      origin: form.origin,
      ownerName: form.ownerName,
      ownerAddress: form.ownerAddress,
      ownerPhone: form.ownerPhone,
      from: form.from,
      to: form.to,
      date: form.departure || '—',
      time: form.time || '—',
      horses: Number(form.horses || 1),
      durationHrs: form.durationHrs || '—',
      durationMin: form.durationMin || '—'
    };
    // Nulstil kladde når der gemmes
    clearDraft();
    setForm({ ...initialDraft });
    addTransport(payload);
    Alert.alert('Gemt','Transport oprettet ✅');
    navigation.navigate('Historik');
  };

  // Når vi forlader siden: nulstil kladden så formularen altid er tom ved næste besøg
  useEffect(() => {
    const unsub = navigation.addListener('blur', () => {
      clearDraft();
      setForm({ ...initialDraft });
    });
    return unsub;
  }, [navigation, clearDraft, initialDraft]);

  return (
    <SafeAreaView style={g.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={g.flex1}>
      <ScrollView contentContainerStyle={[g.screenContent, { paddingBottom: 140 }]} keyboardShouldPersistTaps="handled">
        <View style={g.card}>
        <Text style={g.title}>Transportdokument</Text>
        <Text style={g.subtitle}>Skal udfyldes og medbringes ved hver transport af dyr</Text>

        <TextInput placeholder="Antal heste (fx 2)" keyboardType="numeric" value={String(form.horses ?? '')} onChangeText={v=>set('horses',v)} style={g.input} />
        <Text style={g.help}>Angiv antal heste som heltal</Text>
        <TextInput placeholder="Dyrenes oprindelse (fx stutteri/land)" value={form.origin} onChangeText={v=>set('origin',v)} style={g.input} />
        <Text style={g.help}>Hvor kommer dyrene fra?</Text>
        <Text style={g.label}>Ejer</Text>
        <TextInput placeholder="Navn på ejer" value={form.ownerName} onChangeText={v=>set('ownerName',v)} style={g.input} />
        <TextInput placeholder="Adresse på ejer" value={form.ownerAddress} onChangeText={v=>set('ownerAddress',v)} style={g.input} />
        <TextInput placeholder="Telefon på ejer" keyboardType="phone-pad" value={form.ownerPhone} onChangeText={v=>set('ownerPhone',v)} style={g.input} />
        <TextInput placeholder="Afgangssted (adresse)" value={form.from} onChangeText={v=>set('from',v)} style={g.input} />
        <Text style={g.help}>Adresse hvorfra transporten starter</Text>
        <TextInput placeholder="Bestemmelsessted (adresse)" value={form.to} onChangeText={v=>set('to',v)} style={g.input} />
        <Text style={g.help}>Adresse hvor transporten ender</Text>

        <View style={g.row}>
          <TextInput placeholder="Afgang, dato (fx 23-09-2025)" value={form.departure} onChangeText={v=>set('departure',v)} style={[g.input, g.flex1, g.mr8]} />
          <TextInput placeholder="Tid (fx 07:30)" value={form.time} onChangeText={v=>set('time',v)} style={[g.input, g.flex1, g.ml8]} />
        </View>
        <Text style={g.help}>Dato og tidspunkt for afgang</Text>

        <View style={g.row}>
          <TextInput placeholder="Forventet varighed – Timer" keyboardType="numeric" value={String(form.durationHrs ?? '')} onChangeText={v=>set('durationHrs',v)} style={[g.input, g.flex1, g.mr8]} />
          <TextInput placeholder="Forventet varighed – Min" keyboardType="numeric" value={String(form.durationMin ?? '')} onChangeText={v=>set('durationMin',v)} style={[g.input, g.flex1, g.ml8]} />
        </View>
        <Text style={g.help}>Angiv forventet varighed i timer og minutter</Text>

        <Text style={[g.subtitle, g.mt4]}>Skal på anmodning forevises for kompetent myndighed</Text>
        <PrimaryButton title="Gem" onPress={onSave} />
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
