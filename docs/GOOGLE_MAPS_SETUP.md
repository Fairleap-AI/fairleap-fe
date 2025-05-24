# Google Maps Integration Setup Guide

## Implementasi Google Maps API untuk Route Planner FairLeap

Route Planner di FairLeap telah diintegrasikan dengan Google Maps API untuk memberikan fitur real-time traffic data dan optimasi rute yang akurat.

## Setup Google Maps API Key

### 1. Buat Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Pastikan billing account sudah di-setup (diperlukan untuk Maps API)

### 2. Aktifkan APIs

Aktifkan APIs berikut di Google Cloud Console:

- **Maps JavaScript API** - Untuk menampilkan peta interaktif
- **Places API** - Untuk autocomplete alamat
- **Directions API** - Untuk menghitung rute
- **Geocoding API** - Untuk konversi alamat ke koordinat
- **Distance Matrix API** - Untuk kalkulasi jarak dan waktu tempuh

### 3. Buat API Key

1. Buka **APIs & Services > Credentials**
2. Klik **Create Credentials > API Key**
3. Copy API Key yang dihasilkan
4. (Opsional) Set restrictions untuk keamanan:
   - Application restrictions: HTTP referrers
   - API restrictions: Pilih APIs yang diaktifkan di atas

### 4. Konfigurasi Environment

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Fitur Route Planner

### 1. Interactive Map dengan Real-time Traffic

- **Traffic Layer**: Toggle untuk menampilkan kondisi traffic real-time
- **Zone Markers**: Menampilkan zona demand dengan color coding:
  - 🟢 Green: High demand (85%+)
  - 🟠 Orange: Medium demand (70-84%)
  - 🔴 Red: Low demand (<70%)

### 2. Route Optimization

- **Manual Route Planning**: Input alamat awal dan tujuan
- **Auto Route Optimization**: Algoritma untuk memaksimalkan earnings vs meminimalkan traffic
- **Real-time Route Calculation**: Menggunakan current traffic conditions

### 3. Zone Information

Setiap zone marker menampilkan:
- Demand percentage
- Traffic level
- Average earnings
- Peak hours
- Hotspot locations

### 4. Route Analytics

- Distance dan duration estimation
- Traffic-adjusted travel time
- Earnings potential calculation
- Multi-waypoint optimization

## Jakarta Zones Data

Aplikasi sudah dikonfigurasi dengan 5 zona utama Jakarta:

1. **Menteng** - High demand area (Plaza Indonesia, Grand Indonesia)
2. **Kelapa Gading** - Mall-centric area
3. **Senayan** - Business district
4. **Kemang** - Entertainment district
5. **PIK** - Residential area

## Integrasi dengan Fitur Lain

### Dashboard Integration

Route Planner terintegrasi dengan:

- **Earnings Calculator**: Prediksi income berdasarkan rute optimal
- **Analytics**: Historical data untuk pattern recognition
- **Wellness**: Pertimbangan jam kerja optimal

### AI Assistant Integration

Chatbot dapat memberikan rekomendasi rute berdasarkan:
- Current traffic conditions
- Historical earnings data
- Driver's wellness score
- Weather conditions

## Fallback Mode

Jika Google Maps API key tidak dikonfigurasi:
- Tampilan fallback dengan instruksi setup
- Link langsung ke Google Cloud Console
- Zone data tetap dapat diakses dalam format list

## Performance Optimization

- Lazy loading Google Maps script
- Marker clustering untuk performance
- Debounced route calculations
- Cached zone data

## Security Considerations

- API Key restrictions berdasarkan domain
- Rate limiting pada route calculations
- Input validation untuk alamat
- Error handling untuk API failures

## Troubleshooting

### Common Issues:

1. **Maps tidak muncul**
   - Periksa API key sudah benar
   - Pastikan billing account aktif
   - Cek browser console untuk error messages

2. **Route calculation gagal**
   - Periksa alamat input format yang valid
   - Pastikan Directions API sudah diaktifkan
   - Cek quota usage di Google Cloud Console

3. **Performance issues**
   - Implementasi debouncing untuk input
   - Optimasi marker rendering
   - Cache hasil route calculations

## Cost Estimation

Google Maps API pricing:
- Maps JavaScript API: $7 per 1000 requests
- Directions API: $5 per 1000 requests
- Places API: $17 per 1000 requests

Estimasi untuk aplikasi driver:
- ~100 requests per driver per hari
- ~$1-2 per driver per bulan

## Future Enhancements

- Real-time driver location tracking
- Traffic prediction using ML
- Dynamic pricing zones
- Weather integration
- Driver clustering for better zone recommendations 