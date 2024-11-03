import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { COSTA_RICA_BOUNDS } from '../../utils/constants';

export const MapBoundsControl = () => {
  const map = useMap();
  
  useEffect(() => {
    map.setMaxBounds(COSTA_RICA_BOUNDS);
  }, [map]);
  
  return null;
};