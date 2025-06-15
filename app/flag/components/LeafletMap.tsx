"use client";

import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface LeafletMapProps {
  mapUrl: string;
}

const LeafletMap = ({ mapUrl }: LeafletMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const extractCoordinatesFromUrl = async (
    urlStr: string
  ): Promise<[number, number]> => {
    try {
      const relationRegex = /\/relation\/(\d+)/;
      const relationMatch = relationRegex.exec(urlStr);

      if (!relationMatch?.[1]) {
        console.error("Aucune relation trouvée dans l'URL.");
        return [48.8566, 2.3522];
      }
      const relationId = relationMatch[1];
      setIsLoading(true);
      const response = await fetch(
        `https://api.openstreetmap.org/api/0.6/relation/${relationId}/full.json`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données OSM.");
      }

      const data = await response.json();

      const nodes = data.elements.filter(
        (element: any) =>
          element.type === "node" &&
          typeof element.lat === "number" &&
          typeof element.lon === "number"
      );

      if (nodes.length > 0) {
        const latitudes = nodes.map((node) => node.lat);
        const longitudes = nodes.map((node) => node.lon);

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLon = Math.min(...longitudes);
        const maxLon = Math.max(...longitudes);

        const centerLat = (minLat + maxLat) / 2;
        const centerLon = (minLon + maxLon) / 2;

        return [centerLat, centerLon];
      } else {
        return [48.8566, 2.3522];
      }
    } catch (error) {
      console.error("Erreur lors de l'extraction des coordonnées:", error);
      return [48.8566, 2.3522];
    }
  };

  useEffect(() => {
    const fetchCoordinatesAndUpdateMap = async () => {
      if (mapUrl) {
        setIsLoading(true);
        const coords = await extractCoordinatesFromUrl(mapUrl);
        setCoordinates(coords);

        if (mapRef.current) {
          mapRef.current.setView(coords, 5);

          setTimeout(() => {
            mapRef.current?.invalidateSize();
          }, 250);
        }
        setIsLoading(false);
      }
    };

    fetchCoordinatesAndUpdateMap();
  }, [mapUrl]);

  return (
    <div className="h-[400px] w-full rounded-lg border relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 h-full w-full flex items-center justify-center z-[1000]">
          <Loader className="animate-spin"></Loader>
        </div>
      )}
      <MapContainer
        center={coordinates}
        zoom={5}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
