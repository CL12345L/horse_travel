// Fuld, skrivebeskyttet dokument-visning klar til myndigheder
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle as g } from '../styles/styles';

export default function TransportDetailScreen({ route }){
  const { item } = route.params || {};
  const from = item?.from || item?.origin || '—';
  const to = item?.to || item?.destination || '—';
  const date = item?.date || item?.departure || '—';
  const time = item?.time || '—';
  const horses = item?.horses ?? '—';
  const ownerName = item?.ownerName || '—';
  const ownerAddress = item?.ownerAddress || '—';
  const ownerPhone = item?.ownerPhone || '—';

  return (
    <SafeAreaView style={g.screen}>
      <ScrollView contentContainerStyle={[g.screenContent, { paddingBottom: 80 }]}>
      <View style={g.card}>
        <Text style={g.title}>Transportdokument</Text>
        <Text style={g.subtitle}>Skal udfyldes og medbringes ved hver transport af dyr</Text>

        <Text style={g.label}>Antal</Text>
        <Text style={g.value}>{horses} heste</Text>

        <Text style={g.label}>Dyrenes oprindelse</Text>
        <Text style={g.value}>{item?.origin || '—'}</Text>

        <Text style={g.label}>Ejer</Text>
        <Text style={g.value}>Navn: {ownerName}</Text>
        <Text style={g.value}>Adresse: {ownerAddress}</Text>
        <Text style={g.value}>Telefon: {ownerPhone}</Text>

        <Text style={g.label}>Afgangssted</Text>
        <Text style={g.value}>{from}</Text>

        <Text style={g.label}>Bestemmelsessted</Text>
        <Text style={g.value}>{to}</Text>

        <Text style={g.label}>Afgang</Text>
        <Text style={g.value}>Dato: {date} og tid: {time}</Text>

        <Text style={g.label}>Forventet varighed</Text>
        <Text style={g.value}>Timer: {item?.durationHrs || '—'}  Min: {item?.durationMin || '—'}</Text>

        <Text style={[g.value, g.mt8]}>Skal på anmodning forevises for kompetent myndighed</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
