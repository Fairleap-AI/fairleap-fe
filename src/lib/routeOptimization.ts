// Shared Route Optimization Logic untuk Dashboard dan Route Planner

export interface ZoneData {
  id: number;
  name: string;
  demand: number;
  traffic: number;
  earnings: number;
  lat: number;
  lng: number;
  hotspots: string[];
  currentBonus?: number;
  peakHours: string;
  estimatedTrips?: number;
}

export interface OptimizedRoute {
  zones: ZoneData[];
  totalEarnings: number;
  totalDistance: string;
  totalDuration: string;
  efficiency: number;
  score: number;
}

// Algorithm untuk menghitung optimasi rute
export const calculateRouteOptimization = (zones: ZoneData[]): OptimizedRoute => {
  // Hitung score untuk setiap zone berdasarkan demand, earnings, dan traffic
  const scoredZones = zones.map(zone => ({
    ...zone,
    score: calculateZoneScore(zone)
  }));

  // Sort berdasarkan score tertinggi
  const optimizedZones = scoredZones.sort((a, b) => b.score - a.score);

  // Ambil top 3-5 zones untuk route optimal
  const selectedZones = optimizedZones.slice(0, Math.min(5, zones.length));

  const totalEarnings = selectedZones.reduce((sum, zone) => 
    sum + zone.earnings + (zone.currentBonus || 0) * zone.earnings / 100, 0
  );

  const efficiency = calculateRouteEfficiency(selectedZones);

  return {
    zones: selectedZones,
    totalEarnings,
    totalDistance: calculateEstimatedDistance(selectedZones),
    totalDuration: calculateEstimatedDuration(selectedZones),
    efficiency,
    score: totalEarnings * efficiency / 100
  };
};

// Hitung score zone individual
export const calculateZoneScore = (zone: ZoneData): number => {
  const demandWeight = 0.4;
  const earningsWeight = 0.4;
  const trafficWeight = 0.2;

  // Normalisasi values ke 0-100
  const normalizedDemand = zone.demand;
  const normalizedEarnings = Math.min(zone.earnings / 1000, 100); // Normalisasi per 1000
  const normalizedTraffic = 100 - zone.traffic; // Lower traffic = better score

  const score = (
    normalizedDemand * demandWeight +
    normalizedEarnings * earningsWeight +
    normalizedTraffic * trafficWeight
  );

  // Bonus multiplier jika ada
  const bonusMultiplier = 1 + (zone.currentBonus || 0) / 100;

  return score * bonusMultiplier;
};

// Hitung efisiensi route berdasarkan ratio earnings vs effort
export const calculateRouteEfficiency = (zones: ZoneData[]): number => {
  const avgDemand = zones.reduce((sum, zone) => sum + zone.demand, 0) / zones.length;
  const avgTraffic = zones.reduce((sum, zone) => sum + zone.traffic, 0) / zones.length;
  
  // Efisiensi = demand tinggi, traffic rendah
  return Math.min(Math.round((avgDemand * 100) / (avgTraffic + 10)), 100);
};

// Estimasi jarak total (simplified calculation)
export const calculateEstimatedDistance = (zones: ZoneData[]): string => {
  if (zones.length <= 1) return "0 km";
  
  // Simplified distance calculation - real implementation would use actual coordinates
  const baseDistance = zones.length * 8; // 8km average between zones
  const variance = Math.random() * 4; // Add some variance
  
  return `${(baseDistance + variance).toFixed(1)} km`;
};

// Estimasi durasi total
export const calculateEstimatedDuration = (zones: ZoneData[]): string => {
  if (zones.length <= 1) return "0 mnt";
  
  // Calculate based on distance and average traffic
  const avgTraffic = zones.reduce((sum, zone) => sum + zone.traffic, 0) / zones.length;
  const baseMinutes = zones.length * 15; // 15 minutes base per zone
  const trafficMultiplier = 1 + (avgTraffic / 100); // Traffic impact
  
  const totalMinutes = Math.round(baseMinutes * trafficMultiplier);
  
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}j ${minutes}m`;
  }
  
  return `${totalMinutes} mnt`;
};

// Generate rekomendasi berdasarkan waktu
export const getTimeBasedRecommendations = (zones: ZoneData[], currentHour: number): ZoneData[] => {
  const timeBasedScores = zones.map(zone => {
    const [startHour, endHour] = zone.peakHours.split('-').map(time => parseInt(time.split(':')[0]));
    
    // Bonus score jika dalam peak hours
    const isInPeakHours = currentHour >= startHour && currentHour <= endHour;
    const peakBonus = isInPeakHours ? 1.5 : 1;
    
    return {
      ...zone,
      timeScore: calculateZoneScore(zone) * peakBonus
    };
  });

  return timeBasedScores
    .sort((a, b) => b.timeScore - a.timeScore)
    .slice(0, 3);
};

// Real-time alerts berdasarkan kondisi
export const generateRealTimeAlerts = (zones: ZoneData[]) => {
  const alerts = [];

  // Traffic alerts
  const highTrafficZones = zones.filter(zone => zone.traffic > 80);
  if (highTrafficZones.length > 0) {
    alerts.push({
      id: Date.now() + 1,
      type: "traffic",
      message: `Kemacetan berat di ${highTrafficZones[0].name}`,
      time: "Baru saja",
      severity: "high"
    });
  }

  // Bonus alerts
  const bonusZones = zones.filter(zone => (zone.currentBonus || 0) > 10);
  if (bonusZones.length > 0) {
    alerts.push({
      id: Date.now() + 2,
      type: "bonus",
      message: `Bonus zone aktif di ${bonusZones[0].name} (+${bonusZones[0].currentBonus}%)`,
      time: "5 menit lalu",
      severity: "medium"
    });
  }

  // Demand alerts
  const highDemandZones = zones.filter(zone => zone.demand > 90);
  if (highDemandZones.length > 0) {
    alerts.push({
      id: Date.now() + 3,
      type: "demand",
      message: `Demand tinggi di ${highDemandZones[0].name} (${highDemandZones[0].demand}%)`,
      time: "2 menit lalu",
      severity: "medium"
    });
  }

  return alerts;
};

// Format currency untuk display
export const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

// Get zone color berdasarkan demand level
export const getZoneDemandColor = (demand: number): string => {
  if (demand >= 85) return '#10b981'; // Green
  if (demand >= 70) return '#f59e0b'; // Orange
  return '#ef4444'; // Red
};

// Get traffic color
export const getZoneTrafficColor = (traffic: number): string => {
  if (traffic >= 80) return '#ef4444'; // Red
  if (traffic >= 60) return '#f59e0b'; // Orange
  return '#10b981'; // Green
}; 