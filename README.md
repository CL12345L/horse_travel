# Horse Travel

En enkel app til at planlægge og fremvise hestetransporter. Udfyld et transportdokument, gem det lokalt og vis en læsbar version til myndigheder ved kontrol.


## opgave krav (opfyldt) — hvor i koden
- Minimum 3 screens (se 02_Navigation):
  - `horse_travel/src/screens/OverviewScreen.js`
  - `horse_travel/src/screens/PlanScreen.js`
  - `horse_travel/src/screens/TransportsScreen.js`
  - Registreret i tabs: `horse_travel/App.js` (Tab.Screen: Overblik, Ny tur, Historik)

- Minimum 3 views:
  - De tre skærme ovenfor er selvstændige views
  - Ekstra views: `horse_travel/src/screens/FormsScreen.js`, `horse_travel/src/screens/TransportDetailScreen.js`, `horse_travel/src/screens/LoginScreen.js`

- Minimum 2 knapper (min. én navigerer) (se 01/02):
  - Naviger fra Overblik: `horse_travel/src/screens/OverviewScreen.js` (knapperne “Planlæg ny tur”, “Se historik”, “Formularer” kalder `navigation.navigate(...)`)
  - Åbn detalje fra liste: `horse_travel/src/screens/TransportsScreen.js` + `horse_travel/src/components/TransportCard.js` ("Vis dokument" åbner `TransportDetail`)
  - Funktionsknap med handling: `horse_travel/src/screens/PlanScreen.js` ("Gem" validerer og opretter transport)

- Minimum 1 liste (se 03_Lister):
  - `horse_travel/src/screens/TransportsScreen.js` (FlatList over transporter)
  - `horse_travel/src/screens/FormsScreen.js` (FlatList over dokumenter)

- Styling i separat fil (se 04_Styling):
  - `horse_travel/src/styles/styles.js` (GlobalStyle)
  - Brugt i skærme/komponenter: fx `horse_travel/src/screens/OverviewScreen.js`, `horse_travel/src/components/PrimaryButton.js`

- README med demovideo:
  - `horse_travel/README.md` (afsnittet “Demovideo” – indsæt jeres link)

## Kom hurtigt i gang
- Krav: Node.js LTS og Expo Go på din telefon (eller iOS/Android‑emulator).
- Start projektet fra roden af repoet:
  ```bash
  cd horse_travel-main        # gå ind i app-mappen, medmindre du allerede er i mappen så spring over. 
  npm install            # hent afhængigheder
  npx expo start         # start Metro bundleren (tryk i/a/w eller scan QR)
  ```
- Hvis netværk driller: `npx expo start --tunnel`
- Ryd cache: `npx expo start -c`

## Start med npx expo start (grundig guide)
Kør altid kommandoer inde i `horse_travel/`.

1) Installer og start bundleren
```bash
cd horse_travel-main #medmindre du allerede er i mappen, spring dette over. 
npx expo start          # eller: npx expo start --tunnel
```

2) Genvejstaster i terminalen
- `i`: Åbn i iOS‑simulator (kræver Xcode/Simulator på macOS)
- `a`: Åbn i Android‑emulator (kræver Android Studio/AVD)
- `w`: Åbn som Web (React Native Web) på http://localhost:19006
- `o`: Åbn Expo DevTools i browseren
- `?`: Vis alle tilgængelige genveje

3) Kør web specifikt
```bash
npx expo start --web          # kun web
```

4) Åbn på fysisk telefon
- Scan QR‑koden i terminalen/DevTools med Expo Go.
- Hvis LAN ikke virker (skole/eduroam, firewall osv.), brug Tunnel: `npx expo start --tunnel` og scan QR igen.

## Hvis “w” (Web) ikke virker
- Cache/webpack fejl: stop bundleren og kør `npx expo start -c`, prøv igen.
- Manglende web‑pakker: kør `npx expo install react-native-web react-dom @expo/metro-runtime` og start igen.

## Funktioner
- Overblik: genveje til at planlægge ny tur, se historik og formularer.
- Planlæg ny tur: udfyld transportdokument og gem.
- Historik: se alle gemte transporter; vis eller slet.
- Dokumentvisning: pæn, print‑klar visning til myndigheder.
- Login/Log ud: simpelt lokalt login.

## Sådan bruger du appen
- Opret/Log ind: brug valgfri email og adgangskode. Du lander på Overblik.
- Ny tur:
  - Udfyld felter (antal heste, ejer, afgang/bestemmelsessted, dato/tid m.m.).
  - Tryk Gem. Turen lægges i Historik.
- Historik:
  - Tryk Vis dokument for at åbne den pæne visning.
  - Tryk Slet for at fjerne en tur.
- Formularer: hurtig liste over dine dokumenter (samme handlinger som i Historik).

## Data og privatliv
- Alt gemmes lokalt på enheden via AsyncStorage (ingen server).
- Sletning i appen fjerner posten fra den lokale liste.

## Mappestruktur (kort)
```
horse_travel-main/
  App.js                # Navigation og skærme
  app.json              # App‑ikon, splash m.m.
  assets/               # Billeder (logo, ikoner)
  src/
    components/         # Knapper, kort, header
    screens/            # Overblik, Ny tur, Historik, Formularer, Detalje, Login
    store/              # AuthContext, TransportContext
    styles/             # GlobalStyle
```

## Ofte stillede spørgsmål
- Jeg kan ikke tilgå appen fra telefonen: prøv `npx expo start --tunnel` og scan QR igen.
- Bundleren opfører sig mærkeligt: stop den og kør `npx expo start -c`.
- Hvor kører jeg kommandoer fra? Inde i mappen `horse_travel/`.


## Videre arbejde
- Native dato/tid‑vælgere, søgning i historik og eksport/print af dokument.

---
Horse Travel
