import { useRef } from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  MapViewProps,
  LatLng,
  Marker,
  Polyline,
} from 'react-native-maps';
import { Car, FlagCheckered } from 'phosphor-react-native';

import { IconBox } from '../IconBox';

type MapProps = MapViewProps & {
  coordinates: LatLng[];
};

export function Map({ coordinates, ...rest }: MapProps) {
  const mapRef = useRef<MapView>(null);

  const lastCoordinate = coordinates[coordinates.length - 1];

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }
  }

  return (
    <MapView
      ref={mapRef}
      onMapLoaded={onMapLoaded}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      style={{ width: '100%', height: 200 }}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox size="small" icon={Car} />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox size="small" icon={FlagCheckered} />
          </Marker>
          <Polyline
            coordinates={[...coordinates]}
            strokeColor="#00875F"
            strokeWidth={7}
          />
        </>
      )}
    </MapView>
  );
}
