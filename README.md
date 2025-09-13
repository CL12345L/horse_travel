# Horse Travel (Expo/React Native)

En enkel mobilapp til stutterier, rideklubber og transportfirmaer. Appen strømliner hestetransport fra planlægning (transportdokument) til visning for myndigheder – med enkel navigation, global styling og persisteret data.

- Overblik: stort logo, næste tur og hurtige handlinger
- Ny tur (Transportdokument): udfyld felter og gem
- Historik: liste med “Vis dokument” og “Slet”
- Formularer: hurtig visning af alle oprettede dokumenter
- Transportdokument (detalje): fuld, læsbar visning klar til myndigheder
- Login/Opret konto: simpelt mock‑flow, persisteret lokalt

## Demo
- Indsæt videolink: https://YOUR-VIDEO-LINK

## Krav (opfyldt)
- Minimum 3 screens/views: Overblik, Ny tur, Historik (+ Formularer, Detalje, Login)
- Minimum 2 knapper (én navigerer): Knapper på Overblik/Ny tur navigerer og gemmer
- Minimum 1 liste: Historik og Formularer (FlatList)
- Styling separat: Global style i `src/styles/styles.js`
- README: Denne fil (med kørevejledning)

## Hurtig start
Forudsætninger
- Node.js LTS
- Expo Go på mobilen (eller iOS/Android emulator)

Kør projektet
```bash
cd horse_travel
npm install
npm start   # vælg i, a eller web – eller scan QR i Expo Go
```
Tips
- På netværk med begrænsninger (eduroam m.fl.): `npx expo start --tunnel`
- Ryd cache hvis noget driller: `npx expo start -c`
- Åbn direkte simulator: tryk `i` (iOS) eller `a` (Android) i terminalen

### Kør med `npx expo start`
Du kan altid starte bundleren direkte med Expo CLI uden npm‑script:

```bash
cd horse_travel
npx expo start          # standard LAN
npx expo start -c       # rens Metro/asset‑cache
npx expo start --tunnel # brug tunnel hvis LAN ikke virker
```
Når bundleren kører, brug tastaturgenveje i terminalen: `i` (iOS), `a` (Android), `w` (Web).

Login / Opret bruger
- Brug enhver email + adgangskode for at oprette.
- Efter login lander du på Overblik.

## Brugerguide (kort)
- Overblik
  - Se næste tur (hvis der er nogen), genveje til Ny tur, Historik, Formularer og Log ud.
- Ny tur (Transportdokument)
  - Felter: Antal heste, Dyrenes oprindelse, Ejer (Navn, Adresse, Telefon), Afgangssted, Bestemmelsessted, Dato, Tid, Forventet varighed (Timer/Min).
  - Tryk “Gem” for at oprette og hop til Historik.
- Historik
  - Liste over transporter. Tryk “Vis dokument” for fuld visning; “Slet” fjerner posten.
- Formularer
  - Hurtig liste over dine dokumenter; samme handlinger som i Historik.
- Transportdokument (detalje)
  - Fuld, læsbar visning klar til forevisning for myndigheder.

Data & Persistens
- Login (aktuel bruger) og `transports` persisteres i AsyncStorage.
- Slet/tilføj overlever app‑genstart.

## Teknologi
- Expo `~54`, React Native `0.81`, React `19`
- Navigation: `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`
- UI: Global StyleSheet (ingen inline‑styles)
- State: React Context (`AuthContext`, `TransportContext`)
- Storage: `@react-native-async-storage/async-storage`

## Struktur
```
horse_travel/
  App.js                # Navigation (Tabs + Stack), Auth/Transport providers
  app.json              # Expo app‑konfiguration (ikon/splash)
  assets/               # Billeder (logo)
  data/transports.json  # Demo‑data (ikke auto‑seedet)
  src/
    components/
      AppHeader.js
      PrimaryButton.js
      TransportCard.js
    screens/
      LoginScreen.js
      OverviewScreen.js
      PlanScreen.js            # Ny tur (transportdokument)
      TransportsScreen.js      # Historik (liste)
      FormsScreen.js           # Formular‑liste
      TransportDetailScreen.js # Fuld visning af dokument
    store/
      AuthContext.js
      TransportContext.js
    styles/
      styles.js                # GlobalStyle + farver
```

