import { useEffect, useRef, useState } from 'react';
import { useRides } from '@context/RideContext';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface GoogleMapRideProps {
  startLat?: number;
  startLng?: number;
  endLat?: number;
  endLng?: number;
}

const GoogleMapRide: React.FC<GoogleMapRideProps> = ({
  startLat = 10.0159,
  startLng = 76.3419,
  endLat = 10.0000,
  endLng = 76.3500
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { activeRide, completeActiveRide } = useRides();

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Define the initMap function globally
    window.initMap = () => {
      if (!mapRef.current) return;

      const start = { lat: startLat, lng: startLng };
      const end = { lat: endLat, lng: endLng };

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: start,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#f5f5f5" }]
          }
        ]
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: "#9EDAE5", // OMO Blue
          strokeWeight: 6,
        }
      });

      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result: any, status: string) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);

            // Extract route points
            const route = result.routes[0].overview_path;
            const routePath = route;

            startCarAnimation(routePath, map);
          }
        }
      );

      setIsLoaded(true);
    };

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [startLat, startLng, endLat, endLng]);

  const startCarAnimation = (routePath: any[], map: any) => {
    const carMarker = new window.google.maps.Marker({
      position: routePath[0],
      map: map,
      icon: {
        url: "https://maps.google.com/mapfiles/kml/shapes/cabs.png",
        scaledSize: new window.google.maps.Size(40, 40),
      }
    });

    let step = 0;
    const moveCar = () => {
      if (step < routePath.length) {
        carMarker.setPosition(routePath[step]);
        map.panTo(routePath[step]);
        step++;
        setTimeout(moveCar, 100); // speed control
      } else {
        // Ride completed
        if (activeRide) {
          completeActiveRide();
          alert("Destination Reached 🚗");
        }
      }
    };

    moveCar();
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <div 
        ref={mapRef} 
        style={{ 
          height: '400px', 
          width: '100%', 
          borderRadius: '24px',
          overflow: 'hidden'
        }} 
      />
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          borderRadius: '24px'
        }}>
          <div style={{ textAlign: 'center', color: '#666' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🗺️</div>
            <div>Loading Google Maps...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapRide;
