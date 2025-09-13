
// Genanvendelig primær-knap med ens udtryk
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GlobalStyle as g } from '../styles/styles';

export default function PrimaryButton({ title, onPress }){
  return (
    <TouchableOpacity accessibilityRole="button" style={g.button} onPress={onPress}>
      <Text style={g.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
