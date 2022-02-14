# Crossplattform Advanced - Semesterprojekt

### Projektbeschreibung:
Bei der App handelt es sich um eine Bike-App.
Für einen Auszug zu den einzelnen App-Views siehe "BikeApp Views.pdf".
Es können Touren mit mehreren Parametern gespeichert, geändert und gelöscht werden.
Touren können manuell erstellt und eingegeben werden oder mittels Geolocation und Google Maps getrackt werden.
Als Backend wird Firebase verwendet.
Firebase Authentication (Build Feature) dient zum speichern von Usern und Logindaten, sowie zur Authentifizierung.
Firebase Firestore (Build Feature) für das Speichern von Userdaten und Touren.
Firebase Remote Config (Engage Feature) zum abrufen von Konfigurationsparametern der App. Bisher ausschließlich zur Aktivierung bzw Deaktivierung der Tracking-Option.
Als Ionic Native Plugins wurden "Background Geolocation" und "Geolocation" verwendet.
"Background Geolocation" ermöglicht das Tracking auch wenn sich die App am Smartphone nicht mehr im aktiven Status befindet (App Lifecyle).
Für die Darstellung der GPS-Daten wird die "Maps Javascript API" von Google eingebunden.


### Getestet auf:
- Smartphone Samsung S7 (SDK Android 8.0 Oreo, API-Level 26)
- Google Chrome Version 96.0.4664.110 (Offizieller Build) (64-Bit)

### Anleitung für Ausführung/Installation (Ionic-Installation vorausgesetzt!):
- "npm install" ausführen
- "ionic build" ausführen
- Ausführung zu Development-Zwecken im WebBrowser mit "ionic serve"

### Ausführung/Deployment auf Android-Device/Emulator:
- "ionic capacitor sync" ausführen
- "ionic capacitor open android" ausführen um App in Android Studio zu öffnen
- App auf Android-Smartphone über Android Studio installieren (vorher SDK und Tools entsprechend dem Smartphone installieren)