
// Kort der viser én transport med handlinger
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { GlobalStyle as g } from '../styles/styles';

export default function TransportCard({ t, onDelete, onOpen }){
  return (
    <View style={g.card}>
      {/* Rute og basisinfo */}
      <Text style={g.brandTitle}>{(t.from || t.origin) || '—'} ➜ {(t.to || t.destination) || '—'}</Text>
      <Text style={g.mutedText}>{t.date || t.departure} kl. {t.time || '—'} • {t.horses ?? '—'} heste</Text>
      {(onOpen || onDelete) ? (
        <View style={g.row}>
          {/* Åbn fuldt dokument */}
          {onOpen ? (
            <TouchableOpacity accessibilityRole="button" hitSlop={{ top:8, bottom:8, left:8, right:8 }} onPress={onOpen} style={g.secondaryButton}>
              <Text style={g.secondaryButtonText}>Vis dokument</Text>
            </TouchableOpacity>
          ) : <View />}
          {/* Slet transporten */}
          {onDelete ? (
            <TouchableOpacity accessibilityRole="button" hitSlop={{ top:8, bottom:8, left:8, right:8 }} onPress={onDelete} style={g.dangerButton}>
              <Text style={g.dangerButtonText}>Slet</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
