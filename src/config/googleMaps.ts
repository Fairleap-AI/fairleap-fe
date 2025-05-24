// Google Maps API Configuration
export const GOOGLE_MAPS_CONFIG = {
  // API Key dari environment variable
  // Buat file .env.local dengan: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  
  // Default map configuration
  defaultCenter: {
    lat: -6.2088,
    lng: 106.8456
  },
  
  defaultZoom: 11,
  
  // Libraries yang dibutuhkan - hanya yang valid untuk Google Maps JavaScript API
  libraries: ['places', 'geometry'] as const,
  
  // Map styling
  mapStyles: [
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [{ visibility: "off" }]
    }
  ]
};

// Helper function untuk check apakah API key valid
export const isGoogleMapsConfigured = (): boolean => {
  return GOOGLE_MAPS_CONFIG.apiKey !== '' && 
         GOOGLE_MAPS_CONFIG.apiKey.length > 0;
};

// Jakarta zones dengan koordinat real
export const JAKARTA_ZONES = [
  {
    id: 1,
    name: "Menteng",
    demand: 92,
    traffic: 85,
    earnings: 52000,
    lat: -6.1944,
    lng: 106.8294,
    hotspots: ["Plaza Indonesia", "Grand Indonesia", "Sarinah"],
    currentBonus: 20,
    peakHours: "17:00-19:00"
  },
  {
    id: 2,
    name: "Kelapa Gading",
    demand: 85,
    traffic: 65,
    earnings: 45000,
    lat: -6.1598,
    lng: 106.9057,
    hotspots: ["Mall of Indonesia", "Kelapa Gading Mall", "La Piazza"],
    currentBonus: 10,
    peakHours: "19:00-21:00"
  },
  {
    id: 3,
    name: "Senayan",
    demand: 78,
    traffic: 75,
    earnings: 38000,
    lat: -6.2297,
    lng: 106.8070,
    hotspots: ["Senayan City", "FX Sudirman", "Plaza Senayan"],
    currentBonus: 5,
    peakHours: "18:00-20:00"
  },
  {
    id: 4,
    name: "Kemang",
    demand: 88,
    traffic: 55,
    earnings: 48000,
    lat: -6.2615,
    lng: 106.8106,
    hotspots: ["Kemang Village", "Lippo Mall Kemang", "Kemang Raya"],
    currentBonus: 15,
    peakHours: "20:00-22:00"
  },
  {
    id: 5,
    name: "PIK",
    demand: 75,
    traffic: 45,
    earnings: 35000,
    lat: -6.1088,
    lng: 106.7383,
    hotspots: ["PIK Avenue", "Living World", "Pantai Indah Kapuk"],
    currentBonus: 0,
    peakHours: "16:00-18:00"
  }
]; 