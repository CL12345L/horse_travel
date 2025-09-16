
// Globalt StyleSheet til hele appen (ingen inline-styles)
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0f5132',
  bg: '#f6f7f9',
  white: '#ffffff',
  text: '#0b0d0e',
  muted: '#6b7280'
};

export const GlobalStyle = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  screenContent: { paddingBottom: 24 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, color: colors.text },
  subtitle: { fontSize: 14, color: colors.muted, marginBottom: 12 },
  input: { backgroundColor: colors.white, borderColor: '#e5e7eb', borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  button: { backgroundColor: colors.primary, paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginVertical: 6 },
  buttonText: { color: 'white', fontWeight: '700' },
  secondaryButton: { backgroundColor: '#ffffff', borderColor: colors.primary, borderWidth: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginVertical: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  secondaryButtonText: { color: colors.primary, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dangerButton: { backgroundColor: '#b91c1c', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, alignItems: 'center' },
  dangerButtonText: { color: 'white', fontWeight: '700' },
  // Brand / header
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  logoSmall: { width: 72, height: 28, resizeMode: 'contain', marginRight: 12 },
  logoLarge: { width: 140, height: 56, resizeMode: 'contain', marginRight: 16 },
  logoXL: { width: 220, height: 88, resizeMode: 'contain', marginBottom: 8 },
  brandTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  brandSubtitle: { color: colors.muted },
  brandTitleLight: { fontSize: 22, fontWeight: '800', color: '#ffffff' },
  brandSubtitleLight: { color: '#e5e7eb' },
  // Overview / sections
  hero: { backgroundColor: colors.white, borderRadius: 16, padding: 20, marginBottom: 12 },
  brandHero: { backgroundColor: colors.primary, borderRadius: 16, padding: 24, marginBottom: 16 },
  section: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginTop: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 },
  mutedText: { color: colors.muted },
  spacer16: { height: 16 },
  flex1: { flex: 1 },
  mr8: { marginRight: 8 },
  ml8: { marginLeft: 8 },
  mt4: { marginTop: 4 },
  mt8: { marginTop: 8 },
  centered: { justifyContent: 'center' },
  pv24: { paddingVertical: 24 },
  rowEnd: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  subtitleTight: { fontSize: 14, color: colors.muted, marginTop: -4, marginBottom: 12 },
  illustration: { marginTop: 12, width: '100%', height: 380, resizeMode: 'contain', borderRadius: 12 }
  ,link: { textAlign: 'center', color: colors.primary, marginTop: 10 }
  ,label: { fontSize: 14, fontWeight: '700', color: colors.text, marginTop: 6 }
  ,value: { fontSize: 14, color: colors.text }
  ,help: { fontSize: 12, color: colors.muted, marginTop: -6, marginBottom: 8 }
  ,statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 }
  ,statPill: { backgroundColor: '#ffffff', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, marginRight: 8 }
  ,statText: { color: colors.text, fontWeight: '700' }
});

// 'g' er bare et kort navn for GlobalStyle, så gammel kode stadig virker
export const g = GlobalStyle;
