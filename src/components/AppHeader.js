
// App-header med logo, titel og undertitel
import React from 'react';
import { Image, Text, View } from 'react-native';
import { GlobalStyle as g } from '../styles/styles';

export default function AppHeader({ title='Horse Travel', subtitle='Planlæg & dokumentér hestetransport', isLarge=false }){
  return (
    <View style={[g.card, g.headerRow]}>
      <Image source={require('../../assets/logo.png')} style={isLarge ? g.logoLarge : g.logoSmall} />
      <View>
        <Text style={g.brandTitle}>{title}</Text>
        <Text style={g.brandSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}
