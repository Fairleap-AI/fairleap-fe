"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_CONFIG, JAKARTA_ZONES, isGoogleMapsConfigured } from '@/config/googleMaps';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { FiMapPin, FiAlertTriangle, FiExternalLink, FiWifi, FiActivity } from 'react-icons/fi';

interface ZoneData {
  id: number;
  name: string;
  demand: number;
  traffic: number;
  earnings: number;
  lat: number;
  lng: number;
  hotspots: string[];
}

interface GoogleMapComponentProps {
  selectedZone?: ZoneData;
  onZoneSelect?: (zone: ZoneData) => void;
  startLocation?: string;
  endLocation?: string;
  onRouteCalculated?: (route: any) => void;
}

export default function GoogleMapComponent({ 
  selectedZone, 
  onZoneSelect, 
  startLocation, 
  endLocation,
  onRouteCalculated 
}: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [trafficLayer, setTrafficLayer] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('Memulai...');
  const [error, setError] = useState<string | null>(null);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isGoogleMapsConfigured()) {
      // Add preconnect for faster loading
      addPreconnectLinks();
      
      // Set loading timeout
      const timeout = setTimeout(() => {
        if (isLoading) {
          setError('Timeout loading Google Maps. Please check your connection.');
          setIsLoading(false);
        }
      }, 20000); // 20 second timeout

      setLoadingTimeout(timeout);
      initializeMap();

      return () => {
        if (timeout) clearTimeout(timeout);
      };
    } else {
      setIsLoading(false);
      setError('Google Maps API key belum dikonfigurasi');
    }
  }, []);

  useEffect(() => {
    if (map && startLocation && endLocation && directionsService && directionsRenderer) {
      calculateRoute();
    }
  }, [map, startLocation, endLocation, directionsService, directionsRenderer]);

  const addPreconnectLinks = () => {
    // Add preconnect for faster Google Maps loading
    const links = [
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
      'https://fonts.gstatic.com'
    ];

    links.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  };

  const updateLoadingProgress = (progress: number, status: string) => {
    setLoadingProgress(progress);
    setLoadingStatus(status);
  };

  const initializeMap = async () => {
    try {
      setIsLoading(true);
      setError(null);
      updateLoadingProgress(10, 'Menghubungkan ke Google Maps...');

      // Check if already loaded
      if ((window as any).google?.maps) {
        updateLoadingProgress(50, 'Google Maps sudah dimuat, inisialisasi...');
        initializeMapInstance();
        return;
      }

      updateLoadingProgress(20, 'Memuat Google Maps API...');

      // Use Loader with progress tracking
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_CONFIG.apiKey,
        version: 'weekly',
        libraries: GOOGLE_MAPS_CONFIG.libraries as any
      });

      // Load with progress simulation
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev < 70) return prev + 5;
          return prev;
        });
      }, 200);

      await loader.load();
      clearInterval(progressInterval);
      
      updateLoadingProgress(80, 'Menginisialisasi peta...');
      initializeMapInstance();

    } catch (error) {
      console.error('Error loading Google Maps:', error);
      setError('Gagal memuat Google Maps. Periksa koneksi internet atau API key.');
      setIsLoading(false);
    }
  };

  const initializeMapInstance = () => {
    try {
      updateLoadingProgress(85, 'Membuat instance peta...');
      
      if (mapRef.current && (window as any).google) {
        const google = (window as any).google;
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: GOOGLE_MAPS_CONFIG.defaultCenter,
          zoom: GOOGLE_MAPS_CONFIG.defaultZoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: GOOGLE_MAPS_CONFIG.mapStyles,
          gestureHandling: 'cooperative',
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        updateLoadingProgress(90, 'Menginisialisasi layanan...');

        // Initialize services
        const directionsServiceInstance = new google.maps.DirectionsService();
        const directionsRendererInstance = new google.maps.DirectionsRenderer({
          draggable: false,
          polylineOptions: {
            strokeColor: '#10b981',
            strokeWeight: 5,
            strokeOpacity: 0.8
          }
        });
        
        directionsRendererInstance.setMap(mapInstance);

        // Initialize traffic layer
        const trafficLayerInstance = new google.maps.TrafficLayer();
        trafficLayerInstance.setMap(mapInstance);

        updateLoadingProgress(95, 'Menambahkan zone markers...');

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);
        setTrafficLayer(trafficLayerInstance);

        // Add zone markers
        addZoneMarkers(mapInstance);

        updateLoadingProgress(100, 'Selesai!');

        // Clear timeout on successful load
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
          setLoadingTimeout(null);
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error('Error creating map instance:', error);
      setError('Error membuat instance peta. Silakan refresh halaman.');
      setIsLoading(false);
    }
  };

  const addZoneMarkers = (mapInstance: any) => {
    try {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      const newMarkers: any[] = [];
      const google = (window as any).google;

      JAKARTA_ZONES.forEach(zone => {
        const icon = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8 + (zone.demand / 10),
          fillColor: getDemandColor(zone.demand),
          fillOpacity: 0.8,
          strokeWeight: 2,
          strokeColor: '#ffffff'
        };

        const marker = new google.maps.Marker({
          position: { lat: zone.lat, lng: zone.lng },
          map: mapInstance,
          title: zone.name,
          icon: icon,
          animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; min-width: 220px; font-family: 'Inter', sans-serif;">
              <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${zone.name}</h3>
              <div style="font-size: 14px; color: #6b7280; line-height: 1.4;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center;">
                  <strong>Demand:</strong> 
                  <span style="color: ${getDemandColor(zone.demand)}; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: ${getDemandColor(zone.demand)}20;">${zone.demand}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center;">
                  <strong>Traffic:</strong> 
                  <span style="color: ${getTrafficColor(zone.traffic)}; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: ${getTrafficColor(zone.traffic)}20;">${zone.traffic}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <strong>Avg Earnings:</strong> 
                  <span style="color: #10b981; font-weight: 600;">Rp ${zone.earnings.toLocaleString('id-ID')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <strong>Peak Hours:</strong> <span style="font-weight: 500;">${zone.peakHours}</span>
                </div>
                <div style="border-top: 1px solid #e5e7eb; padding-top: 8px;">
                  <strong style="color: #4b5563;">Hotspots:</strong><br>
                  <span style="font-size: 12px; color: #6b7280;">${zone.hotspots.join(', ')}</span>
                </div>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          // Close other info windows
          newMarkers.forEach(m => {
            if (m.infoWindow) m.infoWindow.close();
          });
          
          infoWindow.open(mapInstance, marker);
          marker.infoWindow = infoWindow;
          
          if (onZoneSelect) {
            onZoneSelect(zone);
          }
        });

        newMarkers.push(marker);
      });

      setMarkers(newMarkers);
    } catch (error) {
      console.error('Error adding zone markers:', error);
    }
  };

  const getDemandColor = (demand: number): string => {
    if (demand >= 85) return '#10b981';
    if (demand >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getTrafficColor = (traffic: number): string => {
    if (traffic >= 80) return '#ef4444';
    if (traffic >= 60) return '#f59e0b';
    return '#10b981';
  };

  const calculateRoute = () => {
    if (!directionsService || !directionsRenderer || !startLocation || !endLocation) {
      return;
    }

    try {
      setLoadingStatus('Menghitung rute...');
      
      const google = (window as any).google;
      const request = {
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS
        },
        avoidHighways: false,
        avoidTolls: false
      };

      directionsService.route(request, (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          
          if (onRouteCalculated) {
            const route = result.routes[0];
            const routeData = {
              distance: route.legs[0].distance?.text,
              duration: route.legs[0].duration?.text,
              durationInTraffic: route.legs[0].duration_in_traffic?.text,
              steps: route.legs[0].steps
            };
            onRouteCalculated(routeData);
          }
        } else {
          console.error('Directions request failed:', status);
          setError('Gagal menghitung rute. Periksa alamat yang dimasukkan.');
        }
      });
    } catch (error) {
      console.error('Error calculating route:', error);
      setError('Error menghitung rute. Silakan coba lagi.');
    }
  };

  const toggleTrafficLayer = () => {
    if (trafficLayer && map) {
      const currentMap = trafficLayer.getMap();
      trafficLayer.setMap(currentMap ? null : map);
    }
  };

  const optimizeRoute = () => {
    if (!map || !directionsService || !directionsRenderer) return;

    try {
      setLoadingStatus('Mengoptimalkan rute...');
      
      const google = (window as any).google;
      
      const sortedZones = JAKARTA_ZONES
        .map(zone => ({
          ...zone,
          score: (zone.demand * zone.earnings) / (zone.traffic + 1)
        }))
        .sort((a, b) => b.score - a.score);

      const waypoints = sortedZones.slice(0, 3).map(zone => ({
        location: { lat: zone.lat, lng: zone.lng },
        stopover: true
      }));

      if (waypoints.length > 0) {
        const request = {
          origin: waypoints[0].location,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: waypoints.slice(1, -1),
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: new Date(),
            trafficModel: google.maps.TrafficModel.BEST_GUESS
          }
        };

        directionsService.route(request, (result: any, status: any) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.setDirections(result);
            
            const totalEarnings = sortedZones.slice(0, 3).reduce((sum, zone) => sum + zone.earnings, 0);
            
            if (onRouteCalculated) {
              onRouteCalculated({
                ...result.routes[0].legs[0],
                optimized: true,
                totalEarnings,
                zones: sortedZones.slice(0, 3)
              });
            }
          }
        });
      }
    } catch (error) {
      console.error('Error optimizing route:', error);
    }
  };

  if (!isGoogleMapsConfigured()) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-8">
          <FiAlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Google Maps API Key Required
          </h3>
          <p className="text-slate-600 mb-4 text-sm max-w-md">
            Untuk menggunakan fitur peta dan traffic real-time, silakan setup Google Maps API key.
          </p>
          <Alert className="mb-4 text-left">
            <FiAlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Setup:</strong><br/>
              Buat file .env.local dengan:<br/>
              NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-8 max-w-sm mx-auto">
          <div className="mb-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-emerald-600 mx-auto mb-4"></div>
              <FiWifi className="absolute inset-0 m-auto h-6 w-6 text-emerald-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Loading Google Maps
          </h3>
          
          <p className="text-slate-600 text-sm mb-4">{loadingStatus}</p>
          
          <div className="w-full space-y-2">
            <Progress value={loadingProgress} className="h-2" />
            <p className="text-xs text-slate-500">{loadingProgress}% complete</p>
          </div>
          
          <div className="mt-4 text-xs text-slate-400">
            Initializing interactive map with real-time traffic data...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-8">
          <FiAlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Error Loading Map
          </h3>
          <p className="text-slate-600 text-sm mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setError(null);
              setIsLoading(true);
              setLoadingProgress(0);
              initializeMap();
            }} 
            className="mt-2"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <button
          onClick={toggleTrafficLayer}
          className="px-3 py-2 bg-white shadow-lg rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 border transition-colors flex items-center space-x-1"
        >
          <FiActivity className="h-4 w-4" />
          <span>Traffic</span>
        </button>
        
        <button
          onClick={optimizeRoute}
          className="px-3 py-2 bg-emerald-600 text-white shadow-lg rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-1"
        >
          <FiMapPin className="h-4 w-4" />
          <span>Optimize</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
        <h4 className="text-sm font-semibold text-slate-800 mb-2 flex items-center">
          <FiMapPin className="h-4 w-4 mr-1" />
          Zone Demand
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>High (85%+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Medium (70-84%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Low (&lt;70%)</span>
          </div>
        </div>
      </div>
    </div>
  );
} 