## Udviklernoter
- Global styling
  - Importér som: `import { GlobalStyle as g } from '../styles/styles'`
  - Ingen inline‑styles i appen.
- Tilføj felt til dokument
  - Udvid `draft` i `TransportContext`, brug feltet i `PlanScreen`, og inkludér det i `payload` til `addTransport`.
- Navigation
  - Tabs: Overblik, Ny tur, Historik, Formularer
  - Stack: TransportDetail (myndighedsvisning) + Login

## Fejlsøgning
- Expo bundler hænger eller fejl: `npx expo start -c`
- iOS simulator åbner ikke: `npm run ios` eller start Simulator manuelt og prøv igen
- Android emulator: Sørg for Android Studio/AVD kører; `npm run android`
- Metro/port problemer: luk alle kørende bundlere og prøv igen

### Expo Go (SDK‑match og almindelige problemer)
- SDK‑match: Sørg for, at din Expo Go version matcher projektets SDK. Kør `npx expo doctor` og følg anbefalingerne.
- Åbning i Expo Go: kør `npx expo start` og scan QR‑koden (LAN, Tunnel eller Local efter netværk).
- Custom native modules: hvis appen bruger moduler, som Expo Go ikke understøtter, brug en Development Build: `npx expo run:ios` eller `npx expo run:android`.

### Watchman‑fejl (macOS)
Typiske symptomer: "watchman error", filændringer opdages ikke, bundler stopper.

```bash
brew install watchman                  # eller: brew reinstall watchman
watchman watch-del-all || true
watchman shutdown-server || true
npx expo start -c
```
Hvis Homebrew ikke er en mulighed, kan du midlertidigt bruge polling: `CHOKIDAR_USEPOLLING=1 npx expo start` (langsommere).

### Versionsfejl: "Please install react-native-web@~0.19.10, react-dom@18.2.0, @expo/metro-runtime@~3.2.3"
Dette skyldes mismatch mellem din Expo SDK og pakkeversioner. Løsning:

```bash
cd horse_travel
npx expo doctor
npx expo install react-native-web@~0.19.10 react-dom@18.2.0 @expo/metro-runtime@~3.2.3
npx expo start -c
```
Hvis der stadig er mismatch, kør `npx expo install` uden argumenter for at auto-rette alle afhængigheder til korrekte versioner for din SDK.

### Installer versionssæt (React 19 / RN 0.81)
Hvis du vil matche de versioner, projektet er skrevet til, kan du installere dette sæt eksplicit:

```bash
cd horse_travel
npx expo install \
  react@19.1.0 \
  react-dom@19.1.0 \
  react-native@0.81.4 \
  react-native-web@^0.21.0 \
  @expo/metro-runtime@~6.1.2 \
  react-native-safe-area-context@~5.6.0 \
  react-native-screens@~4.16.0 \
  @react-native-async-storage/async-storage@2.2.0
npx expo start -c
```
Bemærk: `expo install` vælger typisk de korrekte kompatible versioner for din SDK. Brug ovenstående kun hvis du specifikt har brug for netop disse versioner og din SDK understøtter dem (bekræft med `npx expo doctor`).

### Generelle crashes og cache‑rens
- Ryd Metro cache og bundler: `npx expo start -c`
- Slet midlertidige Expo‑mapper: luk bundleren og slet `.expo/` i projektroden, start derefter igen
- Geninstaller moduler: `rm -rf node_modules package-lock.json && npm install`
- Skift bundler‑tilstand hvis netværk driller: `npx expo start --tunnel`

## Videre arbejde 
- Dato/tid‑vælgere (native pickers) på Ny tur
- Søgning/filtrering i Historik/Formularer
- Del/eksport af dokument (billede/PDF)
- “Ryd kladde” på Ny tur

---
Horse Travel
