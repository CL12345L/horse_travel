
// Historik over transporter med knapper (se/slet)
import React from 'react';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';
import { GlobalStyle as g } from '../styles/styles';
import TransportCard from '../components/TransportCard';
import { useTransport } from '../store/TransportContext';

export default function TransportsScreen({ navigation }){
  const { transports, removeTransport } = useTransport();

  const handleDelete = (item) => {
    Alert.alert('Slet transport', 'Er du sikker på at du vil slette denne transport?', [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Slet', style: 'destructive', onPress: () => { if (item.id) removeTransport(item.id); } }
    ]);
  };

  return (
    <SafeAreaView style={g.screen}>
      {(!transports || transports.length === 0) ? (
        <View style={g.card}>
          <Text style={g.title}>Ingen transporter endnu</Text>
          <Text style={g.subtitle}>Opret en tur under "Ny tur".</Text>
        </View>
      ) : null}
      <FlatList
        data={transports}
        keyExtractor={(item, idx) => item.id?.toString() || String(idx)}
        renderItem={({ item }) => (
          <TransportCard t={item} onOpen={() => navigation.navigate('TransportDetail', { item })} onDelete={() => handleDelete(item)} />
        )}
      />
    </SafeAreaView>
  );
}
