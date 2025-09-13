// Liste over oprettede formularer (hurtig visning)
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle as g } from '../styles/styles';
import TransportCard from '../components/TransportCard';
import { useTransport } from '../store/TransportContext';

export default function FormsScreen({ navigation }){
  const { transports, removeTransport } = useTransport();
  const hasItems = transports && transports.length > 0;

  return (
    <SafeAreaView style={g.screen}>
      {!hasItems ? (
        <View style={g.card}>
          <Text style={g.title}>Ingen formularer endnu</Text>
          <Text style={g.subtitle}>Opret en tur under "Ny tur" for at se dokumenter her.</Text>
        </View>
      ) : null}

      <FlatList
        data={transports}
        keyExtractor={(item, idx) => item.id?.toString() || String(idx)}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TransportCard
            t={item}
            onOpen={() => navigation.navigate('TransportDetail', { item })}
            onDelete={() => removeTransport(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}
