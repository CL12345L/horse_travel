// Overblik (forside efter login): næste tur og hurtige handlinger
import React, { useMemo } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import PrimaryButton from '../components/PrimaryButton';
import TransportCard from '../components/TransportCard';
import { GlobalStyle as g } from '../styles/styles';
import { useTransport } from '../store/TransportContext';
import { useAuth } from '../store/AuthContext';

export default function OverviewScreen({ navigation }){
  const { transports } = useTransport();
  const { signOut, user } = useAuth();
  const next = useMemo(() => (transports && transports.length > 0 ? transports[0] : null), [transports]);

  return (
    <SafeAreaView style={g.screen}>
      <ScrollView contentContainerStyle={[g.screenContent, { paddingBottom: 100 }] }>
      <View style={g.brandHero}>
        <Image source={require('../../assets/logo.png')} style={g.logoXL} />
        <Text style={g.brandTitleLight}>Horse Travel</Text>
        <Text style={g.brandSubtitleLight}>Planlæg & dokumentér hestetransport</Text>
        <View style={g.statsRow}>
          <View style={g.statPill}><Text style={g.statText}>Ture: {(transports || []).length}</Text></View>
          <View style={g.statPill}><Text style={g.statText}>{next ? 'Næste: ' + (next.date || next.departure) : 'Ingen planlagt'}</Text></View>
        </View>
      </View>

      <View style={g.hero}>
        <Text style={g.title}>Overblik</Text>
        {next ? (
          <View>
            <Text style={g.brandTitle}>{(next.from || next.origin) || '—'} ➜ {(next.to || next.destination) || '—'}</Text>
            <Text style={g.mutedText}>{next.date || next.departure} kl. {next.time || '—'} • {next.horses} heste</Text>
          </View>
        ) : (
          <Text style={g.subtitle}>Ingen planlagte ture endnu</Text>
        )}
        <View style={g.spacer16} />
        <PrimaryButton title="Planlæg ny tur" onPress={() => navigation.navigate('Ny tur')} />
        <PrimaryButton title="Se historik" onPress={() => navigation.navigate('Historik')} />
        <PrimaryButton title="Formularer" onPress={() => navigation.navigate('Formularer')} />
        <PrimaryButton title="Log ud" onPress={signOut} />
      </View>

      <View style={g.section}>
        <Text style={g.sectionTitle}>Seneste</Text>
        { (transports || []).slice(0,3).map((item, idx) => (
          <TransportCard key={item.id?.toString() || String(idx)} t={item} />
        )) }
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
