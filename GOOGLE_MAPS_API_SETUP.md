# Google Maps API Setup - FairLeap

## Quick Setup

### 1. Buat File Environment
Buat file `.env.local` di root project dengan isi:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyARcEazmwqvq_2xQWzKAY_SHtsZ8TTI8wo
```

### 2. Restart Development Server
```bash
npm run dev
```

### 3. Akses Route Planner
Buka aplikasi dan navigasi ke **Route Planner** untuk melihat Google Maps integration.

## Fitur Route Planner

✅ **Interactive Map** - Peta interaktif Jakarta dengan zone markers  
✅ **Real-time Traffic** - Layer traffic real-time dari Google Maps  
✅ **Route Optimization** - Algoritma optimasi rute berdasarkan earnings vs traffic  
✅ **Zone Analytics** - 5 zona Jakarta dengan data demand, traffic, dan earnings  
✅ **Route Calculation** - Kalkulasi jarak, waktu, dan potensi income  

## Zone Coverage

- **Menteng** - High demand area (Plaza Indonesia, Grand Indonesia)
- **Kelapa Gading** - Mall-centric area (MOI, Kelapa Gading Mall) 
- **Senayan** - Business district (Senayan City, FX Sudirman)
- **Kemang** - Entertainment district (Kemang Village)
- **PIK** - Residential area (PIK Avenue, Living World)

## Troubleshooting

### ❌ "Failed to load Google Maps script" Error
**Solusi:**
1. Pastikan file `.env.local` sudah dibuat dengan API key yang valid
2. Clear browser cache dan refresh halaman
3. Restart development server dengan `npm run dev`
4. Periksa console browser untuk error detail

### ❌ "The library directions is unknown" Error  
**Solusi:** Sudah diperbaiki - library konfigurasi telah diupdate untuk hanya menggunakan library yang valid (`places`, `geometry`)

### ❌ Map tidak muncul?
**Solusi:**
- Pastikan file `.env.local` sudah dibuat dengan benar
- Restart development server setelah menambah environment variable  
- Cek console browser untuk error messages
- Pastikan koneksi internet stabil

### ❌ Route calculation gagal?
**Solusi:**
- Input alamat dengan format yang jelas (contoh: "Plaza Indonesia, Jakarta")
- Pastikan alamat berada di area Jakarta
- Coba dengan alamat yang lebih spesifik

## API Configuration

Aplikasi menggunakan Google Maps JavaScript API dengan libraries:
- **Places API** - Untuk autocomplete dan pencarian lokasi
- **Geometry API** - Untuk kalkulasi jarak dan area

Directions API menggunakan service built-in yang tidak memerlukan library terpisah.

## Integrasi Sistem

Route Planner terintegrasi dengan:
- **Dashboard Analytics** - Data zone performance
- **Earnings Calculator** - Prediksi income optimal  
- **AI Assistant** - Rekomendasi rute via chatbot
- **Wellness Tracker** - Pertimbangan jam kerja optimal

## Security Note

API key sudah dikonfigurasi untuk domain aplikasi ini. Jangan share API key ke repository public atau aplikasi lain. 