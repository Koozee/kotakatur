# Kotakatur App

This is an [Expo](https://expo.dev) project created with `create-expo-app` and utilizing **Expo Router** for file-based routing.

## 🏗️ Architecture (Type-Based Architecture)

Proyek ini telah direstrukturisasi agar lebih rapi dan "bersih" dengan memisahkan antara *routing* dan logika aplikasi (*logic*).

- **`app/`**: SECARA KETAT HANYA digunakan untuk routing otomatis menggunakan Expo Router. Di sini berisi penamaan routing dan konfigurasi navigasi, sangat dihindari untuk meletakkan UI kompleks di folder ini.
- **`src/`**: Inti dari seluruh aplikasi. Semua source code (komponen, *state*, fungsi, *fetching* API) hidup di sini.

### 📂 Directory Structure

```text
kotakatur/
├── app/                  # Routing otomatis Expo Router
│   ├── (tabs)/           # Kumpulan navigasi tab
│   └── _layout.tsx       # Root layout untuk navigasi global
├── src/                  # Seluruh source code dan logika aplikasi
│   ├── components/       # Komponen UI global yang dapat digunakan kembali (Button, Card, dll)
│   ├── constants/        # Nilai konstanta (Warna, URL, Tema, dll)
│   ├── hooks/            # Custom React Hooks
│   ├── screens/          # File berisi tampilan layar utuh (akan di-import langsung ke app/)
│   ├── services/         # File untuk manajemen API (seperti axios atau fetch)
│   ├── store/            # Manajemen State Global (Zustand, Redux, Jotai, dll)
│   ├── types/            # Interface dan definisi tipe file TypeScript
│   └── utils/            # Kumpulan fungsi bantuan yang digunakan berulang-ulang
├── assets/               # Gambar (Images), Fonts, dan Media statis lokal
└── tsconfig.json         # Konfigurasi TypeScript (Telah di-mapping agar @/ mengarah ke src/)
```

### 💡 Contoh Menambah Halaman Baru
1. Buat tampilan layarnya di `src/screens`, misalnya `src/screens/ProfileScreen.tsx`.
2. Buka (atau buat) jalur *route*-nya di folder `app/`, misalnya `app/profile.tsx`.
3. Lakukan *import* halaman dari folder `screens/` dan **export default**:
   ```tsx
   // File: app/profile.tsx
   import { ProfileScreen } from '@/screens/ProfileScreen';

   export default function ProfileRoute() {
     return <ProfileScreen />;
   }
   ```

## 🚀 Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

Anda nanti akan mendapatkan pilihan di terminal untuk membuka melalui:
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- Aplikasi di HP menggunakan [Expo Go](https://expo.dev/go)

## 📚 Learn more

- [Expo documentation](https://docs.expo.dev/)
- [React Native Directory](https://reactnative.directory/)
